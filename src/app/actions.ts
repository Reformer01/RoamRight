'use server';

import {
  optimizeTravelRoutes,
  type OptimizeTravelRoutesInput,
  type OptimizeTravelRoutesOutput,
} from "@/ai/flows/optimize-travel-routes";

export async function optimizeItineraryAction(
  data: OptimizeTravelRoutesInput
): Promise<{ data: OptimizeTravelRoutesOutput | null; error: string | null }> {
  try {
    const result = await optimizeTravelRoutes(data);
    return { data: result, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: "Failed to optimize itinerary. Please try again." };
  }
}
