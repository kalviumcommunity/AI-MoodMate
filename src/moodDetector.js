import OpenAI from 'openai';
import { OPENAI_API_KEY } from './config.js';

// Initialize the OpenAI client with your API key
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

/**
 * Detects the mood from the user's text using a MULTI-SHOT prompt.
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
          // The system prompt remains the same
          content: "You are an expert in emotion detection. Classify the mood of the user's text into one of the following categories: happy, sad, stressed, angry, excited. Respond with only the single-word mood."
        },
        
        // --- MULTI-SHOT EXAMPLES ---
        // We provide several diverse examples to guide the model.
        {
          role: "user",
          content: "I just won my football match, I'm so thrilled!" // Example 1
        },
        {
          role: "assistant",
          content: "happy"
        },
        {
          role: "user",
          content: "I have three exams tomorrow and I haven't started studying. I'm so overwhelmed." // Example 2
        },
        {
          role: "assistant",
          content: "stressed"
        },
        {
          role: "user",
          content: "I feel so down after failing my test." // Example 3
        },
        {
          role: "assistant",
          content: "sad"
        },
        // --- END OF EXAMPLES ---

        {
          role: "user",
          // This is the actual user input we want to classify
          content: `Classify the mood in this sentence: '${text}'`
        }
      ],
      temperature: 0.1, // Keep temperature low for high consistency
      max_tokens: 10
    });

    const mood = response.choices[0].message.content.trim().toLowerCase();
    return mood;

  } catch (error) {
    console.error("Error detecting mood:", error);
    return "neutral";
  }
}