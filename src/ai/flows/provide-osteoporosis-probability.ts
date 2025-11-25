'use server';

/**
 * @fileOverview Provides a probability score for the likelihood of Osteopenia or Osteoporosis based on the uploaded X-ray image.
 *
 * - provideOsteoporosisProbability - A function that handles the osteoporosis probability assessment process.
 * - ProvideOsteoporosisProbabilityInput - The input type for the provideOsteoporosisProbability function.
 * - ProvideOsteoporosisProbabilityOutput - The return type for the provideOsteoporosisProbability function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideOsteoporosisProbabilityInputSchema = z.object({
  xrayImageDataUri: z
    .string()
    .describe(
      "An X-ray image of the patient's bone, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  classificationResult: z
    .enum(['Normal', 'Osteopenia', 'Osteoporosis'])
    .describe('The AI classification result of the bone density from the X-ray image.'),
});
export type ProvideOsteoporosisProbabilityInput = z.infer<typeof ProvideOsteoporosisProbabilityInputSchema>;

const ProvideOsteoporosisProbabilityOutputSchema = z.object({
  probabilityScore: z
    .number()
    .describe(
      'The probability score (0-1) for the likelihood of Osteopenia or Osteoporosis, given the X-ray image and AI classification result.'
    ),
  riskLevel: z
    .string()
    .describe('The risk level (Low, Moderate, High) for Osteopenia or Osteoporosis.'),
});
export type ProvideOsteoporosisProbabilityOutput = z.infer<typeof ProvideOsteoporosisProbabilityOutputSchema>;

export async function provideOsteoporosisProbability(
  input: ProvideOsteoporosisProbabilityInput
): Promise<ProvideOsteoporosisProbabilityOutput> {
  return provideOsteoporosisProbabilityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideOsteoporosisProbabilityPrompt',
  input: {schema: ProvideOsteoporosisProbabilityInputSchema},
  output: {schema: ProvideOsteoporosisProbabilityOutputSchema},
  prompt: `You are an AI assistant that assesses the probability of Osteopenia or Osteoporosis based on an X-ray image and AI classification result.

You will receive an X-ray image and an AI classification result (Normal, Osteopenia, or Osteoporosis).

Based on this information, provide a probability score (0-1) for the likelihood of Osteopenia or Osteoporosis.
Also, determine the risk level (Low, Moderate, High) based on the probability score. Consider that Osteoporosis has a greater fracture risk than Osteopenia.

X-ray Image: {{media url=xrayImageDataUri}}
AI Classification Result: {{{classificationResult}}}

Output the probability score and the risk level.
`,
});

const provideOsteoporosisProbabilityFlow = ai.defineFlow(
  {
    name: 'provideOsteoporosisProbabilityFlow',
    inputSchema: ProvideOsteoporosisProbabilityInputSchema,
    outputSchema: ProvideOsteoporosisProbabilityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
