'use server';

import {
  generateDestinationDetails,
  type GenerateDestinationDetailsInput,
  type GenerateDestinationDetailsOutput,
} from '@/ai/flows/generate-destination-details';
import {
  getWeatherForecast,
  type GetWeatherForecastInput,
  type GetWeatherForecastOutput,
} from '@/ai/flows/get-weather-forecast';
import {
  optimizeTravelRoutes,
  type OptimizeTravelRoutesInput,
  type OptimizeTravelRoutesOutput,
} from '@/ai/flows/optimize-travel-routes';

export async function optimizeItineraryAction(
  data: OptimizeTravelRoutesInput
): Promise<{ data: OptimizeTravelRoutesOutput | null; error: string | null }> {
  try {
    const result = await optimizeTravelRoutes(data);
    return { data: result, error: null };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: 'Failed to optimize itinerary. Please try again.',
    };
  }
}

export async function generateDestinationDetailsAction(
  data: GenerateDestinationDetailsInput
): Promise<{
  data: GenerateDestinationDetailsOutput | null;
  error: string | null;
}> {
  try {
    const result = await generateDestinationDetails(data);
    return { data: result, error: null };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: 'Failed to generate details. Please try again.',
    };
  }
}

export async function getWeatherForecastAction(
  data: GetWeatherForecastInput
): Promise<{ data: GetWeatherForecastOutput | null; error: string | null }> {
  try {
    const result = await getWeatherForecast(data);
    return { data: result, error: null };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: 'Failed to get weather forecast. Please try again.',
    };
  }
}
