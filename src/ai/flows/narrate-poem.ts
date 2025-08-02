'use server';

/**
 * @fileOverview Um agente de IA para narrar poemas usando Text-to-Speech.
 *
 * - narratePoem - Uma função que converte o texto de um poema em áudio.
 * - NarratePoemInput - O tipo de entrada para a função narratePoem.
 * - NarratePoemOutput - O tipo de retorno para a função narratePoem.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {googleAI}from '@genkit-ai/googleai';
import wav from 'wav';

const NarratePoemInputSchema = z.object({
    text: z.string().describe('O texto a ser narrado.'),
    voice: z.string().optional().default('Algenib').describe('O nome da voz a ser usada para a narração (ex: Algenib, Chara).'),
});
export type NarratePoemInput = z.infer<typeof NarratePoemInputSchema>;

const NarratePoemOutputSchema = z.object({
  audioDataUri: z.string().describe("O áudio do poema narrado, como um data URI no formato 'data:audio/wav;base64,<encoded_data>'."),
});
export type NarratePoemOutput = z.infer<typeof NarratePoemOutputSchema>;

export async function narratePoem(input: NarratePoemInput): Promise<NarratePoemOutput> {
  return narratePoemFlow(input);
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
    inputSchema: NarratePoemInputSchema,
    outputSchema: NarratePoemOutputSchema,
  },
  async ({ text, voice }) => {
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
            prebuiltVoiceConfig: { voiceName: voice || 'Algenib' },
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
