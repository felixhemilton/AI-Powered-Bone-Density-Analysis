'use client';

import { useState } from 'react';
import { ImageUploader } from './_components/image-uploader';
import { ResultDisplay } from './_components/result-display';
import { HistoryList } from './_components/history-list';
import { analyzeXray } from './actions';
import { useToast } from '@/hooks/use-toast';
import type { AnalysisResult } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Features } from './_components/features';

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<{ preview: string; file: File } | null>(null);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const { toast } = useToast();

  const handleImageUpload = (file: File) => {
    if (image?.preview) {
      URL.revokeObjectURL(image.preview);
    }
    setImage({
      preview: URL.createObjectURL(file),
      file: file,
    });
    setCurrentResult(null);
  };

  const handleAnalyze = async () => {
    if (!image) return;

    setIsLoading(true);
    setCurrentResult(null);

    try {
      const imageDataUri = await toBase64(image.file);
      const result = await analyzeXray(imageDataUri);

      if (result.error) {
        throw new Error(result.error);
      }

      const newResult: AnalysisResult = {
        id: new Date().toISOString(),
        date: new Date().toLocaleDateString(),
        image: image.preview,
        classification: result.classification!,
        probability: result.probability!,
        riskLevel: result.riskLevel!,
      };

      setCurrentResult(newResult);
      setHistory((prev) => [newResult, ...prev]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred.';
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleClear = () => {
    if (image?.preview) {
      URL.revokeObjectURL(image.preview);
    }
    setImage(null);
    setCurrentResult(null);
  }

  const handleSelectHistory = (result: AnalysisResult) => {
    setCurrentResult(result);
  };

  const placeholderImageUrl = PlaceHolderImages.find(p => p.id === 'xray-placeholder')?.imageUrl || '/placeholder.svg';

  return (
    <>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 text-balance">
                AI-Powered Osteoporosis Risk Assessment
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-muted-foreground text-balance">
                Upload a bone X-ray to get an instant analysis of your osteoporosis risk using our advanced AI model. Early detection is key to managing bone health.
            </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <ImageUploader
              onImageUpload={handleImageUpload}
              onAnalyze={handleAnalyze}
              onClear={handleClear}
              imagePreview={image?.preview}
              isLoading={isLoading}
            />
            <HistoryList history={history} onSelect={handleSelectHistory} currentResultId={currentResult?.id} />
          </div>

          <div className="lg:col-span-3">
            <ResultDisplay result={currentResult} isLoading={isLoading} imagePreview={currentResult?.image || image?.preview || placeholderImageUrl} />
          </div>
        </div>
      </div>
      <Features />
    </>
  );
}
