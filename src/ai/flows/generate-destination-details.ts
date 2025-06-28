'use server';

/**
 * @fileOverview A flow for generating destination details based on user queries.
 *
 * - generateDestinationDetails - A function that generates destination details.
 * - GenerateDestinationDetailsInput - The input type for the generateDestinationDetails function.
 * - GenerateDestinationDetailsOutput - The return type for the generateDestinationDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDestinationDetailsInputSchema = z.object({
  destination: z.string().describe('The name of the destination.'),
  query: z.string().describe('The specific details requested about the destination.'),
});
export type GenerateDestinationDetailsInput = z.infer<typeof GenerateDestinationDetailsInputSchema>;

const GenerateDestinationDetailsOutputSchema = z.object({
  details: z.string().describe('The relevant and interesting information about the destination based on the query.'),
});
export type GenerateDestinationDetailsOutput = z.infer<typeof GenerateDestinationDetailsOutputSchema>;

export async function generateDestinationDetails(input: GenerateDestinationDetailsInput): Promise<GenerateDestinationDetailsOutput> {
  return generateDestinationDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDestinationDetailsPrompt',
  input: {schema: GenerateDestinationDetailsInputSchema},
  output: {schema: GenerateDestinationDetailsOutputSchema},
  prompt: `You are a travel expert providing information about destinations.

  The user is asking for specific details about a destination.  Your job is to provide that information.

  Destination: {{{destination}}}
  Query: {{{query}}}
  `,
});

const generateDestinationDetailsFlow = ai.defineFlow(
  {
    name: 'generateDestinationDetailsFlow',
    inputSchema: GenerateDestinationDetailsInputSchema,
    outputSchema: GenerateDestinationDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
