'use server';
/**
 * @fileOverview Assesses osteoporosis risk based on an X-ray image.
 *
 * - assessOsteoporosisRisk - A function that handles the osteoporosis risk assessment process.
 * - AssessOsteoporosisRiskInput - The input type for the assessOsteoporosisRisk function.
 * - AssessOsteoporosisRiskOutput - The return type for the assessOsteoporosisRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssessOsteoporosisRiskInputSchema = z.object({
  xrayImageDataUri: z
    .string()
    .describe(
      "An X-ray image as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AssessOsteoporosisRiskInput = z.infer<typeof AssessOsteoporosisRiskInputSchema>;

const AssessOsteoporosisRiskOutputSchema = z.object({
  riskAssessment: z
    .enum(['Normal', 'Osteopenia', 'Osteoporosis'])
    .describe('The AI assessment of osteoporosis risk based on the X-ray image.'),
});
export type AssessOsteoporosisRiskOutput = z.infer<typeof AssessOsteoporosisRiskOutputSchema>;

export async function assessOsteoporosisRisk(
  input: AssessOsteoporosisRiskInput
): Promise<AssessOsteoporosisRiskOutput> {
  return assessOsteoporosisRiskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assessOsteoporosisRiskPrompt',
  input: {schema: AssessOsteoporosisRiskInputSchema},
  output: {schema: AssessOsteoporosisRiskOutputSchema},
  prompt: `You are an AI assistant that analyzes X-ray images to assess the risk of osteoporosis.
  Based on the provided X-ray image, classify the bone density into one of the following categories:
  - Normal
  - Osteopenia (early stage bone loss)
  - Osteoporosis (high fracture risk)

  Analyze the following X-ray image and provide the risk assessment:
  {{media url=xrayImageDataUri}}
  \nResponse must be one of the 3 enums.
  Response: `,
});

const assessOsteoporosisRiskFlow = ai.defineFlow(
  {
    name: 'assessOsteoporosisRiskFlow',
    inputSchema: AssessOsteoporosisRiskInputSchema,
    outputSchema: AssessOsteoporosisRiskOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
