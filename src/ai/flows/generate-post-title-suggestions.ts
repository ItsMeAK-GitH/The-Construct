'use server';

/**
 * @fileOverview Generates post title suggestions based on content.
 *
 * - generatePostTitleSuggestions - A function that generates post title suggestions.
 * - GeneratePostTitleSuggestionsInput - The input type for the generatePostTitleSuggestions function.
 * - GeneratePostTitleSuggestionsOutput - The return type for the generatePostTitleSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePostTitleSuggestionsInputSchema = z.object({
  content: z.string().describe('The content of the blog post.'),
});
export type GeneratePostTitleSuggestionsInput = z.infer<typeof GeneratePostTitleSuggestionsInputSchema>;

const GeneratePostTitleSuggestionsOutputSchema = z.object({
  titleSuggestions: z.array(z.string()).describe('An array of suggested titles for the blog post.'),
});
export type GeneratePostTitleSuggestionsOutput = z.infer<typeof GeneratePostTitleSuggestionsOutputSchema>;

export async function generatePostTitleSuggestions(input: GeneratePostTitleSuggestionsInput): Promise<GeneratePostTitleSuggestionsOutput> {
  return generatePostTitleSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePostTitleSuggestionsPrompt',
  input: {schema: GeneratePostTitleSuggestionsInputSchema},
  output: {schema: GeneratePostTitleSuggestionsOutputSchema},
  prompt: `You are an expert blog post title generator. Given the content of a blog post, you will generate 5 engaging and relevant titles.

Content: {{{content}}}

Titles:`, // Removed JSON format requirement
});

const generatePostTitleSuggestionsFlow = ai.defineFlow(
  {
    name: 'generatePostTitleSuggestionsFlow',
    inputSchema: GeneratePostTitleSuggestionsInputSchema,
    outputSchema: GeneratePostTitleSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      titleSuggestions: output!.titleSuggestions
    };
  }
);
