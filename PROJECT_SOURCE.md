# PoetryPad Project Source Code

This file contains the complete source code for your PoetryPad project. You can copy the content of each section and save it to a file with the corresponding path on your local machine to recreate the project.

---

### `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

### `next.config.ts`

```typescript
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
```

---

### `tailwind.config.ts`

```typescript
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
```

---

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

### `package.json`

```json
{
  "name": "nextn",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack -p 9002",
    "genkit:dev": "genkit start -- tsx src/ai/dev.ts",
    "genkit:watch": "genkit start -- tsx --watch src/ai/dev.ts",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@genkit-ai/googleai": "^1.14.1",
    "@genkit-ai/next": "^1.14.1",
    "@hookform/resolvers": "^4.1.3",
    "@radix-ui/react-accordion": "^1.2.3",
    "@radix-ui/react-alert-dialog": "^1.1.6",
    "@radix-ui/react-avatar": "^1.1.3",
    "@radix-ui/react-checkbox": "^1.1.4",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-dropdown-menu": "^2.1.6",
    "@radix-ui/react-label": "^2.1.2",
    "@radix-ui/react-menubar": "^1.1.6",
    "@radix-ui/react-popover": "^1.1.6",
    "@radix-ui/react-progress": "^1.1.2",
    "@radix-ui/react-radio-group": "^1.2.3",
    "@radix-ui/react-scroll-area": "^1.2.3",
    "@radix-ui/react-select": "^2.1.6",
    "@radix-ui/react-separator": "^1.1.2",
    "@radix-ui/react-slider": "^1.2.3",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.1.3",
    "@radix-ui/react-tabs": "^1.1.3",
    "@radix-ui/react-toast": "^1.2.6",
    "@radix-ui/react-tooltip": "^1.1.8",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^3.6.0",
    "dotenv": "^16.5.0",
    "embla-carousel-react": "^8.6.0",
    "firebase": "^10.12.2",
    "genkit": "^1.14.1",
    "lucide-react": "^0.475.0",
    "next": "15.3.3",
    "patch-package": "^8.0.0",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-diff-viewer-continued": "^3.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.54.2",
    "recharts": "^2.15.1",
    "tailwind-merge": "^3.0.1",
    "tailwindcss-animate": "^1.0.7",
    "wav": "^1.0.2",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "@types/wav": "^1.0.3",
    "genkit-cli": "^1.14.1",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
```

---

### `src/app/layout.tsx`

