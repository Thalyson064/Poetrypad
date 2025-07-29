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