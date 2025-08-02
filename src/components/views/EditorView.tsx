'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowLeft, BookText, Check, Copy, History, ImageIcon, Link, Loader2, Mic, MicOff, Paintbrush, PenLine, PlayCircle, Save, SpellCheck, Trash2, Upload, Wand2, X, PauseCircle, Download, FileAudio, Voicemail } from 'lucide-react';
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '../ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

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

const voices = {
  male: [
    { value: 'algenib', label: 'Masculina 1 (Padrão)' },
    { value: 'achernar', label: 'Masculina 2' },
    { value: 'alnilam', label: 'Masculina 3' },
    { value: 'orus', label: 'Masculina 4' },
    { value: 'rasalgethi', label: 'Masculina 5' },
    { value: 'zubenelgenubi', label: 'Masculina 6' }
  ],
  female: [
    { value: 'vindemiatrix', label: 'Feminina 1' },
    { value: 'aoede', label: 'Feminina 2' },
    { value: 'callirrhoe', label: 'Feminina 3' },
    { value: 'leda', label: 'Feminina 4' },
    { value: 'erinome', label: 'Feminina 5' },
    { value: 'pulcherrima', label: 'Feminina 6' }
  ]
};

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
    setSettings: (settings: AppSettings | ((prev: AppSettings) => AppSettings)) => void;
}

export const EditorView = ({ onBack, onSave, poem, onDelete, settings, setSettings }: EditorViewProps) => {
    const [title, setTitle] = useState(poem?.title || '');
    const [content, setContent] = useState(poem?.content || '');
    const [audioUrl, setAudioUrl] = useState(poem?.audioUrl || '');
    const [background, setBackground] = useState(poem?.background || { type: 'color', value: 'bg-card' });
    const [imageUrls, setImageUrls] = useState<string[]>(poem?.imageUrls || []);
    const [isAiLoading, setIsAiLoading] = useState(false);
    const { toast } = useToast();
    const [suggestion, setSuggestion] = useState<{ original: string, suggested: string } | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const backgroundFileInputRef = useRef<HTMLInputElement>(null);
    const contentImageFileInputRef = useRef<HTMLInputElement>(null);
    const audioFileInputRef = useRef<HTMLInputElement>(null);
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
            ...(currentPoemState || {} as Poem),
            id: currentPoemState?.id || `poem_${Date.now()}`,
            title: title || 'Sem Título',
            content,
            background,
            imageUrls,
            audioUrl,
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
    }, [title, content, background, imageUrls, audioUrl, settings.autosaveInterval]);
    
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

    const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAudioUrl(reader.result as string);
                toast({ title: "Áudio Carregado", description: "O áudio foi anexado ao poema." });
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
            const { audioDataUri } = await narratePoem({ text: fullText, voice: settings.narrationVoice });
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
                    <div className='flex items-center space-x-1'>
                        <Button variant="ghost" size="icon" onClick={toggleListening} className={cn(textColorClass, isListening ? "text-red-500 animate-pulse" : "")}>
                           {isListening ? <MicOff /> : <Mic />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => contentImageFileInputRef.current?.click()} className={textColorClass}>
                            <ImageIcon />
                        </Button>
                        <input type="file" ref={contentImageFileInputRef} onChange={handleContentImageUpload} className="hidden" accept="image/*" />
                        
                        <Button variant="ghost" size="icon" onClick={() => audioFileInputRef.current?.click()} className={textColorClass}>
                            <FileAudio />
                        </Button>
                        <input type="file" ref={audioFileInputRef} onChange={handleAudioUpload} className="hidden" accept="audio/*" />


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
                        
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="icon" disabled={narration.isLoading || isAiLoading} className={textColorClass}>
                                    {narration.isLoading ? <Loader2 className="animate-spin"/> : <PlayCircle />}
                                </Button>
                            </PopoverTrigger>
                             <PopoverContent className="w-auto p-4 space-y-2">
                                <div className='space-y-1'>
                                    <Label>Voz da Narração</Label>
                                    <Select value={settings.narrationVoice} onValueChange={(v) => setSettings(s => ({...s, narrationVoice: v}))}>
                                        <SelectTrigger className="w-48">
                                            <SelectValue placeholder="Selecione uma voz"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Vozes Masculinas</SelectLabel>
                                                {voices.male.map(voice => <SelectItem key={voice.value} value={voice.value}>{voice.label}</SelectItem>)}
                                            </SelectGroup>
                                            <SelectGroup>
                                                <SelectLabel>Vozes Femininas</SelectLabel>
                                                {voices.female.map(voice => <SelectItem key={voice.value} value={voice.value}>{voice.label}</SelectItem>)}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button onClick={handleNarration} disabled={narration.isLoading || isAiLoading} className="w-full">
                                    {narration.isLoading ? <Loader2 className="animate-spin h-4 w-4"/> : "Narrar Poema"}
                                </Button>
                            </PopoverContent>
                        </Popover>

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
                
                {(narration.audioUrl || audioUrl) && (
                     <footer className="p-4 border-t bg-background/80 backdrop-blur-sm">
                        {narration.audioUrl && (
                            <div className="flex items-center gap-4">
                                <Button variant="ghost" size="icon" onClick={() => setNarration(p => ({...p, isPlaying: !p.isPlaying}))}>
                                    {narration.isPlaying ? <PauseCircle className="h-6 w-6"/> : <PlayCircle className="h-6 w-6"/>}
                                </Button>
                                <span className="text-sm font-medium w-24">Narração da IA</span>
                                <a href={narration.audioUrl} download={`${title || 'poema'}.wav`}>
                                    <Button variant="ghost" size="icon">
                                        <Download className="h-5 w-5"/>
                                    </Button>
                                </a>
                            </div>
                        )}
                        {narration.audioUrl && audioUrl && <Separator className="my-2" />}
                         {audioUrl && (
                             <div className="flex items-center gap-4">
                                <audio src={audioUrl} controls className="w-full"></audio>
                                <Button variant="ghost" size="icon" onClick={() => setAudioUrl('')}>
                                    <Trash2 className="h-5 w-5 text-destructive" />
                                </Button>
                             </div>
                         )}
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
