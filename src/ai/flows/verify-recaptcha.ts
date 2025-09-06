'use server';
/**
 * @fileOverview A server-side flow to verify a Google reCAPTCHA token.
 *
 * - verifyRecaptcha - A function that verifies the reCAPTCHA token.
 * - VerifyRecaptchaInput - The input type for the verifyRecaptcha function.
 * - VerifyRecaptchaOutput - The return type for the verifyRecaptcha function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const VerifyRecaptchaInputSchema = z.object({
  token: z.string().describe('The reCAPTCHA token generated on the client-side.'),
});
export type VerifyRecaptchaInput = z.infer<typeof VerifyRecaptchaInputSchema>;

const VerifyRecaptchaOutputSchema = z.object({
  success: z.boolean().describe('Whether the reCAPTCHA token is valid.'),
  message: z.string().describe('A message indicating the result of the verification.'),
});
export type VerifyRecaptchaOutput = z.infer<typeof VerifyRecaptchaOutputSchema>;

export async function verifyRecaptcha(input: VerifyRecaptchaInput): Promise<VerifyRecaptchaOutput> {
  return verifyRecaptchaFlow(input);
}

const verifyRecaptchaFlow = ai.defineFlow(
  {
    name: 'verifyRecaptchaFlow',
    inputSchema: VerifyRecaptchaInputSchema,
    outputSchema: VerifyRecaptchaOutputSchema,
  },
  async ({ token }) => {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY is not set.');
      return { success: false, message: 'Server configuration error.' };
    }

    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    try {
      const response = await fetch(verificationUrl, { method: 'POST' });
      const data: any = await response.json();

      if (data.success) {
        return { success: true, message: 'reCAPTCHA verified successfully.' };
      } else {
        return { success: false, message: 'Failed reCAPTCHA verification.' };
      }
    } catch (error) {
      console.error('Error verifying reCAPTCHA:', error);
      return { success: false, message: 'An error occurred during verification.' };
    }
  }
);