```typescript
import type {Metadata} from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { Lora } from 'next/font/google';

const lora = Lora({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "PoetryPad",
  description: "Um lugar para seus poemas.",
  icons: {
    icon: `data:image/svg+xml;base64,${btoa(`
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(120 27% 25%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"></path>
</svg>
`)}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head />
      <body className={lora.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

---

### `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 48 33% 94%;
    --foreground: 20 14.3% 4.1%;
    --card: 60 4.8% 95.9%;
    --card-foreground: 20 14.3% 4.1%;
    --popover: 48 33% 94%;
    --popover-foreground: 20 14.3% 4.1%;
    --primary: 120 27% 25%;
    --primary-foreground: 60 9.1% 97.8%;
    --secondary: 48 33% 90%;
    --secondary-foreground: 24 9.8% 10%;
    --muted: 48 33% 90%;
    --muted-foreground: 25 5.3% 44.7%;
    --accent: 48 33% 90%;
    --accent-foreground: 24 9.8% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 60 9.1% 97.8%;
    --border: 48 33% 88%;
    --input: 48 33% 88%;
    --ring: 120 27% 25%;
    --radius: 0.5rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    font-size: var(--font-size, 16px);
  }

  .dark {
    --background: 20 14.3% 4.1%;
    --foreground: 60 9.1% 97.8%;
    --card: 20 14.3% 8%;
    --card-foreground: 60 9.1% 97.8%;
    --popover: 20 14.3% 4.1%;
    --popover-foreground: 60 9.1% 97.8%;
    --primary: 120 27% 35%;
    --primary-foreground: 60 9.1% 97.8%;
    --secondary: 12 6.5% 15.1%;
    --secondary-foreground: 60 9.1% 97.8%;
    --muted: 12 6.5% 15.1%;
    --muted-foreground: 24 5.4% 63.9%;
    --accent: 12 6.5% 15.1%;
    --accent-foreground: 60 9.1% 97.8%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 60 9.1% 97.8%;
    --border: 12 6.5% 15.1%;
    --input: 12 6.5% 15.1%;
    --ring: 120 27% 35%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }

  .theme-blue {
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 210 40% 98%;
  }
  .dark .theme-blue {
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 210 40% 98%;
  }

  .theme-red {
    --primary: 0 72.2% 50.6%;
    --primary-foreground: 0 85.7% 97.3%;
  }
  .dark .theme-red {
    --primary: 0 72.2% 50.6%;
    --primary-foreground: 0 85.7% 97.3%;
  }
  
  .theme-purple {
    --primary: 262.1 83.3% 57.8%;
    --primary-foreground: 260 100% 97.6%;
  }
  .dark .theme-purple {
    --primary: 262.1 83.3% 57.8%;
    --primary-foreground: 260 100% 97.6%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

---

### `src/app/page.tsx`

```typescript
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
```

---

### `src/types/index.ts`

```typescript
import { Timestamp } from 'firebase/firestore';

export type Poem = {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    tags: string[];
    background: { type: string, value: string, dataAiHint?: string };
    imageUrls: string[];
    updatedAt: Timestamp;
    history: { title: string; content: string; updatedAt: Timestamp }[];
    isCurrent?: boolean; // Used for history view
};

export type View =
    | { name: 'LIBRARY' }
    | { name: 'EDITOR_CHOICE' }
    | { name: 'EDITOR_FREE', poem?: Poem }
    | { name: 'EDITOR_AI' }
    | { name: 'SETTINGS' }
    | { name: 'POEM_DETAIL', poem: Poem }
    | { name: 'HELP' };

export type AppSettings = {
    isDarkMode: boolean;
    fontSize: number;
    themeColor: string;
    autosaveInterval: string; // '60', '300', '600', 'never'
    correctionLanguage: string; // 'pt-br', 'en-us', 'es-es'
    aiSensitivity: number; // 0-100
    aiPersonality: string; // 'default', 'creative', 'emotional', 'philosophical'
    enableVoiceInput: boolean;
    enableWritingReminders: boolean;
    writingReminderTime: string; // "HH:mm"
    enableBackupAlerts: boolean;
    enableAiSuggestionAlerts: boolean;
};

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'offline';

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}
```

---

### `src/lib/firebase.ts`

```typescript
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "the-bards-quill-46bcn",
  appId: "1:911102008160:web:72734fea7e04a3f7db9c05",
  storageBucket: "the-bards-quill-46bcn.firebasestorage.app",
  apiKey: "AIzaSyCAaBEfK-G4MO_pTTriW3UxmaYCKfvxrYc",
  authDomain: "the-bards-quill-46bcn.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "911102008160"
};

// Initialize Firebase for SSR
const getClientApp = (): FirebaseApp => {
    if (getApps().length) {
        return getApp();
    }
    return initializeApp(firebaseConfig);
}

const app: FirebaseApp = getClientApp();
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { app, auth, db };
```

---

### `src/lib/initial-poems.ts`

```typescript
import { Timestamp } from 'firebase/firestore';

export const initialPoems = [
  {
    id: '1',
    title: 'Primavera do Coração',
    excerpt: 'Quando o sol desperta na manhã dourada, E as flores dançam na brisa perfumada...',
    content: 'Quando o sol desperta na manhã dourada,\nE as flores dançam na brisa perfumada,\nMeu coração floresce, alma renovada,\nNesta eterna primavera abençoada.',
    updatedAt: Timestamp.fromDate(new Date('2025-07-21')),
    tags: ['Esperança'],
    background: { type: 'color', value: 'bg-yellow-100' },
    imageUrls: [],
    history: [],
  },
  {
    id: '2',
    title: 'Saudades do Outono',
    excerpt: 'As folhas caem como lágrimas douradas, Carregando memórias de dias passados...',
    content: 'As folhas caem como lágrimas douradas,\nCarregando memórias de dias passados,\nO vento sussurra canções desbotadas,\nDeixando no peito amores inacabados.',
    updatedAt: Timestamp.fromDate(new Date('2025-07-18')),
    tags: ['Melancolia'],
    background: { type: 'image', value: 'https://placehold.co/600x400.png', dataAiHint: 'autumn leaves' },
    imageUrls: [],
    history: [],
  },
  {
    id: '3',
    title: 'Encontro de Almas',
    excerpt: 'Nos teus olhos encontrei o infinito, Um universo de amor bendito...',
    content: 'Nos teus olhos encontrei o infinito,\nUm universo de amor bendito,\nOnde meu ser se perde, e me permito,\nSonhar o sonho mais bonito.',
    updatedAt: Timestamp.fromDate(new Date('2025-07-16')),
    tags: ['Amor'],
    background: { type: 'color', value: 'bg-card' },
    imageUrls: [],
    history: [],
  },
  {
    id: '4',
    title: 'Reflexões Noturnas',
    excerpt: 'Na quietude da noite escura, Minha mente busca a verdade pura...',
    content: 'Na quietude da noite escura,\nMinha mente busca a verdade pura,\nEntre estrelas e a lua que fulgura,\nEncontro a paz que minha alma cura.',
    updatedAt: Timestamp.fromDate(new Date('2025-07-13')),
    tags: ['Reflexão'],
    background: { type: 'color', value: 'bg-green-100' },
    imageUrls: [],
    history: [],
  },
];
```

---

### `src/lib/utils.ts`

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

### `src/hooks/use-mobile.tsx`

```typescript
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
```

---

### `src/hooks/use-toast.ts`

```typescript
"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }
```

---

### `src/ai/genkit.ts`

```typescript
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});
```

---

### `src/ai/dev.ts`

```typescript
import { config } from 'dotenv';
config();

import '@/ai/flows/generate-poem.ts';
import '@/ai/flows/enhance-poem.ts';
import '@/ai/flows/suggest-improvements.ts';
import '@/ai/flows/narrate-poem.ts';
```

---

### `src/ai/flows/generate-poem.ts`

```typescript
'use server';

/**
 * @fileOverview A poem generation AI agent.
 *
 * - generatePoem - A function that handles the poem generation process.
 * - GeneratePoemInput - The input type for the generatePoem function.
 * - GeneratePoemOutput - The return type for the generatePoem function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePoemInputSchema = z.object({
  theme: z.string().describe('The theme of the poem.'),
  style: z.string().describe('The style of the poem.'),
});
export type GeneratePoemInput = z.infer<typeof GeneratePoemInputSchema>;

const GeneratePoemOutputSchema = z.object({
  poem: z.string().describe('The generated poem.'),
});
export type GeneratePoemOutput = z.infer<typeof GeneratePoemOutputSchema>;

export async function generatePoem(input: GeneratePoemInput): Promise<GeneratePoemOutput> {
  return generatePoemFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePoemPrompt',
  input: {schema: GeneratePoemInputSchema},
  output: {schema: GeneratePoemOutputSchema},
  prompt: `You are a poet, skilled in writing poems in various styles.

  Please write a poem with the following theme and style:

  Theme: {{{theme}}}
  Style: {{{style}}}
  `,
});

const generatePoemFlow = ai.defineFlow(
  {
    name: 'generatePoemFlow',
    inputSchema: GeneratePoemInputSchema,
    outputSchema: GeneratePoemOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
```

---

### `src/ai/flows/enhance-poem.ts`

```typescript
'use server';

/**
 * @fileOverview An AI agent for enhancing poems.
 *
 * - enhancePoem - A function that handles poem enhancement based on a specific action.
 * - EnhancePoemInput - The input type for the enhancePoem function.
 * - EnhancePoemOutput - The return type for the enhancePoem function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhancePoemInputSchema = z.object({
  text: z.string().describe('The poem text to be enhanced.'),
  action: z.enum(['CORRECT_SPELLING', 'SUGGEST_RHYMES']).describe('The enhancement action to perform.'),
  language: z.string().optional().describe('The language for the correction (e.g., "pt-br", "en-us").'),
});
export type EnhancePoemInput = z.infer<typeof EnhancePoemInputSchema>;

const EnhancePoemOutputSchema = z.object({
  enhancedText: z.string().describe('The resulting enhanced poem text.'),
});
export type EnhancePoemOutput = z.infer<typeof EnhancePoemOutputSchema>;

export async function enhancePoem(input: EnhancePoemInput): Promise<EnhancePoemOutput> {
  return enhancePoemFlow(input);
}

const enhancePoemFlow = ai.defineFlow(
  {
    name: 'enhancePoemFlow',
    inputSchema: EnhancePoemInputSchema,
    outputSchema: EnhancePoemOutputSchema,
  },
  async ({ text, action, language }) => {
    let promptText = '';

    if (action === 'CORRECT_SPELLING') {
        const langInstruction = {
            'pt-br': 'em Português (Brasil)',
            'en-us': 'in English (US)',
            'es-es': 'en Español (España)'
        }[language || 'pt-br'] || 'em Português (Brasil)';

        promptText = `Corrija a ortografia e a gramática do seguinte texto ${langInstruction}. Mantenha o formato original e o significado o mais próximo possível. Retorne apenas o texto corrigido, sem adicionar nenhum comentário ou formatação extra.\n\nTexto:\n{{text}}`;
    } else { // SUGGEST_RHYMES
        promptText = `Analise o seguinte poema e sugira rimas para as palavras finais de cada verso. Apresente as sugestões de forma clara. Você pode reescrever o poema com as novas rimas se achar que melhora o fluxo.\n\nPoema:\n{{text}}`;
    }
    
    const prompt = ai.definePrompt({
        name: 'enhancePoemPrompt',
        input: { schema: z.object({ text: z.string() }) },
        output: { schema: EnhancePoemOutputSchema },
        prompt: promptText,
    });

    const { output } = await prompt({ text });
    return output!;
  }
);
```

---

### `src/ai/flows/suggest-improvements.ts`

```typescript
'use server';

/**
 * @fileOverview Um agente de IA para sugerir melhorias em poemas.
 *
 * - suggestImprovements - Uma função que analisa um poema e sugere melhorias.
 * - SuggestImprovementsInput - O tipo de entrada para a função suggestImprovements.
 * - SuggestImprovementsOutput - O tipo de retorno para a função suggestImprovements.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestImprovementsInputSchema = z.object({
  text: z.string().describe('O texto do poema a ser aprimorado.'),
  sensitivity: z.number().optional().describe('A sensibilidade da IA para a complexidade do vocabulário (0-100).'),
  personality: z.string().optional().describe('A personalidade da IA (Criativa, Emocional, Filosófica).'),
});
export type SuggestImprovementsInput = z.infer<typeof SuggestImprovementsInputSchema>;

const SuggestImprovementsOutputSchema = z.object({
  improvedText: z.string().describe('O texto do poema com as melhorias sugeridas aplicadas.'),
});
export type SuggestImprovementsOutput = z.infer<typeof SuggestImprovementsOutputSchema>;

export async function suggestImprovements(input: SuggestImprovementsInput): Promise<SuggestImprovementsOutput> {
  return suggestImprovementsFlow(input);
}

const suggestImprovementsFlow = ai.defineFlow(
  {
    name: 'suggestImprovementsFlow',
    inputSchema: SuggestImprovementsInputSchema,
    outputSchema: SuggestImprovementsOutputSchema,
  },
  async ({ text, sensitivity, personality }) => {
    let personalityInstruction = "Você é um crítico literário e poeta experiente, com um olhar apurado para aprimoramentos de estilo e linguagem.";
    switch (personality) {
        case 'creative':
            personalityInstruction = "Assuma a personalidade de um poeta vanguardista e ousado. Seu objetivo é desconstruir o comum e encontrar metáforas e imagens surpreendentes e originais. Seja experimental.";
            break;
        case 'emotional':
            personalityInstruction = "Assuma a personalidade de um poeta de alma profundamente sensível e emotiva. Seu foco principal é intensificar o impacto sentimental do poema, usando palavras que evocam sentimentos e tocam o coração do leitor.";
            break;
        case 'philosophical':
            personalityInstruction = "Assuma a personalidade de um poeta filósofo e reflexivo. Seu objetivo é aprofundar o significado do poema, explorando questões existenciais e tornando os versos mais densos e contemplativos.";
            break;
    }

    let sensitivityInstruction = "";
    if (sensitivity !== undefined) {
        if (sensitivity <= 33) {
            sensitivityInstruction = "Instrução de Vocabulário: Utilize um vocabulário simples e direto, priorizando a clareza e a acessibilidade.";
        } else if (sensitivity <= 66) {
            sensitivityInstruction = "Instrução de Vocabulário: Utilize um vocabulário rico e evocativo, mas que ainda seja acessível para a maioria dos leitores. Encontre um bom equilíbrio.";
        } else {
            sensitivityInstruction = "Instrução de Vocabulário: Utilize um vocabulário rebuscado, erudito e complexo. Explore sinônimos raros e palavras que demonstrem grande domínio da língua para elevar o tom do poema.";
        }
    }

    const promptText = `${personalityInstruction}

Sua tarefa é analisar o poema abaixo e reescrevê-lo, aplicando melhorias sutis, mas impactantes.

${sensitivityInstruction}

As melhorias devem aprimorar a linguagem, o ritmo e o impacto emocional, de acordo com a personalidade e sensibilidade definidas. Não altere o significado ou o tema central do poema. O objetivo é lapidar, não criar algo novo.

Poema Original:
{{{text}}}

Retorne apenas o poema aprimorado no campo "improvedText".`;
      
    const prompt = ai.definePrompt({
      name: 'suggestImprovementsPrompt',
      input: {schema: z.object({ text: z.string() })},
      output: {schema: SuggestImprovementsOutputSchema},
      prompt: promptText,
    });

    const {output} = await prompt({ text });
    return output!;
  }
);
```

---

### `src/ai/flows/narrate-poem.ts`

```typescript
'use server';

/**
 * @fileOverview Um agente de IA para narrar poemas usando Text-to-Speech.
 *
 * - narratePoem - Uma função que converte o texto de um poema em áudio.
 * - NarratePoemOutput - O tipo de retorno para a função narratePoem.
 */

import {ai}from '@/ai/genkit';
import {z}from 'genkit';
import {googleAI}from '@genkit-ai/googleai';
import wav from 'wav';

const NarratePoemOutputSchema = z.object({
  audioDataUri: z.string().describe("O áudio do poema narrado, como um data URI no formato 'data:audio/wav;base64,<encoded_data>'."),
});
export type NarratePoemOutput = z.infer<typeof NarratePoemOutputSchema>;

export async function narratePoem(text: string): Promise<NarratePoemOutput> {
  return narratePoemFlow(text);
}

// Helper para converter PCM para WAV
async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const narratePoemFlow = ai.defineFlow(
  {
    name: 'narratePoemFlow',
    inputSchema: z.string(),
    outputSchema: NarratePoemOutputSchema,
  },
  async (text) => {
    // Sanitize the input text to remove problematic characters for TTS
    const sanitizedText = text.replace(/[^a-zA-Z0-9áéíóúâêôãõàèìòùÁÉÍÓÚÂÊÔÃÕÀÈÌÒÙçÇ.,!?;:() \n]/g, '');

    if (!sanitizedText.trim()) {
        throw new Error('O texto fornecido está vazio ou contém apenas caracteres inválidos.');
    }

    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' }, // Uma voz suave e clara
          },
        },
      },
      prompt: sanitizedText,
    });

    if (!media?.url) {
      throw new Error('Nenhuma mídia de áudio foi retornada pela IA. O texto pode ser muito complexo ou a API pode estar indisponível.');
    }

    // O áudio vem como PCM, precisamos convertê-lo para um formato que o navegador entenda, como WAV.
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    
    const wavBase64 = await toWav(audioBuffer);

    return {
      audioDataUri: `data:audio/wav;base64,${wavBase64}`,
    };
  }
);
```

---

### `src/components/Logo.tsx`

```typescript
'use client';

import { PenLine } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Logo = ({ className, size = 32 }: { className?: string, size?: number }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
        <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
            <PenLine style={{ width: size * 0.6, height: size * 0.6 }} />
        </div>
        <span className="text-2xl font-bold tracking-tight" style={{ fontSize: size * 0.8 }}>
            PoetryPad
        </span>
    </div>
  );
};
```

---

### `src/components/views/AiView.tsx`

```typescript
'use client';

import { useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import { ArrowLeft, Loader2, Copy, PenLine } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { generatePoem } from '@/ai/flows/generate-poem';
import type { Poem, View } from '@/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

type AiViewProps = {
    onBack: () => void;
    onNavigate: (view: View) => void;
    onSave: (poem: Poem) => void;
}

export const AiView = ({ onBack, onNavigate, onSave }: AiViewProps) => {
    const [theme, setTheme] = useState('');
    const [style, setStyle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedPoem, setGeneratedPoem] = useState('');
    const { toast } = useToast();

    const handleGeneratePoem = async () => {
        if (!theme || !style) {
            toast({ title: "Campos Vazios", description: "Por favor, preencha o tema e o estilo.", variant: "destructive" });
            return;
        }
        setIsLoading(true);
        setGeneratedPoem('');
        try {
            const { poem } = await generatePoem({ theme, style });
            setGeneratedPoem(poem);
        } catch (error) {
            console.error("Poem generation failed", error);
            toast({ title: "Erro na Geração", description: "Não foi possível gerar o poema.", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };
    
    const openInEditor = () => {
        const newPoem: Poem = {
            id: `poem_${Date.now()}`,
            title: theme || 'Poema Gerado por IA',
            content: generatedPoem,
            excerpt: generatedPoem.substring(0, 80) + '...',
            tags: ['IA', style],
            updatedAt: Timestamp.now(),
            background: { type: 'color', value: 'bg-card' },
            imageUrls: [],
            history: [],
        };
        onSave(newPoem);
        onNavigate({ name: 'POEM_DETAIL', poem: newPoem });
    };

    const copyToClipboard = () => {
      navigator.clipboard.writeText(generatedPoem);
      toast({ title: "Copiado!", description: "O poema foi copiado para a área de transferência." });
    }

    return (
        <div className="flex flex-1 flex-col">
            <header className="flex items-center justify-between p-4 border-b">
                <Button variant="ghost" size="icon" onClick={onBack}>
                    <ArrowLeft />
                </Button>
                <h1 className="text-lg font-bold">Assistente de IA</h1>
                <div className="w-10"></div>
            </header>
            <main className="flex-1 flex flex-col p-4 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="theme">Tema</Label>
                    <Input id="theme" placeholder="Ex: Amor, Natureza, Saudade" value={theme} onChange={(e) => setTheme(e.target.value)} disabled={isLoading} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="style">Estilo</Label>
                    <Input id="style" placeholder="Ex: Soneto, Haicai, Verso Livre" value={style} onChange={(e) => setStyle(e.target.value)} disabled={isLoading} />
                </div>
                <Button onClick={handleGeneratePoem} disabled={isLoading}>
                    {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Gerando...</> : 'Gerar Poema'}
                </Button>
                {generatedPoem && (
                    <Card className="flex-1 mt-4">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Poema Gerado</CardTitle>
                            <div className="flex space-x-2">
                               <Button variant="ghost" size="icon" onClick={copyToClipboard}><Copy className="h-4 w-4"/></Button>
                               <Button variant="ghost" size="icon" onClick={openInEditor}><PenLine className="h-4 w-4"/></Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                readOnly
                                value={generatedPoem}
                                className="flex-1 text-base border-none focus:ring-0 !bg-transparent p-0 resize-none h-64"
                            />
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    );
};
```

---

### `src/components/views/EditorChoiceView.tsx`

```typescript
'use client';

import { ArrowLeft, PenLine, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type EditorChoiceViewProps = {
    onFreeEditorClick: () => void;
    onAiAssistantClick: () => void;
    onBack: () => void;
}

export const EditorChoiceView = ({ onFreeEditorClick, onAiAssistantClick, onBack }: EditorChoiceViewProps) => (
    <div className="flex h-full flex-col">
        <header className="flex items-center justify-between p-4 border-b">
             <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft />
            </Button>
            <h1 className="text-lg font-bold">Criar</h1>
            <div className="w-10"></div>
        </header>
        <div className="flex flex-1 flex-col items-center justify-center space-y-8 p-4">
            <Card className="w-full max-w-sm cursor-pointer bg-card" onClick={onFreeEditorClick}>
                <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                    <PenLine className="h-20 w-20 text-primary" />
                    <h2 className="mt-6 text-2xl font-bold">Editor Livre</h2>
                    <p className="mt-2 text-muted-foreground">Comece com uma tela em branco.</p>
                </CardContent>
            </Card>
            <Card className="w-full max-w-sm cursor-pointer bg-card" onClick={onAiAssistantClick}>
                <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                    <BrainCircuit className="h-20 w-20 text-primary" />
                    <h2 className="mt-6 text-2xl font-bold">Assistente de IA</h2>
                    <p className="mt-2 text-muted-foreground">Use a IA para te ajudar.</p>
                </CardContent>
            </Card>
        </div>
    </div>
);
```

---

### `src/components/views/EditorView.tsx`

```typescript
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowLeft, BookText, Check, Copy, History, ImageIcon, Link, Loader2, Mic, MicOff, Paintbrush, PenLine, PlayCircle, Save, SpellCheck, Trash2, Upload, Wand2, X, PauseCircle, Download } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import ReactDiffViewer from 'react-diff-viewer-continued';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import { enhancePoem } from '@/ai/flows/enhance-poem';
import { suggestImprovements } from '@/ai/flows/suggest-improvements';
import { narratePoem } from '@/ai/flows/narrate-poem';
import type { Poem, View, AppSettings } from '@/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '../ui/card';

const backgrounds = [
  { name: 'Papel Amassado', url: 'https://placehold.co/600x400.png', dataAiHint: 'wrinkled paper' },
  { name: 'Textura de Papel', url: 'https://placehold.co/600x400.png', dataAiHint: 'paper texture' },
  { name: 'Papiro Antigo', url: 'https://placehold.co/600x400.png', dataAiHint: 'ancient papyrus' },
  { name: 'Pergaminho', url: 'https://placehold.co/600x400.png', dataAiHint: 'parchment scroll' },
];

const colors = [
  { name: 'Padrão', bgClass: 'bg-card', textClass: 'text-card-foreground' },
  { name: 'Vermelho', bgClass: 'bg-red-100', textClass: 'text-red-900' },
  { name: 'Azul', bgClass: 'bg-blue-100', textClass: 'text-blue-900' },
  { name: 'Verde', bgClass: 'bg-green-100', textClass: 'text-green-900' },
  { name: 'Amarelo', bgClass: 'bg-yellow-100', textClass: 'text-yellow-900' },
  { name: 'Roxo', bgClass: 'bg-purple-100', textClass: 'text-purple-900' },
  { name: 'Rosa', bgClass: 'bg-pink-100', textClass: 'text-pink-900' },
  { name: 'Cinza', bgClass: 'bg-gray-200', textClass: 'text-gray-900' },
];

type SuggestionDialogProps = {
    originalText: string;
    suggestedText: string;
    onAccept: () => void;
    onCancel: () => void;
    open: boolean;
};

const SuggestionDialog = ({ originalText, suggestedText, onAccept, onCancel, open }: SuggestionDialogProps) => (
    <AlertDialog open={open} onOpenChange={onCancel}>
        <AlertDialogContent className="max-w-3xl">
            <AlertDialogHeader>
                <AlertDialogTitle>Sugestão de Aprimoramento</AlertDialogTitle>
                <AlertDialogDescription>
                    A IA analisou seu texto e preparou uma versão aprimorada. Você pode aceitar a sugestão ou continuar com o seu texto original.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-80 overflow-y-auto p-2">
                <div>
                    <h3 className="font-semibold mb-2">Texto Original</h3>
                    <Textarea readOnly value={originalText} className="h-full resize-none bg-muted/50" />
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Texto Sugerido</h3>
                    <Textarea readOnly value={suggestedText} className="h-full resize-none bg-primary/10" />
                </div>
            </div>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={onCancel}>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={onAccept}>Aceitar Sugestão</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
);

type EditorViewProps = {
    onBack: () => void;
    onSave: (poem: Poem, oldPoem?: Poem) => void;
    poem?: Poem;
    onNavigate: (view: View) => void;
    onDelete: (id: string) => void;
    settings: AppSettings;
}

export const EditorView = ({ onBack, onSave, poem, onDelete, settings }: EditorViewProps) => {
    const [title, setTitle] = useState(poem?.title || '');
    const [content, setContent] = useState(poem?.content || '');
    const [background, setBackground] = useState(poem?.background || { type: 'color', value: 'bg-card' });
    const [imageUrls, setImageUrls] = useState<string[]>(poem?.imageUrls || []);
    const [isAiLoading, setIsAiLoading] = useState(false);
    const { toast } = useToast();
    const [suggestion, setSuggestion] = useState<{ original: string, suggested: string } | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const backgroundFileInputRef = useRef<HTMLInputElement>(null);
    const contentImageFileInputRef = useRef<HTMLInputElement>(null);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<any>(null);
    const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
    const [currentPoemState, setCurrentPoemState] = useState(poem);
    const [selectedHistory, setSelectedHistory] = useState<Poem | null>(poem || null);
    const [narration, setNarration] = useState<{ audioUrl: string; isPlaying: boolean; isLoading: boolean }>({ audioUrl: '', isPlaying: false, isLoading: false });
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleSave = () => {
        const newPoem: Poem = {
            ...(currentPoemState || {}),
            id: currentPoemState?.id || `poem_${Date.now()}`,
            title: title || 'Sem Título',
            content,
            background,
            imageUrls,
            excerpt: content.substring(0, 80) + '...',
            tags: currentPoemState?.tags || ['Novo'],
            updatedAt: Timestamp.now(),
            history: currentPoemState?.history || [],
        };
        onSave(newPoem, currentPoemState);
        setCurrentPoemState(newPoem); // Update current state after save
    };

    useEffect(() => {
        if (settings.autosaveInterval !== 'never') {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
            const interval = parseInt(settings.autosaveInterval, 10) * 1000; // Converted to ms
            saveTimeoutRef.current = setTimeout(() => {
                handleSave();
                if (settings.enableBackupAlerts) {
                   toast({ title: "Salvo Automaticamente", description: "Seu poema foi salvo." });
                }
            }, interval);
        }

        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, content, background, imageUrls, settings.autosaveInterval]);
    
    const handleAiAction = async (action: 'CORRECT_SPELLING' | 'SUGGEST_RHYMES' | 'SUGGEST_IMPROVEMENTS') => {
        if (!content) {
            toast({ title: "Texto Vazio", description: "Escreva algo antes de usar a IA.", variant: "destructive" });
            return;
        }
        setIsAiLoading(true);
        try {
            if (action === 'SUGGEST_IMPROVEMENTS') {
                const result = await suggestImprovements({ text: content, sensitivity: settings.aiSensitivity, personality: settings.aiPersonality });
                if (settings.enableAiSuggestionAlerts) {
                    setSuggestion({ original: content, suggested: result.improvedText });
                } else {
                    setContent(result.improvedText);
                    toast({ title: "Sugestão Aplicada", description: "O texto foi atualizado com a sugestão da IA." });
                }
            } else {
                const result = await enhancePoem({ text: content, action, language: settings.correctionLanguage });
                setContent(result.enhancedText);
                toast({ title: "Ação Realizada", description: "O texto foi atualizado." });
            }
        } catch (error) {
            console.error("AI action failed", error);
            toast({ title: "Erro da IA", description: "Não foi possível processar a solicitação.", variant: "destructive" });
        } finally {
            setIsAiLoading(false);
        }
    };
    
    const acceptSuggestion = () => {
        if (suggestion) {
            setContent(suggestion.suggested);
            setSuggestion(null);
            toast({ title: "Sugestão Aceita", description: "O seu poema foi atualizado com sucesso." });
        }
    };

    const confirmDelete = () => {
        if (poem?.id) {
            onDelete(poem.id);
        }
        setShowDeleteConfirm(false);
    }
    
    const handleBackgroundImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBackground({ type: 'image', value: reader.result as string });
                toast({ title: "Imagem Carregada", description: "O novo fundo foi aplicado." });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleContentImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrls(prev => [...prev, reader.result as string]);
                toast({ title: "Imagem Adicionada", description: "A imagem foi adicionada ao seu poema." });
            };
            reader.readAsDataURL(file);
        }
    };
    
    const removeContentImage = (index: number) => {
        setImageUrls(currentUrls => currentUrls.filter((_, i) => i !== index));
    };

    const toggleListening = () => {
        if (!settings.enableVoiceInput) {
             toast({ title: "Entrada por Voz Desativada", description: "Ative a entrada por voz nas configurações para usar esta função.", variant: "destructive" });
            return;
        }
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
        } else {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                toast({ title: "Navegador não suportado", description: "A entrada por voz não é suportada pelo seu navegador.", variant: "destructive" });
                return;
            }
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.lang = settings.correctionLanguage.startsWith('pt') ? 'pt-BR' : 'en-US';
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;

            recognitionRef.current.onresult = (event: any) => {
                let finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    }
                }
                setContent(prev => prev + finalTranscript + ' ');
            };
            
            recognitionRef.current.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const restoreVersion = (version: { content: string, title: string }) => {
        setTitle(version.title);
        setContent(version.content);
        setHistoryDialogOpen(false);
        toast({ title: "Versão Restaurada", description: "O poema foi revertido para a versão selecionada." });
    };

    const handleNarration = async () => {
        const fullText = `${title}. ${content}`;
        if (!fullText.trim()) {
            toast({ title: "Poema Vazio", description: "Escreva algo para ser narrado.", variant: "destructive" });
            return;
        }

        setNarration(prev => ({ ...prev, isLoading: true }));
        try {
            const { audioDataUri } = await narratePoem(fullText);
            setNarration({ audioUrl: audioDataUri, isPlaying: true, isLoading: false });
        } catch (error) {
            console.error("Narration failed", error);
            toast({ title: "Erro na Narração", description: "A IA não conseguiu processar este texto. Tente simplificá-lo ou tente novamente mais tarde.", variant: "destructive" });
            setNarration({ audioUrl: '', isPlaying: false, isLoading: false });
        }
    };

    useEffect(() => {
        if (narration.audioUrl && audioRef.current) {
            audioRef.current.src = narration.audioUrl;
            if (narration.isPlaying) {
                audioRef.current.play().catch(e => console.error("Audio play failed", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [narration.audioUrl, narration.isPlaying]);
    
    useEffect(() => {
        const audio = audioRef.current;
        const handleEnd = () => setNarration(prev => ({ ...prev, isPlaying: false }));
        audio?.addEventListener('ended', handleEnd);
        return () => {
            audio?.removeEventListener('ended', handleEnd);
        };
    }, [audioRef]);

    useEffect(() => {
        return () => {
            if(recognitionRef.current && isListening) {
               recognitionRef.current.stop();
            }
        };
    }, [isListening]);

    const isImageBg = background?.type === 'image';
    const isColorBg = background?.type === 'color' && background.value !== 'bg-card';
    const editorStyle = isImageBg ? { backgroundImage: `url(${background.value})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {};
    const editorBgClass = !isImageBg ? background.value : '';
    
    const textColorClass = isImageBg ? 'text-white' : (isColorBg ? 'text-card-foreground' : '');
    const headerBorderClass = isImageBg ? 'border-b border-white/20' : 'border-b';
    
    const inputBgClass = 'bg-transparent';
    const placeholderClass = isImageBg ? 'placeholder:text-gray-300' : 'placeholder:text-muted-foreground';

    const historyWithCurrent = [
        { ...poem, title, content, updatedAt: Timestamp.now(), isCurrent: true } as Poem,
        ...(poem?.history || [])
    ];


    return (
        <div className={cn("flex flex-1 flex-col", editorBgClass)} style={editorStyle}>
            <div className={cn("flex flex-1 flex-col", isImageBg ? 'bg-black/50' : '')}>
                <header className={`flex items-center justify-between p-4 ${headerBorderClass}`}>
                    <Button variant="ghost" size="icon" onClick={onBack} className={textColorClass}>
                        <ArrowLeft />
                    </Button>
                    <h1 className={cn("text-lg font-bold", textColorClass)}>{poem ? "Editar Poema" : "Editor Livre"}</h1>
                    <div className='flex items-center space-x-2'>
                        <Button variant="ghost" size="icon" onClick={toggleListening} className={cn(textColorClass, isListening ? "text-red-500 animate-pulse" : "")}>
                           {isListening ? <MicOff /> : <Mic />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => contentImageFileInputRef.current?.click()} className={textColorClass}>
                            <ImageIcon />
                        </Button>
                        <input type="file" ref={contentImageFileInputRef} onChange={handleContentImageUpload} className="hidden" accept="image/*" />

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="icon" disabled={isAiLoading} className={textColorClass}>
                                    <Paintbrush />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <Tabs defaultValue="colors" className="w-full">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="colors">Cores</TabsTrigger>
                                        <TabsTrigger value="backgrounds">Fundos</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="colors">
                                        <div className="grid grid-cols-6 gap-2 pt-4">
                                            {colors.map((color) => (
                                                <button key={color.name} onClick={() => setBackground({ type: 'color', value: color.bgClass })} className={cn('h-10 w-10 rounded-full border-2', color.bgClass, background.value === color.bgClass ? 'border-primary ring-2 ring-primary' : 'border-transparent')}>
                                                  {background.value === color.bgClass && <Check className={cn("h-5 w-5 mx-auto", color.textClass)} />}
                                                </button>
                                            ))}
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="backgrounds">
                                        <div className="grid grid-cols-3 gap-2 pt-4">
                                            {backgrounds.map((bg) => (
                                                <button key={bg.name} onClick={() => setBackground({ type: 'image', value: bg.url })} className={cn(`h-16 w-full rounded-md border-2 overflow-hidden`, background.value === bg.url ? 'border-primary ring-2 ring-primary' : 'border-transparent')} >
                                                   <Image src={bg.url} alt={bg.name} width={100} height={64} className="h-full w-full object-cover" data-ai-hint={bg.dataAiHint} />
                                                </button>
                                            ))}
                                        </div>
                                         <Button variant="outline" className="w-full mt-2" onClick={() => backgroundFileInputRef.current?.click()}>
                                            <Upload className="mr-2 h-4 w-4" />
                                            Carregar Imagem
                                        </Button>
                                    </TabsContent>
                                </Tabs>

                                <input
                                    type="file"
                                    ref={backgroundFileInputRef}
                                    onChange={handleBackgroundImageUpload}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </PopoverContent>
                        </Popover>

                        <Dialog open={historyDialogOpen} onOpenChange={setHistoryDialogOpen}>
                            <DialogTrigger asChild>
                                {poem?.history && poem.history.length > 0 && (
                                <Button variant="ghost" size="icon" className={textColorClass}>
                                    <History />
                                </Button>
                                )}
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl h-[80vh]">
                                <DialogHeader>
                                    <DialogTitle>Histórico de Versões: {poem?.title}</DialogTitle>
                                </DialogHeader>
                                <div className="flex gap-4 h-full overflow-hidden">
                                <ScrollArea className="w-1/3 h-full border-r pr-4">
                                    <div className="flex flex-col gap-2">
                                    {historyWithCurrent.map((version, index) => (
                                        <Card key={index} className={cn("cursor-pointer hover:bg-muted", selectedHistory?.updatedAt === version.updatedAt && "bg-muted")} onClick={() => setSelectedHistory(version as Poem)}>
                                        <CardContent className="p-3">
                                            <p className="font-semibold text-sm">{version.isCurrent ? "Versão Atual" : `Versão de ${new Date(version.updatedAt.toDate()).toLocaleDateString()}`}</p>
                                            <p className="text-xs text-muted-foreground">{new Date(version.updatedAt.toDate()).toLocaleTimeString('pt-BR')}</p>
                                            <p className="text-xs truncate mt-1">{version.content}</p>
                                        </CardContent>
                                        </Card>
                                    ))}
                                    </div>
                                </ScrollArea>
                                <ScrollArea className="w-2/3 h-full">
                                    <ReactDiffViewer
                                        oldValue={selectedHistory?.isCurrent ? poem?.content : selectedHistory?.content}
                                        newValue={selectedHistory?.isCurrent ? content : selectedHistory?.content}
                                        splitView={true}
                                        hideLineNumbers={true}
                                        leftTitle={selectedHistory?.isCurrent ? "Original Salvo" : "Versão Histórica"}
                                        rightTitle={selectedHistory?.isCurrent ? "Edição Atual" : "Versão Histórica"}
                                    />
                                    {!selectedHistory?.isCurrent && (
                                        <div className='flex justify-end mt-4'>
                                             <Button onClick={() => selectedHistory && restoreVersion(selectedHistory)}>Restaurar esta versão</Button>
                                        </div>
                                    )}
                                </ScrollArea>
                                </div>
                            </DialogContent>
                        </Dialog>
                        
                        <Button variant="ghost" size="icon" onClick={handleNarration} disabled={narration.isLoading || isAiLoading} className={textColorClass}>
                            {narration.isLoading ? <Loader2 className="animate-spin"/> : narration.isPlaying ? <PauseCircle /> : <PlayCircle />}
                        </Button>
                        <audio ref={audioRef} className="hidden" />

                        {poem && (
                            <Button variant="ghost" size="icon" onClick={() => setShowDeleteConfirm(true)} disabled={isAiLoading} className="text-destructive hover:text-destructive">
                                <Trash2/>
                            </Button>
                        )}
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" disabled={isAiLoading || narration.isLoading} className={textColorClass}>
                                {isAiLoading ? <Loader2 className="animate-spin"/> : <Wand2 />}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleAiAction('CORRECT_SPELLING')}>
                                <SpellCheck className="mr-2 h-4 w-4" />
                                <span>Corrigir Ortografia</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAiAction('SUGGEST_RHYMES')}>
                                <Link className="mr-2 h-4 w-4" />
                                <span>Sugerir Rimas</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAiAction('SUGGEST_IMPROVEMENTS')}>
                                <BookText className="mr-2 h-4 w-4" />
                                <span>Aprimorar Escrita</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>

                        <Button variant="ghost" size="icon" onClick={handleSave} disabled={isAiLoading} className={textColorClass}>
                            <Save />
                        </Button>
                    </div>
                </header>
                <main className="flex-1 flex flex-col p-4 gap-4 overflow-y-auto">
                    <Input 
                        placeholder="Título do seu poema" 
                        className={cn("text-2xl font-bold border-none focus:ring-0 p-0", textColorClass, inputBgClass, placeholderClass)}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={isAiLoading || narration.isLoading}
                    />
                    <Textarea 
                        placeholder="Dê vida aos seus sentimentos e ideias..." 
                        className={cn("flex-1 text-lg border-none focus:ring-0 p-0 resize-none", textColorClass, inputBgClass, placeholderClass)}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        disabled={isAiLoading || narration.isLoading}
                    />
                    {imageUrls.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                            {imageUrls.map((url, index) => (
                                <div key={index} className="relative group">
                                    <Image src={url} alt={`Content image ${index + 1}`} width={200} height={200} className="rounded-lg object-cover w-full h-full" />
                                    <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100" onClick={() => removeContentImage(index)}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </main>

                {narration.audioUrl && (
                    <footer className="p-4 border-t bg-background/80 backdrop-blur-sm">
                        <div className="flex items-center gap-4">
                             <Button variant="ghost" size="icon" onClick={() => setNarration(p => ({...p, isPlaying: !p.isPlaying}))}>
                                {narration.isPlaying ? <PauseCircle className="h-6 w-6"/> : <PlayCircle className="h-6 w-6"/>}
                             </Button>
                             <div className="w-full h-2 bg-muted rounded-full overflow-hidden relative">
                                {/* Progress bar - can be implemented later */}
                             </div>
                             <a href={narration.audioUrl} download={`${title || 'poema'}.wav`}>
                                 <Button variant="ghost" size="icon">
                                     <Download className="h-6 w-6"/>
                                 </Button>
                             </a>
                        </div>
                    </footer>
                )}

                {suggestion && (
                    <SuggestionDialog
                        open={!!suggestion}
                        originalText={suggestion.original}
                        suggestedText={suggestion.suggested}
                        onAccept={acceptSuggestion}
                        onCancel={() => setSuggestion(null)}
                    />
                )}
                <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Esta ação não pode ser desfeita. Isso excluirá permanentemente o seu poema.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
};
```

---

### `src/components/views/HelpView.tsx`

```typescript
'use client';

import { ArrowLeft, Youtube, Newspaper, ChevronRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const helpResources = {
  videos: [
    { title: "Como fazer um poema? (passo a passo)", url: "https://www.youtube.com/watch?v=sYEaT8pm_20", author: "Português com a Lene" },
    { title: "O que são rimas e como usá-las", url: "https://www.youtube.com/watch?v=AC_s91-H2go", author: "Aprenda com o Poeta" },
    { title: "Figuras de Linguagem para iniciantes", url: "https://www.youtube.com/watch?v=684CgS_Gk60", author: "Português para Desesperados" },
  ],
  articles: [
    { title: "Como fazer um poema: 8 dicas", url: "https://www.culturagenial.com/como-fazer-um-poema/", source: "Cultura Genial" },
    { title: "O que é um Haicai (ou Haiku)?", url: "https://www.todamateria.com.br/haicai/", source: "Toda Matéria" },
    { title: "Como Escrever e Publicar um Livro de Poesia", url: "https://blog.uiclap.com/como-escrever-um-livro-de-poesia/", source: "UICLAP" },
  ]
};

type HelpViewProps = {
    onBack: () => void;
}

export const HelpView = ({ onBack }: HelpViewProps) => {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft />
        </Button>
        <h1 className="text-lg font-bold">Ajuda</h1>
        <div className="w-10"></div>
      </header>
      <ScrollArea className="flex-1">
        <main className="p-4 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Youtube className="text-red-600"/>Vídeos Tutoriais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {helpResources.videos.map((video, index) => (
                <a key={index} href={video.url} target="_blank" rel="noopener noreferrer">
                  <Card className="hover:bg-muted transition-colors">
                    <CardHeader>
                      <CardTitle className="text-base">{video.title}</CardTitle>
                      <CardDescription>{video.author}</CardDescription>
                    </CardHeader>
                  </Card>
                </a>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Newspaper />Artigos e Documentação</h2>
            <div className="space-y-3">
              {helpResources.articles.map((article, index) => (
                <a key={index} href={article.url} target="_blank" rel="noopener noreferrer">
                   <Card className="hover:bg-muted transition-colors">
                     <CardContent className="p-4 flex items-center justify-between">
                       <div>
                         <p className="font-semibold">{article.title}</p>
                         <p className="text-sm text-muted-foreground">{article.source}</p>
                       </div>
                       <ChevronRight className="h-5 w-5 text-muted-foreground" />
                     </CardContent>
                   </Card>
                </a>
              ))}
            </div>
          </section>
        </main>
      </ScrollArea>
    </div>
  );
};
```

---

### `src/components/views/LibraryView.tsx`

```typescript
'use client';

import { useState } from 'react';
import { Library, Plus, Settings, Search, Mic, ListFilter, LayoutGrid, Tag, Clock, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';
import type { Poem, View } from '@/types';
import type { User as FirebaseUser } from 'firebase/auth';
import { Logo } from '@/components/Logo';

type LibraryViewProps = {
    poems: Poem[];
    onNewPoemClick: () => void;
    onPoemClick: (poem: Poem) => void;
    onNavigate: (view: View) => void;
    user: FirebaseUser | null;
}

export const LibraryView = ({ poems, onNewPoemClick, onPoemClick, onNavigate }: LibraryViewProps) => {
  const [viewMode, setViewMode] = useState('grid');
  const [activeTab, setActiveTab] = useState('Biblioteca');

  const sortedPoems = [...poems].sort((a, b) => (b.updatedAt?.toDate()?.getTime() || 0) - (a.updatedAt?.toDate()?.getTime() || 0));


  return (
    <>
      <header className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex items-center space-x-2">
            <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('list')}>
              <ListFilter className="h-5 w-5" />
            </Button>
            <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('grid')}>
              <LayoutGrid className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Buscar poemas, tags ou conteúdo..."
            className="w-full rounded-full bg-card pl-10 pr-16"
          />
          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center space-x-1">
             <Mic className="h-5 w-5 text-gray-400" />
             <Separator orientation="vertical" className="h-6"/>
             <Filter className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-transparent p-0 justify-start border-b rounded-none">
            <TabsTrigger value="Biblioteca" className="rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary" onClick={() => onNavigate({ name: 'LIBRARY'})}>
                <Library className="h-4 w-4 mr-2"/>
                Biblioteca
            </TabsTrigger>
            <TabsTrigger value="Criar" className="rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary" onClick={() => onNavigate({ name: 'EDITOR_CHOICE'})}>
                <Plus className="h-4 w-4 mr-2"/>
                Criar
            </TabsTrigger>
            <TabsTrigger value="Configurações" className="rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary" onClick={() => onNavigate({ name: 'SETTINGS'})}>
                <Settings className="h-4 w-4 mr-2"/>
                Configurações
            </TabsTrigger>
          </TabsList>
        </Tabs>

      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className={viewMode === 'grid' ? "grid grid-cols-2 gap-4" : "space-y-4"}>
          {sortedPoems.map((poem) => {
            const isImageBg = poem.background?.type === 'image';
            const cardStyle = isImageBg ? { backgroundImage: `url(${poem.background.value})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {};
            const textColorClass = isImageBg ? 'text-white' : 'text-card-foreground';
            const mutedTextColorClass = isImageBg ? 'text-gray-200' : 'text-muted-foreground';
            const isColorBg = poem.background?.type === 'color' && poem.background.value !== 'bg-card';
            const date = poem.updatedAt?.toDate() ? new Date(poem.updatedAt.toDate()).toLocaleDateString('pt-BR') : 'Sem data';

            const cardClasses = cn(
              "rounded-2xl shadow-sm cursor-pointer overflow-hidden relative flex flex-col",
              !isImageBg && (poem.background?.value || 'bg-card')
            );
            
            return (
             <Card key={poem.id} className={cardClasses} style={cardStyle} onClick={() => onPoemClick(poem)}>
              <div className={cn("relative z-10 h-full flex flex-col justify-between flex-1", isImageBg ? 'bg-black/40' : '')}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <h2 className={cn("text-lg font-semibold", textColorClass)}>{poem.title}</h2>
                    {viewMode === 'grid' && poem.tags && poem.tags.length > 0 && <Badge variant="secondary" className={cn("border-none text-xs font-medium", isImageBg ? 'bg-white/20 text-white' : isColorBg ? 'bg-black/10' : 'bg-secondary' )}>{poem.tags[0]}</Badge>}
                  </div>
                  <p className={cn("mt-2 text-sm", mutedTextColorClass)}>{poem.excerpt}</p>
                </CardContent>
                 <div className={cn("p-4 pt-0 flex items-center justify-between text-xs", mutedTextColorClass)}>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{date}</span>
                    </div>
                    {poem.tags && (
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4" />
                        <span>{poem.tags.length} tags</span>
                      </div>
                    )}
                </div>
              </div>
            </Card>
          )})}
        </div>
      </main>
      
      <div className="fixed bottom-6 right-6">
          <Button className="h-16 w-16 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90" onClick={onNewPoemClick}>
          <Plus className="h-8 w-8" />
          </Button>
      </div>
    </>
  );
};
```

---

### `src/components/views/SettingsView.tsx`

```typescript
'use client';

import { useState } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import type { AppSettings, View, SyncStatus } from '@/types';
import { cn } from '@/lib/utils';
import { ArrowLeft, Sun, Type, Palette, Check, PenLine, Save, Globe, BrainCircuit, SlidersHorizontal, Mic, User, LogOut, Loader2, CheckCircle, CloudOff, Cloud, Bell, Clock, Pen, ShieldCheck, MapPin, History, HelpCircle, HeartHandshake, ChevronRight, RefreshCcw, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';


type SettingsViewProps = {
    onBack: () => void;
    onNavigate: (view: View) => void;
    settings: AppSettings;
    setSettings: (settings: AppSettings | ((prev: AppSettings) => AppSettings)) => void;
    user: FirebaseUser | null;
    syncStatus: SyncStatus;
    handleGoogleLogin: () => void;
    handleLogout: () => void;
    handleReset: (type: 'cache' | 'settings' | 'all') => void;
    defaultSettings: AppSettings;
};


export const SettingsView = ({ onBack, onNavigate, settings, setSettings, user, syncStatus, handleGoogleLogin, handleLogout, handleReset }: SettingsViewProps) => {
    const { 
        isDarkMode, 
        fontSize, 
        themeColor, 
        autosaveInterval, 
        correctionLanguage, 
        aiSensitivity, 
        aiPersonality, 
        enableVoiceInput,
        enableWritingReminders,
        writingReminderTime,
        enableBackupAlerts,
        enableAiSuggestionAlerts
    } = settings;

    const [showResetConfirm, setShowResetConfirm] = useState<'cache' | 'settings' | 'all' | null>(null);

    const handleThemeColorChange = (color: string) => {
        setSettings(prev => ({ ...prev, themeColor: color }));
    };

    const handleFontSizeChange = (value: number[]) => {
        setSettings(prev => ({ ...prev, fontSize: value[0] }));
    };
    
    const handleSettingChange = (key: keyof AppSettings, value: any) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const confirmReset = () => {
        if (showResetConfirm) {
            handleReset(showResetConfirm);
            setShowResetConfirm(null);
        }
    };
    
    const getSyncInfo = () => {
        switch (syncStatus) {
            case 'syncing':
                return { icon: <Loader2 className="h-5 w-5 text-primary animate-spin" />, text: 'Sincronizando...', color: 'text-primary' };
            case 'synced':
                return { icon: <CheckCircle className="h-5 w-5 text-green-600" />, text: 'Sincronizado', color: 'text-green-600' };
            case 'offline':
                return { icon: <CloudOff className="h-5 w-5 text-muted-foreground" />, text: 'Modo Offline', color: 'text-muted-foreground' };
            default:
                return { icon: <Cloud className="h-5 w-5 text-muted-foreground" />, text: 'Pronto para sincronizar', color: 'text-muted-foreground' };
        }
    };
    const syncInfo = getSyncInfo();
    
    const [reminderHour, reminderMinute] = writingReminderTime.split(':');

  return (
    <div className="flex-1 bg-background">
      <header className="flex items-center justify-between border-b bg-card p-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft />
        </Button>
        <h1 className="text-lg font-semibold">Configurações</h1>
        <div className="w-10"></div>
      </header>

      <main className="p-4 space-y-6 overflow-y-auto pb-24">
         <Card className="bg-card rounded-2xl shadow-sm overflow-hidden">
            <CardHeader>
                <CardTitle className="text-base font-medium text-muted-foreground">Aparência</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="px-6 pb-4 space-y-6">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="dark-mode" className="flex items-center gap-3">
                            <Sun className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium">Modo Escuro</span>
                        </Label>
                        <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={(checked) => handleSettingChange('isDarkMode', checked)} />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="font-size" className="flex items-center gap-3">
                          <Type className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">Tamanho da Fonte</span>
                      </Label>
                      <Slider id="font-size" value={[fontSize]} onValueChange={handleFontSizeChange} max={24} min={12} step={1} />
                       <div className="flex justify-between text-xs text-muted-foreground">
                          <span style={{fontSize: '12px'}}>A</span>
                          <span style={{fontSize: '24px'}}>A</span>
                      </div>
                      <p className="text-center text-xs text-gray-400" style={{fontSize: `${fontSize}px`}}>Exemplo de texto</p>
                    </div>

                    <div className="space-y-3">
                       <Label htmlFor="theme-color" className="flex items-center gap-3">
                          <Palette className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">Cor do Tema</span>
                       </Label>
                       <div className="flex gap-2">
                          <Button variant="outline" size="icon" className={cn("h-12 w-12 rounded-lg bg-primary", themeColor === 'default' && 'ring-2 ring-primary')} onClick={() => handleThemeColorChange('default')}>
                             {themeColor === 'default' && <Check className="h-6 w-6 text-white" />}
                          </Button>
                          <Button variant="outline" size="icon" className={cn("h-12 w-12 rounded-lg bg-blue-700 hover:bg-blue-600", themeColor === 'blue' && 'ring-2 ring-primary')} onClick={() => handleThemeColorChange('blue')}>
                            {themeColor === 'blue' && <Check className="h-6 w-6 text-white" />}
                          </Button>
                          <Button variant="outline" size="icon" className={cn("h-12 w-12 rounded-lg bg-red-600 hover:bg-red-500", themeColor === 'red' && 'ring-2 ring-primary')} onClick={() => handleThemeColorChange('red')}>
                            {themeColor === 'red' && <Check className="h-6 w-6 text-white" />}
                          </Button>
                          <Button variant="outline" size="icon" className={cn("h-12 w-12 rounded-lg bg-purple-600 hover:bg-purple-500", themeColor === 'purple' && 'ring-2 ring-primary')} onClick={() => handleThemeColorChange('purple')}>
                            {themeColor === 'purple' && <Check className="h-6 w-6 text-white" />}
                          </Button>
                       </div>
                    </div>
                </div>
            </CardContent>
        </Card>
        
        <Card className="bg-card rounded-2xl shadow-sm overflow-hidden">
          <CardHeader>
            <CardTitle className="text-base font-medium text-muted-foreground">Sobre</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <PenLine className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">PoetryPad</p>
                <p className="text-sm text-muted-foreground">Versão 1.0</p>
                <p className="text-xs text-muted-foreground mt-1">Feito por Thalyson e Guilherme</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card rounded-2xl shadow-sm overflow-hidden">
          <CardHeader>
            <CardTitle className="text-base font-medium text-muted-foreground">Preferências de Escrita</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-6 pb-4 space-y-6">
                <div className="flex items-center justify-between">
                   <Label htmlFor="autosave" className="flex items-center gap-3">
                    <Save className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Auto-salvamento</span>
                  </Label>
                  <Select value={autosaveInterval} onValueChange={(value) => handleSettingChange('autosaveInterval', value)}>
                    <SelectTrigger id="autosave" className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="60">A cada 1min</SelectItem>
                      <SelectItem value="300">A cada 5min</SelectItem>
                      <SelectItem value="600">A cada 10min</SelectItem>
                      <SelectItem value="never">Nunca</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                   <Label htmlFor="language" className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Idioma da Correção</span>
                  </Label>
                  <Select value={correctionLanguage} onValueChange={(value) => handleSettingChange('correctionLanguage', value)}>
                    <SelectTrigger id="language" className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                      <SelectItem value="en-us">Inglês (EUA)</SelectItem>
                      <SelectItem value="es-es">Espanhol (Espanha)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                    <Label htmlFor="ai-personality" className="flex items-center gap-3">
                        <BrainCircuit className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Personalidade da IA</span>
                    </Label>
                    <Select value={aiPersonality} onValueChange={(value) => handleSettingChange('aiPersonality', value)}>
                        <SelectTrigger id="ai-personality">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="default">Padrão</SelectItem>
                            <SelectItem value="creative">Criativa</SelectItem>
                            <SelectItem value="emotional">Emocional</SelectItem>
                            <SelectItem value="philosophical">Filosófica</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="ai-sensitivity" className="flex items-center gap-3">
                    <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Sensibilidade da IA</span>
                  </Label>
                  <Slider id="ai-sensitivity" value={[aiSensitivity]} onValueChange={(value) => handleSettingChange('aiSensitivity', value[0])} max={100} step={1} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Simples</span>
                    <span>Rebuscado</span>
                  </div>
                  <p className="text-center text-xs text-gray-400">Controla a complexidade do vocabulário</p>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="voice-input" className="flex items-center gap-3">
                    <Mic className="h-5 w-5 text-muted-foreground" />
                    <div className="flex flex-col">
                        <span className="font-medium">Entrada por Voz</span>
                        <span className="text-xs text-muted-foreground">Permite ditado de poemas</span>
                    </div>
                  </Label>
                  <Switch id="voice-input" checked={enableVoiceInput} onCheckedChange={(checked) => handleSettingChange('enableVoiceInput', checked)} />
                </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card rounded-2xl shadow-sm overflow-hidden">
            <CardHeader>
                <CardTitle className="text-base font-medium text-muted-foreground">Conta</CardTitle>
            </CardHeader>
            {user ? (
                <CardContent className="p-0">
                    <div className="flex items-center justify-between p-4 pl-6 border-b">
                        <div className="flex items-center gap-4">
                            <Avatar>
                                <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User Avatar'} />
                                <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{user.displayName}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={handleLogout}>
                            <LogOut className="h-5 w-5 text-destructive" />
                        </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 pl-6">
                        <div className="flex items-center gap-4">
                           {syncInfo.icon}
                            <div>
                                <p className="font-semibold">Status da Nuvem</p>
                                <p className={`text-sm ${syncInfo.color}`}>{syncInfo.text}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            ) : (
                <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-4">Faça login para salvar seus poemas na nuvem e sincronizar entre dispositivos.</p>
                    <Button className="w-full" onClick={handleGoogleLogin}>
                        <User className="mr-2 h-4 w-4" /> Entrar com Google
                    </Button>
                </CardContent>
            )}
        </Card>

        <Card className="bg-card rounded-2xl shadow-sm overflow-hidden">
          <CardHeader>
            <CardTitle className="text-base font-medium text-muted-foreground">Notificações</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-6 pb-4 space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="writing-reminders" className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <div className="flex flex-col">
                        <span className="font-medium">Lembretes de Escrita</span>
                        <span className="text-xs text-muted-foreground">Receba lembretes diários para escrever</span>
                    </div>
                  </Label>
                  <Switch id="writing-reminders" checked={enableWritingReminders} onCheckedChange={(checked) => handleSettingChange('enableWritingReminders', checked)} />
                </div>
                {enableWritingReminders && (
                    <div className="pl-8 flex items-center justify-between">
                        <Popover>
                            <PopoverTrigger asChild>
                            <div className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                    <Clock className="h-4 w-4" />
                                    <span>Horário: {writingReminderTime}</span>
                                    <Pen className="h-4 w-4" />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-2">
                            <div className="flex items-center gap-2">
                                <Select value={reminderHour} onValueChange={(hour) => handleSettingChange('writingReminderTime', `${hour}:${reminderMinute}`)}>
                                    <SelectTrigger className="w-20">
                                        <SelectValue/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from({length: 24}, (_, i) => i.toString().padStart(2, '0')).map(hour => <SelectItem key={hour} value={hour}>{hour}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <span>:</span>
                                <Select value={reminderMinute} onValueChange={(min) => handleSettingChange('writingReminderTime', `${reminderHour}:${min}`)}>
                                    <SelectTrigger className="w-20">
                                        <SelectValue/>
                                    </SelectTrigger>
                                    <SelectContent>
                                            {Array.from({length: 60}, (_, i) => i.toString().padStart(2, '0')).map(min => <SelectItem key={min} value={min}>{min}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                )}
                <Separator className="mx-auto w-[calc(100%-2rem)]"/>
                <div className="flex items-center justify-between">
                  <Label htmlFor="backup-alerts" className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                    <div className="flex flex-col">
                        <span className="font-medium">Alertas de Backup</span>
                        <span className="text-xs text-muted-foreground">Notificações sobre backup concluído</span>
                    </div>
                  </Label>
                  <Switch id="backup-alerts" checked={enableBackupAlerts} onCheckedChange={(checked) => handleSettingChange('enableBackupAlerts', checked)}/>
                </div>
                <Separator className="mx-auto w-[calc(100%-2rem)]"/>
                <div className="flex items-center justify-between">
                  <Label htmlFor="ia-suggestions" className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div className="flex flex-col">
                        <span className="font-medium">Sugestões da IA</span>
                        <span className="text-xs text-muted-foreground">Notificações sobre novas sugestões</span>
                    </div>
                  </Label>
                  <Switch id="ia-suggestions" checked={enableAiSuggestionAlerts} onCheckedChange={(checked) => handleSettingChange('enableAiSuggestionAlerts', checked)} />
                </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card rounded-2xl shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col">
              <Button variant="ghost" className="justify-start p-4 h-auto" onClick={() => onNavigate({ name: 'HELP' })}>
                <HelpCircle className="h-5 w-5 mr-4 text-muted-foreground" />
                <div>
                  <p className="font-medium text-left">Ajuda</p>
                  <p className="text-xs text-muted-foreground text-left">Documentação e tutoriais</p>
                </div>
                <ChevronRight className="h-5 w-5 ml-auto text-gray-400" />
              </Button>
              <Separator className="mx-4"/>
              <a href="mailto:thalysoncirne04@gmail.com" className="w-full">
              <Button variant="ghost" className="justify-start p-4 h-auto w-full">
                <HeartHandshake className="h-5 w-5 mr-4 text-muted-foreground" />
                <div>
                  <p className="font-medium text-left">Contatar Suporte</p>
                  <p className="text-xs text-muted-foreground text-left">Enviar feedback ou reportar problemas</p>
                </div>
                <ChevronRight className="h-5 w-5 ml-auto text-gray-400" />
              </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card rounded-2xl shadow-sm overflow-hidden">
            <CardHeader>
                <CardTitle className="text-base font-medium text-muted-foreground">Opções de Reset</CardTitle>
            </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col">
              <Button variant="ghost" className="justify-start p-4 h-auto text-green-700" onClick={() => setShowResetConfirm('cache')}>
                <RefreshCcw className="h-5 w-5 mr-4" />
                <div>
                  <p className="font-medium text-left">Limpar Poemas Locais</p>
                  <p className="text-xs text-muted-foreground text-left">Reseta os poemas para o estado inicial</p>
                </div>
                <ChevronRight className="h-5 w-5 ml-auto text-gray-400" />
              </Button>
              <Separator className="mx-4"/>
              <Button variant="ghost" className="justify-start p-4 h-auto text-yellow-600" onClick={() => setShowResetConfirm('settings')}>
                <History className="h-5 w-5 mr-4" />
                <div>
                  <p className="font-medium text-left">Restaurar Padrões</p>
                  <p className="text-xs text-muted-foreground text-left">Volta às configurações originais</p>
                </div>
                <ChevronRight className="h-5 w-5 ml-auto text-gray-400" />
              </Button>
              <Separator className="mx-4"/>
              <Button variant="ghost" className="justify-start p-4 h-auto text-red-600" onClick={() => setShowResetConfirm('all')}>
                <Trash2 className="h-5 w-5 mr-4" />
                <div>
                  <p className="font-medium text-left">Excluir Todos os Dados</p>
                  <p className="text-xs text-muted-foreground text-left">Remove todos os poemas e configs locais</p>
                </div>
                <ChevronRight className="h-5 w-5 ml-auto text-gray-400" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
        <AlertDialog open={!!showResetConfirm} onOpenChange={() => setShowResetConfirm(null)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {showResetConfirm === 'cache' && 'Isso limpará os poemas do cache local, mas não excluirá suas configurações. Poemas na nuvem não serão afetados.'}
                        {showResetConfirm === 'settings' && 'Isso restaurará todas as configurações para os valores padrão. Seus poemas não serão afetados.'}
                        {showResetConfirm === 'all' && 'Esta ação não pode ser desfeita. Isso excluirá permanentemente TODOS os seus poemas e configurações locais. Poemas na nuvem NÃO serão excluídos.'}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setShowResetConfirm(null)}>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmReset} className={cn(showResetConfirm === 'all' && 'bg-destructive text-destructive-foreground hover:bg-destructive/90')}>
                        Confirmar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
  );
};
```
- README.md:
```md
# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

```
- apphosting.yaml:
```yaml
# Settings to manage and configure a Firebase App Hosting backend.
# https://firebase.google.com/docs/app-hosting/configure

runConfig:
  # Increase this value if you'd like to automatically spin up
  # more instances in response to increased traffic.
  maxInstances: 1

```
- components.json:
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```
- .env:
```

```
- .github/workflows/dev.yml:
```yml
name: Dev

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
```
- .github/workflows/prod.yml:
```yml
name: Prod

on:
  push:
    branches:
      - release

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
```
- .github/dependabot.yml:
```yml
version: 2
updates:
  - package-ecosystem: npm
    directory: '/'
    schedule:
      interval: weekly
    open-pull-requests-limit: 10
```
- .devcontainer/devcontainer.json:
```json
{
  "name": "Firebase Genkit for JS",
  "image": "mcr.microsoft.com/devcontainers/base:ubuntu",
  "features": {
    "ghcr.io/devcontainers/features/node:1": {
      "version": "20"
    }
  },
  "forwardPorts": [3000, 9002],
  "customizations": {
    "vscode": {
      "extensions": ["genkit.genkit-tools", "dbaeumer.vscode-eslint"]
    }
  }
}
```
- .devcontainer/Dockerfile:
```dockerfile
FROM mcr.microsoft.com/devcontainers/base:ubuntu

RUN su vscode -c "source /usr/local/share/nvm/nvm.sh && nvm install 20 && nvm use 20"
```
