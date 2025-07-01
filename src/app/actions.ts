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
import {
  getFlightUpdates,
  type GetFlightUpdatesInput,
  type GetFlightUpdatesOutput,
} from '@/ai/flows/get-flight-updates';
import {
  generatePackingList,
  type GeneratePackingListInput,
  type GeneratePackingListOutput,
} from '@/ai/flows/generate-packing-list';

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

export async function getFlightUpdatesAction(
  data: GetFlightUpdatesInput
): Promise<{ data: GetFlightUpdatesOutput | null; error: string | null }> {
  try {
    const result = await getFlightUpdates(data);
    return { data: result, error: null };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: 'Failed to get flight updates. Please try again.',
    };
  }
}

export async function generatePackingListAction(
  data: GeneratePackingListInput
): Promise<{ data: GeneratePackingListOutput | null; error: string | null }> {
  try {
    const result = await generatePackingList(data);
    return { data: result, error: null };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: 'Failed to generate packing list. Please try again.',
    };
  }
}
