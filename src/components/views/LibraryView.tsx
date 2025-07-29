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