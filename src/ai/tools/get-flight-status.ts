'use server';

/**
 * @fileOverview A Genkit tool for fetching the status of a flight.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const getFlightStatus = ai.defineTool(
  {
    name: 'getFlightStatus',
    description: 'Returns the current status of a flight.',
    inputSchema: z.object({
      flightNumber: z
        .string()
        .describe('The flight number, e.g., "UA2432" or "BA2490".'),
      date: z
        .string()
        .describe(
          'The date of the flight in YYYY-MM-DD format. If not provided, assume today.'
        ),
    }),
    outputSchema: z.object({
      status: z.enum(['On Time', 'Delayed', 'Cancelled', 'Departed', 'Arrived']),
      departureTime: z.string().describe('The scheduled departure time in ISO 8601 format.'),
      arrivalTime: z.string().describe('The scheduled arrival time in ISO 8601 format.'),
      departureTerminal: z.string().optional(),
      arrivalTerminal: z.string().optional(),
      departureGate: z.string().optional(),
      arrivalGate: z.string().optional(),
      departureTimezone: z.string().optional().describe("The IANA timezone name for the departure airport, e.g., 'America/New_York'."),
      arrivalTimezone: z.string().optional().describe("The IANA timezone name for the arrival airport, e.g., 'Europe/London'."),
    }),
  },
  async (input) => {
    console.log(`[Flight Tool] Getting status for ${input.flightNumber}`);

    // In a real application, you would call a third-party flight data API here.
    // For this example, we'll return mock data.
    const statuses = ['On Time', 'Delayed', 'Arrived'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    return {
      status: randomStatus as any,
      departureTime: new Date(new Date().setHours(10, 30)).toISOString(),
      arrivalTime: new Date(new Date().setHours(13, 45)).toISOString(),
      departureTerminal: '2',
      departureGate: `D${Math.floor(Math.random() * 20) + 1}`,
      arrivalTerminal: '5',
      arrivalGate: `A${Math.floor(Math.random() * 15) + 1}`,
      departureTimezone: 'America/New_York',
      arrivalTimezone: 'Europe/London',
    };
  }
);
