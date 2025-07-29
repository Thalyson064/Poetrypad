'use client';

import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast"
import { auth, db } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { collection, doc, setDoc, getDocs, deleteDoc, writeBatch, Timestamp } from 'firebase/firestore';
import type { View, Poem, AppSettings, SyncStatus } from '@/types';
import { LibraryView } from '@/components/views/LibraryView';
import { EditorChoiceView } from '@/components/views/EditorChoiceView';
import { EditorView } from '@/components/views/EditorView';
import { AiView } from '@/components/views/AiView';
import { SettingsView } from '@/components/views/SettingsView';
import { HelpView } from '@/components/views/HelpView';
import { initialPoems } from '@/lib/initial-poems';

// Helper to convert Firestore Timestamps from serialized JSON
const convertTimestamps = (obj: any): any => {
    if (obj && typeof obj === 'object') {
        if (obj.seconds !== undefined && obj.nanoseconds !== undefined) {
            return new Timestamp(obj.seconds, obj.nanoseconds);
        }
        for (const key in obj) {
            obj[key] = convertTimestamps(obj[key]);
        }
    }
    return obj;
};

const defaultAppSettings: AppSettings = {
    isDarkMode: false,
    fontSize: 16,
    themeColor: 'default',
    autosaveInterval: 'never',
    correctionLanguage: 'pt-br',
    aiSensitivity: 50,
    aiPersonality: 'default',
    enableVoiceInput: false,
    enableWritingReminders: true,
    writingReminderTime: '19:00',
    enableBackupAlerts: true,
    enableAiSuggestionAlerts: false,
};

