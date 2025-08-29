import readlineSync from 'readline-sync';

function main() {
  console.log("Welcome to AI MoodMate! (Setup Successful)");
  console.log("The AI logic will be added in the next PR.");

  const userInput = readlineSync.question("Press Enter to exit.");
  console.log("Goodbye!");
}

main();