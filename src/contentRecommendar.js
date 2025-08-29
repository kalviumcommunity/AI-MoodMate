import fs from 'fs';
import path from 'path';
import OpenAI from 'openai'; // <-- IMPORT OPENAI
import { OPENAI_API_KEY } from './config.js'; // <-- IMPORT API KEY

// Initialize OpenAI client for this module
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// --- This function remains the same ---
const datasetPath = path.join(process.cwd(), 'data', 'content_dataset.json');
const dataset = JSON.parse(fs.readFileSync(datasetPath, 'utf-8'));

export function recommendContent(mood) {
  // ... (no changes to this function's code)
  if (!dataset[mood]) {
    return {
      mood: "neutral",
      suggestion: "I'm not sure how to respond to that, but I hope you have a great day!",
      content_type: "text",
      source: "AI MoodMate"
    };
  }

  const contentTypes = Object.keys(dataset[mood]);
  const randomContentType = contentTypes[Math.floor(Math.random() * contentTypes.length)];
  
  const contentItems = dataset[mood][randomContentType];
  const randomContentItem = contentItems[Math.floor(Math.random() * contentItems.length)];

  let suggestion = "";
  let source = "";

  switch (randomContentType) {
    case "quotes":
      suggestion = `Here’s a quote for you: '${randomContentItem.text}'`;
      source = randomContentItem.source;
      break;
    case "songs":
      suggestion = `How about listening to '${randomContentItem.title}' by ${randomContentItem.artist}?`;
      source = "Music Database";
      break;
    case "movies":
      suggestion = `You might enjoy watching '${randomContentItem.title}' (${randomContentItem.genre}).`;
      source = "Movie Database";
      break;
    case "activities":
      suggestion = `Maybe you could try this: ${randomContentItem.name}. ${randomContentItem.description}`;
      source = "Activity Database";
      break;
  }

  return {
    mood: mood,
    suggestion: suggestion,
    content_type: randomContentType,
    source: source
  };
}

// --- NEW DYNAMIC FUNCTION ---
/**
 * Generates a personalized, supportive message using a dynamic prompt.
 * @param {string} mood - The user's detected mood.
 * @returns {Promise<string>} A unique, AI-generated message.
 */
export async function generateDynamicMessage(mood) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are AI MoodMate, a friendly and supportive companion. Write a short, single-sentence, encouraging message for the user."
        },
        {
          role: "user",
          // This is the DYNAMIC part of the prompt.
          // The content changes based on the 'mood' variable.
          content: `The user is feeling ${mood}. What's a nice thing to say to them?`
        }
      ],
      temperature: 0.8, // Higher temperature for more creative and varied responses
      max_tokens: 60
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating dynamic message:", error);
    return "Remember to be kind to yourself today."; // Fallback message
  }
}