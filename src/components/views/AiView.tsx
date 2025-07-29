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