export default function PoetryPad() {
  const [currentView, setCurrentView] = useState<View>({ name: 'LIBRARY' });
  const [poems, setPoems] = useState<Poem[]>([]);
  const [settings, setSettings] = useState<AppSettings>(defaultAppSettings);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const { toast } = useToast();
  
  const POEMS_LOCAL_STORAGE_KEY = 'poetrypad-poems';
  const SETTINGS_LOCAL_STORAGE_KEY = 'poetrypad-settings';

  // Load initial data from localStorage
  useEffect(() => {
    try {
        const savedPoems = localStorage.getItem(POEMS_LOCAL_STORAGE_KEY);
        if (savedPoems) {
            const localPoems = JSON.parse(savedPoems).map(convertTimestamps);
            setPoems(localPoems);
        } else {
            setPoems(initialPoems.map(convertTimestamps));
        }

        const savedSettings = localStorage.getItem(SETTINGS_LOCAL_STORAGE_KEY);
        if (savedSettings) {
            setSettings(prev => ({ ...defaultAppSettings, ...JSON.parse(savedSettings) }));
        }
    } catch (error) {
        console.error("Error loading from localStorage", error);
        setPoems(initialPoems.map(convertTimestamps));
    }
  }, []);

  // Save poems to localStorage whenever they change
  useEffect(() => {
    try {
        if (poems.length > 0) {
            localStorage.setItem(POEMS_LOCAL_STORAGE_KEY, JSON.stringify(poems));
        }
    } catch (error) {
        console.error("Error saving poems to localStorage", error);
        toast({ title: "Erro ao Salvar Localmente", description: "Não foi possível salvar seus poemas no dispositivo.", variant: "destructive" });
    }
  }, [poems, toast]);
  
  // Save settings to localStorage and apply theme whenever they change
  useEffect(() => {
      localStorage.setItem(SETTINGS_LOCAL_STORAGE_KEY, JSON.stringify(settings));
      
      const root = window.document.documentElement;
      root.classList.remove('dark', 'theme-blue', 'theme-red', 'theme-purple');
      
      if (settings.isDarkMode) {
        root.classList.add('dark');
      }
      
      root.style.setProperty('--font-size', `${settings.fontSize}px`);
  
      if (settings.themeColor !== 'default') {
          root.classList.add(`theme-${settings.themeColor}`);
      }
  
  }, [settings]);

  const syncWithFirebase = async (currentUser: FirebaseUser) => {
    if (syncStatus === 'syncing') return;
    setSyncStatus('syncing');
    
    try {
        const poemsCollection = collection(db, 'users', currentUser.uid, 'poems');
        
        const localPoemsJSON = localStorage.getItem(POEMS_LOCAL_STORAGE_KEY);
        const localPoems: Poem[] = localPoemsJSON ? JSON.parse(localPoemsJSON).map(convertTimestamps) : [];

        const remoteSnapshot = await getDocs(poemsCollection);
        const remotePoems: Poem[] = remoteSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Poem)).map(convertTimestamps);
        
        const mergedPoemsMap = new Map<string, Poem>();

        [...localPoems, ...remotePoems].forEach(poem => {
            const existing = mergedPoemsMap.get(poem.id);
            if (!existing || (poem.updatedAt?.toDate() > existing.updatedAt?.toDate())) {
                mergedPoemsMap.set(poem.id, poem);
            }
        });

        const mergedPoems = Array.from(mergedPoemsMap.values());
        
        setPoems(mergedPoems);

        const batch = writeBatch(db);
        mergedPoems.forEach(poem => {
            const docRef = doc(db, 'users', currentUser.uid, 'poems', poem.id);
            const poemToSave = JSON.parse(JSON.stringify(poem));
            batch.set(docRef, poemToSave);
        });
        await batch.commit();

        setSyncStatus('synced');
        if (settings.enableBackupAlerts) {
            toast({ title: "Sincronizado!", description: "Seus poemas estão salvos na nuvem." });
        }

    } catch (error) {
        console.error("Firebase sync error:", error);
        setSyncStatus('offline');
        toast({ title: "Erro de Sincronização", description: "Não foi possível conectar com a nuvem. Suas alterações estão salvas localmente. Verifique as regras de segurança do Firestore.", variant: "destructive" });
    }
  };


  // Handle Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
            syncWithFirebase(currentUser);
        } else {
            setSyncStatus('idle'); 
        }
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setSyncStatus('syncing');
    try {
        await signInWithPopup(auth, provider);
        // The onAuthStateChanged listener will handle the user state and sync
        toast({ title: "Login bem-sucedido!", description: "Bem-vindo(a) de volta!" });
    } catch (error) {
        console.error("Error during sign in:", error);
        setSyncStatus('offline');
        toast({ title: "Erro de Login", description: "Não foi possível fazer o login com o Google.", variant: "destructive" });
    }
  };

  const handleLogout = async () => {
      try {
          await signOut(auth);
          setUser(null);
          setSyncStatus('idle');
          toast({ title: "Logout realizado", description: "Você foi desconectado. Seus poemas continuam salvos neste dispositivo." });
          navigateTo({ name: 'LIBRARY' });
      } catch (error) {
          console.error("Error during sign out:", error);
          setSyncStatus('offline');
          toast({ title: "Erro de Logout", description: "Não foi possível fazer o logout.", variant: "destructive" });
      }
  };

  const navigateTo = (view: View) => {
      setCurrentView(view);
  }
  
  const handleBack = () => {
    switch (currentView.name) {
        case 'EDITOR_CHOICE':
        case 'SETTINGS':
        case 'HELP':
            navigateTo({ name: 'LIBRARY' });
            break;
        case 'EDITOR_FREE':
        case 'EDITOR_AI':
            navigateTo({ name: 'EDITOR_CHOICE' });
            break;
        case 'POEM_DETAIL':
            navigateTo({ name: 'LIBRARY' });
            break;
        default:
            navigateTo({ name: 'LIBRARY' });
    }
  }
  
  const handleSavePoem = async (poemToSave: Poem, oldPoem?: Poem) => {
      let poemWithHistory = { ...poemToSave };
      if (oldPoem && oldPoem.content !== poemToSave.content) {
          const newHistoryEntry = {
              title: oldPoem.title,
              content: oldPoem.content,
              updatedAt: oldPoem.updatedAt,
          };
          // Limit history to 20 entries
          const limitedHistory = [newHistoryEntry, ...(oldPoem.history || [])].slice(0, 20);
          poemWithHistory.history = limitedHistory;
      }

    const updatedPoems = poems.map(p => p.id === poemWithHistory.id ? poemWithHistory : p);
    if (!poems.some(p => p.id === poemWithHistory.id)) {
        updatedPoems.push(poemWithHistory);
    }
    setPoems(updatedPoems);
    toast({ title: "Poema Salvo!", description: "Seu poema foi salvo localmente." });

    if (user) {
        setSyncStatus('syncing');
        try {
            const poemRef = doc(db, 'users', user.uid, 'poems', poemWithHistory.id);
            const poemToSaveForFirebase = JSON.parse(JSON.stringify(poemWithHistory));
            await setDoc(poemRef, poemToSaveForFirebase, { merge: true });
            setSyncStatus('synced');
            if (settings.enableBackupAlerts) {
                toast({ title: "Poema Salvo na Nuvem!", description: "Sincronização concluída com sucesso." });
            }
        } catch (error) {
            console.error("Error saving poem to Firebase: ", error);
            setSyncStatus('offline');
            toast({ title: "Erro de Sincronização", description: "O poema está salvo localmente, mas não foi possível salvar na nuvem.", variant: "destructive"});
        }
    }
    if (currentView.name !== 'POEM_DETAIL' || currentView.poem.id !== poemWithHistory.id) {
       navigateTo({ name: 'POEM_DETAIL', poem: poemWithHistory });
    }
  }
  
  const handleDeletePoem = async (id: string) => {
    setPoems(poems.filter(p => p.id !== id));
    toast({ title: "Poema Excluído", description: "O poema foi removido do dispositivo." });

    if (user) {
        setSyncStatus('syncing');
        const poemRef = doc(db, 'users', user.uid, 'poems', id);
        try {
            await deleteDoc(poemRef);
            setSyncStatus('synced');
            if (settings.enableBackupAlerts) {
                toast({ title: "Poema Excluído da Nuvem", description: "O poema também foi removido da nuvem." });
            }
        } catch (error) {
            console.error("Error deleting poem from Firebase: ", error);
            setSyncStatus('offline');
            toast({ title: "Erro de Sincronização", description: "Não foi possível excluir o poema da nuvem.", variant: "destructive"});
        }
    }
    navigateTo({ name: 'LIBRARY' });
  }

  const handleReset = (type: 'cache' | 'settings' | 'all') => {
      switch (type) {
          case 'cache':
              localStorage.removeItem(POEMS_LOCAL_STORAGE_KEY);
              setPoems(initialPoems.map(convertTimestamps));
              toast({ title: "Cache de Poemas Limpo", description: "Seus poemas locais foram resetados para o estado inicial." });
              break;
          case 'settings':
              setSettings(defaultAppSettings);
              toast({ title: "Configurações Restauradas", description: "As configurações foram restauradas para o padrão." });
              break;
          case 'all':
              setPoems([]);
              setSettings(defaultAppSettings);
              localStorage.removeItem(POEMS_LOCAL_STORAGE_KEY);
              localStorage.removeItem(SETTINGS_LOCAL_STORAGE_KEY);
              toast({ title: "Todos os Dados Excluídos", description: "Seus poemas e configurações locais foram removidos.", variant: "destructive" });
              // Note: This does not delete from Firebase. A separate function would be needed for that.
              break;
      }
  };


  const renderContent = () => {
    switch (currentView.name) {
      case 'LIBRARY':
        return <LibraryView poems={poems} onNewPoemClick={() => navigateTo({ name: 'EDITOR_CHOICE' })} onPoemClick={(poem) => navigateTo({ name: 'POEM_DETAIL', poem })} onNavigate={navigateTo} user={user} />;
      case 'EDITOR_CHOICE':
        return <EditorChoiceView onFreeEditorClick={() => navigateTo({ name: 'EDITOR_FREE'})} onAiAssistantClick={() => navigateTo({ name: 'EDITOR_AI' })} onBack={handleBack} />;
      case 'EDITOR_FREE':
        return <EditorView onBack={handleBack} onSave={handleSavePoem} onNavigate={navigateTo} poem={currentView.poem} onDelete={handleDeletePoem} settings={settings} />;
      case 'EDITOR_AI':
        return <AiView onBack={handleBack} onNavigate={navigateTo} onSave={handleSavePoem} />;
      case 'SETTINGS':
        return <SettingsView onBack={() => navigateTo({ name: 'LIBRARY' })} onNavigate={navigateTo} settings={settings} setSettings={setSettings} user={user} syncStatus={syncStatus} handleGoogleLogin={handleGoogleLogin} handleLogout={handleLogout} handleReset={handleReset} defaultSettings={defaultAppSettings}/>;
      case 'POEM_DETAIL':
        return <EditorView onBack={handleBack} onSave={handleSavePoem} onNavigate={navigateTo} poem={currentView.poem} onDelete={handleDeletePoem} settings={settings} />;
      case 'HELP':
        return <HelpView onBack={handleBack} />;
      default:
        return <LibraryView poems={poems} onNewPoemClick={() => navigateTo({ name: 'EDITOR_CHOICE' })} onPoemClick={(poem) => navigateTo({ name: 'POEM_DETAIL', poem })} onNavigate={navigateTo} user={user} />;
    }
  };

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground">
      <div className="flex flex-1 flex-col overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
}