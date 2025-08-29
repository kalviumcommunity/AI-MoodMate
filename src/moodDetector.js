import OpenAI from 'openai';
import { OPENAI_API_KEY } from './config.js';

// Initialize the OpenAI client with your API key
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});


export async function detectMood(text) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          // The system prompt is updated to require a chain of thought.
          content: "You are an expert in emotion detection. First, explain your reasoning in a 'Reasoning:' section. Then, provide the final classification on a new line as 'Final Mood: [mood]'. The possible moods are: happy, sad, stressed, angry, excited."
        },
        

        // --- CHAIN-OF-THOUGHT EXAMPLES ---
        // The examples now include the reasoning process.
        {
          role: "user",
          content: "I just won my football match, I'm so thrilled!"
        },
        {
          role: "assistant",
          content: "Reasoning: The user mentions winning a match and uses the word 'thrilled,' which are strong indicators of excitement and happiness.\nFinal Mood: happy"
        },
        {
          role: "user",
          content: "I have three exams tomorrow and I haven't started studying. I'm so overwhelmed."
        },
        {
          role: "assistant",
          content: "Reasoning: The user mentions multiple exams, lack of preparation, and the feeling of being 'overwhelmed.' This points directly to a state of stress.\nFinal Mood: stressed"
=======
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

    });

    const fullResponse = response.choices[0].message.content;

    // --- PARSING LOGIC ---
    // We now need to parse the final mood from the full response.
    const moodLine = fullResponse.split('\n').find(line => line.startsWith("Final Mood:"));
    
    if (moodLine) {
      const mood = moodLine.split(":")[1].trim().toLowerCase();
      return mood;
    } else {
      // Fallback in case the model doesn't follow the format perfectly
      return "neutral";
    }

  } catch (error) {
    console.error("Error detecting mood:", error);
    return "neutral";
  }
}