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