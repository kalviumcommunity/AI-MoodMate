import readlineSync from 'readline-sync';
import OpenAI from 'openai';
import { OPENAI_API_KEY } from './config.js';
import { recommendContent } from './contentRecommender.js';

// Initialize the OpenAI client
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// 1. Define the "tools" our AI can use
const tools = [
  {
    type: "function",
    function: {
      name: "recommendContent",
      description: "Get a content recommendation (quote, song, movie, or activity) based on the user's mood.",
      parameters: {
        type: "object",
        properties: {
          mood: {
            type: "string",
            description: "The user's mood, e.g., happy, sad, stressed.",
            enum: ["happy", "sad", "stressed", "angry", "excited"],
          },
        },
        required: ["mood"],
      },
    },
  },
];

async function main() {
  console.log("Welcome to AI MoodMate! How are you feeling today? (Type 'exit' to quit)");

  while (true) {
    const userInput = readlineSync.question("You: ");
    if (userInput.toLowerCase() === "exit") break;

    try {
      // 2. Send the user's message and the available tools to the AI
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userInput }],
        tools: tools,
        tool_choice: "auto", // Let the model decide whether to use a tool
      });

      const responseMessage = response.choices[0].message;

      // 3. Check if the AI wants to call a function
      if (responseMessage.tool_calls) {
        const toolCall = responseMessage.tool_calls[0];
        const functionName = toolCall.function.name;
        
        if (functionName === "recommendContent") {
          // 4. Parse the arguments and call our actual JavaScript function
          const args = JSON.parse(toolCall.function.arguments);
          const mood = args.mood;
          const recommendation = recommendContent(mood);

          // 5. Display the result from our function
          console.log("\n--- Here's something for you ---");
          console.log(`Mood: ${recommendation.mood.charAt(0).toUpperCase() + recommendation.mood.slice(1)} 🎉`);
          console.log(`Suggestion: ${recommendation.suggestion}`);
          console.log(`Type: ${recommendation.content_type.charAt(0).toUpperCase() + recommendation.content_type.slice(1)}`);
          console.log(`Source: ${recommendation.source}`);
          console.log("--------------------------------\n");
        }
      } else {
        // The AI responded with a regular text message
        console.log(`AI MoodMate: ${responseMessage.content}\n`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  console.log("AI MoodMate: Goodbye! Take care.");
}

main();