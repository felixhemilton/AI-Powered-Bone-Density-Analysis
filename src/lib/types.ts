export type AnalysisResult = {
  id: string;
  date: string;
  image: string;
  classification: 'Normal' | 'Osteopenia' | 'Osteoporosis';
  probability: number;
  riskLevel: string;
};
