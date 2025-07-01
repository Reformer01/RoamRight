'use server';

/**
 * @fileOverview A flow for getting the 10-day weather forecast for a destination.
 *
 * - getWeatherForecast - A function that returns a weather forecast.
 * - GetWeatherForecastInput - The input type for the getWeatherForecast function.
 * - GetWeatherForecastOutput - The return type for the getWeatherForecast function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetWeatherForecastInputSchema = z.object({
  destination: z.string().describe('The name of the destination, e.g., "Paris, France".'),
});
export type GetWeatherForecastInput = z.infer<typeof GetWeatherForecastInputSchema>;

const DailyForecastSchema = z.object({
    day: z.string().describe("Day of the week, e.g., 'Monday'"),
    date: z.string().describe("The date, e.g., 'July 29'"),
    high: z.number().describe('The high temperature in Celsius.'),
    low: z.number().describe('The low temperature in Celsius.'),
    condition: z.string().describe("A brief description of the weather condition, e.g., 'Sunny' or 'Partly Cloudy'."),
    icon: z.enum(['Sun', 'Cloud', 'Cloudy', 'CloudRain', 'CloudSun', 'CloudSnow', 'CloudLightning', 'Wind', 'Thermometer']).describe("An icon name representing the weather condition."),
});

const GetWeatherForecastOutputSchema = z.object({
  forecast: z.array(DailyForecastSchema).length(10).describe('A 10-day weather forecast.'),
});
export type GetWeatherForecastOutput = z.infer<typeof GetWeatherForecastOutputSchema>;

export async function getWeatherForecast(
  input: GetWeatherForecastInput
): Promise<GetWeatherForecastOutput> {
  return getWeatherForecastFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getWeatherForecastPrompt',
  input: {schema: GetWeatherForecastInputSchema},
  output: {schema: GetWeatherForecastOutputSchema},
  prompt: `You are a weather service API. Given a destination, provide a realistic 10-day weather forecast starting from today.

  Today's date is ${new Date().toDateString()}.

  Destination: {{{destination}}}

  Provide the forecast as an array of 10 daily forecasts. Each forecast should include the day of the week, date, high and low temperatures in Celsius, a brief condition description, and a corresponding icon name.
  `,
});

const getWeatherForecastFlow = ai.defineFlow(
  {
    name: 'getWeatherForecastFlow',
    inputSchema: GetWeatherForecastInputSchema,
    outputSchema: GetWeatherForecastOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
