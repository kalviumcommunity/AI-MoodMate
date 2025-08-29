import fs from 'fs';
import path from 'path';

// Load the dataset once when the module is imported
const datasetPath = path.join(process.cwd(), 'data', 'content_dataset.json');
const dataset = JSON.parse(fs.readFileSync(datasetPath, 'utf-8'));

/**
 * This is our "tool". It takes a mood and returns a content recommendation.
 * @param {string} mood - The detected mood (e.g., 'happy', 'sad').
 * @returns {object} A recommendation object.
 */
export function recommendContent(mood) {
  console.log(`[Function Called] recommendContent with mood: ${mood}`);

  if (!dataset[mood]) {
    return {
      mood: "neutral",
      suggestion: "I couldn't find a specific recommendation, but I hope you have a great day!",
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