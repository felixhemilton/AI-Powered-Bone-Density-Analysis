import { config } from 'dotenv';
config();

import '@/ai/flows/assess-osteoporosis-risk.ts';
import '@/ai/flows/provide-osteoporosis-probability.ts';