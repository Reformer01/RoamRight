'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/generate-destination-details.ts';
import '@/ai/flows/optimize-travel-routes.ts';
import '@/ai/flows/get-weather-forecast.ts';
import '@/ai/flows/get-flight-updates.ts';
import '@/ai/flows/generate-packing-list.ts';
