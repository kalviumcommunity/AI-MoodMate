import readlineSync from 'readline-sync';
import { detectMood } from './moodDetector.js';

// Use an async function to allow for 'await'
async function main() {
  console.log("Welcome to AI MoodMate! How are you feeling today? (Type 'exit' to quit)");

  while (true) {
    const userInput = readlineSync.question("You: ");
    if (userInput.toLowerCase() === "exit" || userInput.toLowerCase() === "quit") {
      console.log("AI MoodMate: Goodbye! Take care.");
      break;
    }

    // --- AI Integration ---
    console.log("AI MoodMate: Hmm, let me think...");
    
    // 1. Detect Mood using the new function
    const mood = await detectMood(userInput);
    
    // 2. Respond with the detected mood
    console.log(`AI MoodMate thinks you're feeling: ${mood}`);
    console.log("(Content recommendations will be added in the next PR.)\n");
  }
}

main();