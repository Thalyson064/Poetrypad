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