import dotenv from 'dotenv';

// Load environment variables from the .env file in the root directory
dotenv.config();

// Export the API key
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;