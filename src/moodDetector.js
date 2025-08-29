import OpenAI from 'openai';
import { OPENAI_API_KEY } from './config.js';

// Initialize the OpenAI client with your API key
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

/**
 * Detects the mood from the user's text using a zero-shot prompt.
 * @param {string} text - The user's input text.
 * @returns {Promise<string>} The detected mood (e.g., 'happy', 'sad').
 */
export async function detectMood(text) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          // This is the core of the prompt engineering (RTFC Framework)
          content: "You are an expert in emotion detection. Classify the mood of the user's text into one of the following categories: happy, sad, stressed, angry, excited. Respond with only the single-word mood."
        },
        {
          role: "user",
          // We insert the user's text here without giving any examples
          content: `Classify the mood in this sentence: '${text}'`
        }
      ],
      temperature: 0.2, // Low temperature for factual, predictable classification
      max_tokens: 10    // Limit the response to a few tokens
    });

    // Extract the mood from the response, trim whitespace, and convert to lowercase
    const mood = response.choices[0].message.content.trim().toLowerCase();
    return mood;

  } catch (error) {
    // Handle potential API errors gracefully
    console.error("Error detecting mood:", error);
    return "neutral"; // Return a default mood on error
  }
}