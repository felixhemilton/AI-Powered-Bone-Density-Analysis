'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import type { AnalysisResult } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { BoneIcon } from './bone-icon';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TestTube } from 'lucide-react';


const RiskBadge = ({ riskLevel }: { riskLevel: string }) => {
  const badgeClass =
    riskLevel.toLowerCase() === 'high'
      ? 'bg-destructive/80 text-destructive-foreground'
      : riskLevel.toLowerCase() === 'moderate'
      ? 'bg-yellow-500/80 text-black'
      : 'bg-green-600/80 text-white';

  return (
    <Badge className={cn("text-base border-transparent", badgeClass)}>
      {riskLevel}
    </Badge>
  );
};

export function ResultDisplay({ result, isLoading, imagePreview }: { result: AnalysisResult | null, isLoading: boolean, imagePreview: string }) {
  const chartData = result ? [{ name: 'Probability', value: result.probability * 100 }] : [];

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
          <Skeleton className="h-48 w-full" />
        </div>
      );
    }
    
    if (result) {
      return (
        <div className="space-y-6">
          <div>
            <CardTitle className="text-3xl font-bold">{result.classification}</CardTitle>
            <CardDescription>Analysis Result</CardDescription>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="bg-muted/50">
              <CardHeader>
                <CardDescription>Risk Level</CardDescription>
              </CardHeader>
              <CardContent>
                <RiskBadge riskLevel={result.riskLevel} />
              </CardContent>
            </Card>
             <Card className="bg-muted/50">
              <CardHeader>
                <CardDescription>Probability Score</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{(result.probability * 100).toFixed(1)}%</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Probability Visualization</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis type="number" domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
                  <YAxis type="category" dataKey="name" hide />
                  <Tooltip
                    cursor={{ fill: 'hsl(var(--accent))' }}
                    contentStyle={{
                      background: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 'var(--radius)',
                    }}
                    formatter={(value: number) => [`${value.toFixed(1)}%`, "Probability"]}
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
            <Alert variant="default" className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
              <TestTube className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertTitle className="text-blue-800 dark:text-blue-300">Disclaimer</AlertTitle>
              <AlertDescription className="text-blue-700 dark:text-blue-400">
                This AI analysis is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
              </AlertDescription>
            </Alert>
        </div>
      );
    }

    return (
       <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-muted/50 rounded-xl">
          <div className="p-4 bg-background rounded-full border">
            <BoneIcon className="w-16 h-16 text-primary" />
          </div>
          <h2 className="mt-6 text-2xl font-bold">Welcome to BoneCheck AI</h2>
          <p className="mt-2 text-muted-foreground text-balance">
            Upload an X-ray image of a bone to get started with your osteoporosis risk assessment.
          </p>
        </div>
    );
  };

  return (
    <Card className="sticky top-24">
       <CardHeader>
        <CardTitle>2. View Result</CardTitle>
        <CardDescription>See the analysis from our AI model.</CardDescription>
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted mt-4">
            {imagePreview ? (
              <Image
                  src={imagePreview}
                  alt="X-ray to be analyzed"
                  fill
                  className="object-contain"
                />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-muted/50">
                <p className="text-muted-foreground">Your image will appear here</p>
              </div>
            )}
        </div>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
}
