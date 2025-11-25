'use server';

import { assessOsteoporosisRisk } from '@/ai/flows/assess-osteoporosis-risk';
import { provideOsteoporosisProbability } from '@/ai/flows/provide-osteoporosis-probability';
import { z } from 'zod';

const resultSchema = z.object({
  classification: z.enum(['Normal', 'Osteopenia', 'Osteoporosis']),
  probability: z.number(),
  riskLevel: z.string(),
  error: z.string().optional(),
});

export async function analyzeXray(imageDataUri: string): Promise<Partial<z.infer<typeof resultSchema>>> {
  try {
    if (!imageDataUri.startsWith('data:image/')) {
        throw new Error('Invalid image data URI format.');
    }

    const classificationResult = await assessOsteoporosisRisk({
      xrayImageDataUri: imageDataUri,
    });

    if (!classificationResult || !classificationResult.riskAssessment) {
      throw new Error('Failed to get classification from AI.');
    }

    const probabilityResult = await provideOsteoporosisProbability({
      xrayImageDataUri: imageDataUri,
      classificationResult: classificationResult.riskAssessment,
    });
    
    if (probabilityResult.probabilityScore === undefined || !probabilityResult.riskLevel) {
        throw new Error('Failed to get probability from AI.');
    }

    return {
      classification: classificationResult.riskAssessment,
      probability: probabilityResult.probabilityScore,
      riskLevel: probabilityResult.riskLevel,
    };
  } catch (error) {
    console.error('Error during AI analysis:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred during analysis.';
    return { error: message };
  }
}
