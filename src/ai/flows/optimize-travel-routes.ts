'use server';

/**
 * @fileOverview AI-powered travel route optimizer.
 *
 * - optimizeTravelRoutes - A function that optimizes travel routes between locations.
 * - OptimizeTravelRoutesInput - The input type for the optimizeTravelRoutes function.
 * - OptimizeTravelRoutesOutput - The return type for the optimizeTravelRoutes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeTravelRoutesInputSchema = z.object({
  itinerary: z
    .string()
    .describe(
      'A detailed description of the planned itinerary, including locations, activities, and transportation methods.'
    ),
  realTimeConditions: z
    .string()
    .optional()
    .describe(
      'Optional real-time conditions such as traffic, weather, and public transportation delays.'
    ),
});
export type OptimizeTravelRoutesInput = z.infer<typeof OptimizeTravelRoutesInputSchema>;

const OptimizeTravelRoutesOutputSchema = z.object({
  optimizedItinerary: z.string().describe('The optimized itinerary with efficient travel routes.'),
  summary: z.string().describe('A summary of the changes made to the original itinerary.'),
});
export type OptimizeTravelRoutesOutput = z.infer<typeof OptimizeTravelRoutesOutputSchema>;

export async function optimizeTravelRoutes(
  input: OptimizeTravelRoutesInput
): Promise<OptimizeTravelRoutesOutput> {
  return optimizeTravelRoutesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeTravelRoutesPrompt',
  input: {schema: OptimizeTravelRoutesInputSchema},
  output: {schema: OptimizeTravelRoutesOutputSchema},
  prompt: `You are an AI travel assistant that specializes in optimizing travel routes based on real-time conditions.

You will be provided with a planned itinerary and, optionally, real-time conditions such as traffic, weather, and public transportation delays.

Your goal is to optimize the travel routes within the itinerary to find the most efficient paths between locations, taking into account the provided real-time conditions.

Itinerary: {{{itinerary}}}
Real-time Conditions: {{{realTimeConditions}}}

Provide the optimized itinerary and a summary of the changes you made to the original itinerary.
`,
});

const optimizeTravelRoutesFlow = ai.defineFlow(
  {
    name: 'optimizeTravelRoutesFlow',
    inputSchema: OptimizeTravelRoutesInputSchema,
    outputSchema: OptimizeTravelRoutesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
