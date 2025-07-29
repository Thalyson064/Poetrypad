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