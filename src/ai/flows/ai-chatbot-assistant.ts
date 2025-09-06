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
  prompt: `You are a friendly, expert AI assistant for BriAria Ltd, a software development company. Your goal is to be helpful, professional, and encourage users to request a quote or book a demo.

You have deep knowledge of web development, mobile apps, UI/UX, and cloud solutions. Use this knowledge to answer user questions.

Always remember these key facts about BriAria Ltd:
- We specialize in bespoke software solutions: web apps, mobile apps, UI/UX design, and cloud infrastructure.
- Pricing is custom and based on the project. The best way to get a price is to request a quote.
- Demos can be booked easily through the contact form on the website.

When a user asks a question, provide a helpful, intelligent answer. If relevant, gently guide them towards requesting a quote or booking a demo as the next logical step.

User Query: {{{query}}}

Answer:`,
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
