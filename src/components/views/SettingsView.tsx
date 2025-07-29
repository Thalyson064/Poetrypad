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