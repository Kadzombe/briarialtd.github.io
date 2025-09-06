'use server';

/**
 * @fileOverview An AI chatbot assistant for answering user inquiries about BriAria's services, pricing, and demo bookings.
 *
 * - aiChatbotAssistant - A function that processes user questions and returns answers.
 * - AIChatbotAssistantInput - The input type for the aiChatbotAssistant function.
 * - AIChatbotAssistantOutput - The return type for the aiChatbotAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatbotAssistantInputSchema = z.object({
  query: z.string().describe('The user query about BriAria services, pricing, or demo bookings.'),
});
export type AIChatbotAssistantInput = z.infer<typeof AIChatbotAssistantInputSchema>;

const AIChatbotAssistantOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query.'),
});
export type AIChatbotAssistantOutput = z.infer<typeof AIChatbotAssistantOutputSchema>;

export async function aiChatbotAssistant(input: AIChatbotAssistantInput): Promise<AIChatbotAssistantOutput> {
  return aiChatbotAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatbotAssistantPrompt',
  input: {schema: AIChatbotAssistantInputSchema},
  output: {schema: AIChatbotAssistantOutputSchema},
  prompt: `You are a chatbot assistant for BriAria Ltd. Your goal is to answer user questions about BriAria's services, pricing, and demo bookings.

  Use the following information to answer the user query:
  - BriAria Ltd offers software development services, including web and mobile app development.
  - Pricing varies depending on the project scope and complexity. Contact us for a quote.
  - Demo bookings can be scheduled through our website on the booking page.

  User Query: {{{query}}}

  Answer: `,
});

const aiChatbotAssistantFlow = ai.defineFlow(
  {
    name: 'aiChatbotAssistantFlow',
    inputSchema: AIChatbotAssistantInputSchema,
    outputSchema: AIChatbotAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
