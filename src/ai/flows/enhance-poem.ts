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