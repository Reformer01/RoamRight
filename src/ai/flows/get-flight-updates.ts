'use server';

/**
 * @fileOverview A flow for getting flight updates.
 *
 * - getFlightUpdates - A function that gets flight updates using a tool.
 * - GetFlightUpdatesInput - The input type for the getFlightUpdates function.
 * - GetFlightUpdatesOutput - The return type for the getFlightUpdates function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getFlightStatus } from '@/ai/tools/get-flight-status';

const GetFlightUpdatesInputSchema = z.object({
  flightNumber: z.string().describe('The flight number.'),
});
export type GetFlightUpdatesInput = z.infer<typeof GetFlightUpdatesInputSchema>;

const GetFlightUpdatesOutputSchema = z.object({
  update: z.string().describe('A friendly, conversational update about the flight status.'),
});
export type GetFlightUpdatesOutput = z.infer<typeof GetFlightUpdatesOutputSchema>;

export async function getFlightUpdates(
  input: GetFlightUpdatesInput
): Promise<GetFlightUpdatesOutput> {
  return getFlightUpdatesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'flightUpdatePrompt',
  input: { schema: GetFlightUpdatesInputSchema },
  output: { schema: GetFlightUpdatesOutputSchema },
  tools: [getFlightStatus],
  prompt: `You are a helpful flight assistant. A user is asking for an update on their flight.

  Use the getFlightStatus tool to look up the current information for the provided flight number.

  Flight Number: {{{flightNumber}}}
  Date: ${new Date().toISOString().split('T')[0]}

  Once you have the flight details from the tool, provide a clear, concise, and friendly update to the user.
  The tool returns times in UTC (ISO 8601 format) but also provides the IANA timezone for departure and arrival.
  Present the times to the user in a readable format, making sure to clearly state the local time and timezone for both departure and arrival (e.g., "10:30 AM EST" or "1:45 PM GMT").
  `,
});

const getFlightUpdatesFlow = ai.defineFlow(
  {
    name: 'getFlightUpdatesFlow',
    inputSchema: GetFlightUpdatesInputSchema,
    outputSchema: GetFlightUpdatesOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
