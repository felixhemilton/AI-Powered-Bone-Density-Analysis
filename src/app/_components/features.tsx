'use client';

import {
  BrainCircuit,
  ScanSearch,
  FileBarChart2,
  GitMerge,
  Bone,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const features = [
  {
    icon: <BrainCircuit className="w-8 h-8 text-primary" />,
    title: 'Clinical Feature Fusion Model',
    description:
      'Combines image features with patient clinical data for improved prediction accuracy using multi-modal learning.',
    points: [
      'Considers factors like age, gender, BMI, lifestyle.',
      'Reflects real-world clinical diagnosis patterns.',
      'Produces more reliable results than image-only models.',
      'Helps in personalized treatment planning.',
      'Reduces false positives and false negatives.',
      'Enhances robustness across different populations.',
      'Integrates medical history for complete risk evaluation.',
    ],
  },
  {
    icon: <ScanSearch className="w-8 h-8 text-primary" />,
    title: 'Opportunistic Screening',
    description:
      'Screens for osteoporosis using existing scans taken for other reasons, without needing a separate DEXA scan.',
    points: [
      'Helps detect bone problems early and unexpectedly.',
      'Uses routine X-rays/CT scans (e.g., chest, abdomen).',
      'Saves time and resources for hospitals.',
      'Identifies at-risk individuals who may not visit for bone checkups.',
      'Allows large-scale screening at low cost.',
      'Works automatically without extra clinician effort.',
      'Improves early diagnosis rates significantly.',
    ],
  },
  {
    icon: <FileBarChart2 className="w-8 h-8 text-primary" />,
    title: 'Fracture Risk Prediction',
    description:
      'Predicts the chance of future bone fractures using BMD, bone geometry, and structural patterns.',
    points: [
      'Incorporates patient details like age, sex, BMI.',
      'Helps identify high-risk patients before fractures occur.',
      'Uses machine learning for probability scoring.',
      'Supports planning preventive treatments.',
      'Can model hip, spine, and wrist fracture risks.',
      'Provides personalized risk assessment.',
      'Works similarly to FRAX but is AI-enhanced.',
    ],
  },
  {
    icon: <GitMerge className="w-8 h-8 text-primary" />,
    title: 'Osteoporosis / Osteopenia Classification',
    description:
      'Classifies bone condition into Normal, Osteopenia, or Osteoporosis with high accuracy using CNN-based feature extraction.',
    points: [
      'Considers density, structure, and texture of bones.',
      'Helps early identification of bone mineral loss.',
      'Highlights risk levels to the doctor or patient.',
      'Uses labelled datasets for model training.',
      'Predicts disease severity using deep learning.',
      'Reduces manual interpretation errors.',
      'Supports clinical decision-making effectively.',
    ],
  },
  {
    icon: <Bone className="w-8 h-8 text-primary" />,
    title: 'Bone Segmentation',
    description:
      'Utilizes CNN architectures like U-Net to identify cortical and trabecular bone regions for precise analysis.',
    points: [
      'Helps calculate accurate bone mineral density (BMD).',
      'Enables detailed shape and texture analysis of the bone.',
      'Removes unwanted areas to focus on true bone structure.',
      'Provides a mask output for precise measurement.',
      'Improves the reliability of the classification model.',
      'Allows extraction of micro-structural bone patterns.',
      'Plays a key role in quantitative bone health assessment.',
    ],
  },
];

export function Features() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
              Our Technology
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-balance">
              Advanced AI for Comprehensive Bone Health Analysis
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-balance">
              Our platform leverages state-of-the-art machine learning models to
              provide a multi-faceted assessment of osteoporosis risk, from
              image classification to predictive analytics.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
          {features.slice(0, 3).map((feature) => (
            <div
              key={feature.title}
              className="grid gap-2 p-4 rounded-lg hover:bg-card transition-colors shadow-sm border border-transparent hover:border-border"
            >
              <div className="flex items-center gap-3">
                {feature.icon}
                <h3 className="text-lg font-bold">{feature.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-3">
                  <GitMerge className="w-6 h-6 text-primary" />
                  Osteoporosis / Osteopenia Classification
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                  {features[3].points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-3">
                  <Bone className="w-6 h-6 text-primary" />
                  Bone Segmentation
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                  {features[4].points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
