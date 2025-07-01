'use server';

/**
 * @fileOverview An AI-powered packing assistant.
 *
 * - generatePackingList - A function that creates a packing list based on trip details.
 * - GeneratePackingListInput - The input type for the generatePackingList function.
 * - GeneratePackingListOutput - The return type for the generatePackingList function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getWeatherForecast, type GetWeatherForecastOutput } from './get-weather-forecast';

const GeneratePackingListInputSchema = z.object({
  destination: z.string().describe('The destination city and country, e.g., "Paris, France".'),
  tripLength: z.number().describe('The duration of the trip in days.'),
  activities: z.string().describe('A description of planned activities, e.g., "hiking, fine dining, visiting museums".'),
});
export type GeneratePackingListInput = z.infer<typeof GeneratePackingListInputSchema>;

const PackingItemSchema = z.object({
  item: z.string().describe('The packing item, e.g., "Waterproof jacket".'),
  quantity: z.number().describe('The suggested quantity for the item.'),
});

const PackingCategorySchema = z.object({
    category: z.string().describe('The category name, e.g., "Clothing" or "Essentials".'),
    items: z.array(PackingItemSchema).describe('A list of items in this category.'),
});

const GeneratePackingListOutputSchema = z.object({
  packingList: z.array(PackingCategorySchema).describe("A comprehensive, categorized packing list."),
  notes: z.string().optional().describe("Additional helpful notes or reminders related to packing for this specific trip."),
});
export type GeneratePackingListOutput = z.infer<typeof GeneratePackingListOutputSchema>;

export async function generatePackingList(
  input: GeneratePackingListInput
): Promise<GeneratePackingListOutput> {
  return generatePackingListFlow(input);
}

// Helper function to format the weather forecast for the prompt
const formatWeatherForPrompt = (weather: GetWeatherForecastOutput) => {
    if (!weather || !weather.forecast || weather.forecast.length === 0) {
        return "No weather data available.";
    }
    const summary = weather.forecast.map(day => 
        `${day.day}: High ${day.high}°C, Low ${day.low}°C, ${day.condition}`
    ).join('\n');
    return `
Here is the 10-day weather forecast:
${summary}
    `;
};


const prompt = ai.definePrompt({
  name: 'generatePackingListPrompt',
  input: { schema: z.object({
    destination: z.string(),
    tripLength: z.number(),
    activities: z.string(),
    weather: z.string(), // Weather forecast passed as a formatted string
  })},
  output: { schema: GeneratePackingListOutputSchema },
  prompt: `You are a smart packing assistant. Your task is to generate a comprehensive, personalized packing list for a trip.

Consider the following trip details:
- Destination: {{{destination}}}
- Trip Duration: {{{tripLength}}} days
- Planned Activities: {{{activities}}}
- Weather Forecast: {{{weather}}}

Based on all these factors, create a detailed packing list. Organize the items into logical categories (e.g., Clothing, Toiletries, Electronics, Documents, Essentials, Miscellaneous). For each item, suggest a quantity. For clothing, be specific (e.g., "T-shirts", "Pairs of socks").

Provide some helpful packing notes at the end, like reminders to check passport validity or pack medications.
`,
});

const generatePackingListFlow = ai.defineFlow(
  {
    name: 'generatePackingListFlow',
    inputSchema: GeneratePackingListInputSchema,
    outputSchema: GeneratePackingListOutputSchema,
  },
  async (input) => {
    // Step 1: Get the weather forecast
    const weatherData = await getWeatherForecast({ destination: input.destination });

    // Step 2: Format the weather data into a string for the prompt
    const weatherPromptString = formatWeatherForPrompt(weatherData);

    // Step 3: Call the prompt with all the necessary information
    const { output } = await prompt({
      ...input,
      weather: weatherPromptString,
    });
    
    return output!;
  }
);
