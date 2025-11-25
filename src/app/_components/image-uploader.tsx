'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud, FileImage, X, RotateCw } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  onAnalyze: () => void;
  onClear: () => void;
  imagePreview?: string;
  isLoading: boolean;
}

export function ImageUploader({ onImageUpload, onAnalyze, onClear, imagePreview, isLoading }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onImageUpload(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onImageUpload(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Upload X-ray Image</CardTitle>
        <CardDescription>Upload a bone X-ray for analysis.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {imagePreview ? (
          <div className="space-y-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
              <Image
                src={imagePreview}
                alt="X-ray preview"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={onAnalyze} disabled={isLoading} className="w-full">
                {isLoading ? <><RotateCw className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</> : 'Analyze Image'}
              </Button>
              <Button onClick={onClear} variant="outline" size="icon" aria-label="Clear image" disabled={isLoading}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors bg-accent/50"
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <UploadCloud className="w-12 h-12 text-muted-foreground" />
            <p className="mt-4 text-sm text-muted-foreground">
              <span className="font-semibold text-primary">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP</p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/jpeg, image/webp"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
