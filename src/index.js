import readlineSync from 'readline-sync';
import { detectMood } from './moodDetector.js';
// Import both functions from the recommender
import { recommendContent, generateDynamicMessage } from './contentRecommender.js';

async function main() {
  console.log("Welcome to AI MoodMate! How are you feeling today? (Type 'exit' to quit)");

  while (true) {
    const userInput = readlineSync.question("You: ");
    if (userInput.toLowerCase() === "exit" || userInput.toLowerCase() === "quit") {
      console.log("AI MoodMate: Goodbye! Take care.");
      break;
    }

    console.log("AI MoodMate: Hmm, let me see...");
    
    // Step 1: Detect the mood (no change here)
    const mood = await detectMood(userInput);
    
    // Step 2: Generate a dynamic message AND get a static recommendation
    const dynamicMessage = await generateDynamicMessage(mood);
    const staticRecommendation = recommendContent(mood);

    // Step 3: Display both responses
    console.log("\n--- Here's something for you ---");
    console.log(`Mood: ${mood.charAt(0).toUpperCase() + mood.slice(1)} 🎉`);
    console.log(`\n"${dynamicMessage}"\n`); // Display the unique, dynamic message
    console.log(`Suggestion: ${staticRecommendation.suggestion}`);
    console.log(`Type: ${staticRecommendation.content_type.charAt(0).toUpperCase() + staticRecommendation.content_type.slice(1)}`);
    console.log(`Source: ${staticRecommendation.source}`);
    console.log("--------------------------------\n");
  }
}

main();