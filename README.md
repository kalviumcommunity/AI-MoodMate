# 🎭 AI MoodMate – Emotion-Based Content Recommender

AI MoodMate is a Generative AI-powered companion built with Node.js that understands a user’s mood from their text and provides personalized suggestions such as motivational quotes, songs, movies, and fun activities.

## 🔹 Project Overview

This project demonstrates core LLM concepts and their application in a real-world scenario. It is designed to be an emotion-aware AI companion that tailors responses based on the user's expressed mood, moving beyond generic chatbot interactions.

**Core Features:**
-   Detects emotions like happiness, stress, or sadness from user input.
-   Recommends personalized content such as quotes 📝, songs 🎵, movies 🎬, and activities 🎲.

## 🔹 Problem Statement

Most AI chatbots today provide generic, one-size-fits-all responses without considering the user’s emotional state. A stressed student needs calm and motivating advice, while a happy user may want celebratory songs. There is a clear gap for an emotion-aware AI companion that can provide truly personalized and empathetic interactions.

## 🔹 Solution

AI MoodMate solves this problem by creating a multi-step workflow that connects emotion to relevant content:

1.  **Detecting Mood:** It first classifies the user's emotion from their text input using a Large Language Model.
2.  **Storing Content:** It uses a structured JSON file (`content_dataset.json`) to store a curated list of content, each mapped to a specific mood.
3.  **Recommending Content:** It retrieves a random, mood-appropriate suggestion from the dataset.
4.  **Delivering Responses:** It provides the recommendation in a clear, structured format to the user.

## 🔹 System Workflow

The application follows a clear process to generate a response:

**User Input** → Example: *“I feel very stressed about exams.”*

**1. Prompting** → The `moodDetector` module sends the input to the LLM, which classifies the mood and returns `"stressed"`.

**2. Content Retrieval** → The `contentRecommender` module takes `"stressed"` as input, looks up the corresponding section in the `content_dataset.json` file, and randomly selects an item (e.g., a calming quote).

**3. AI Response** → The application formats the retrieved content into a user-friendly message and displays it.

## 🔹 Prompting Techniques

The system uses prompt engineering to accurately classify the user's emotion.

**System & User Prompt (RTFC Framework):**
-   **Role:** The AI is assigned the role of an "expert in emotion detection."
-   **Task:** It is given a clear task: "Classify the mood of the user's text."
-   **Format:** It is instructed to "Respond with only the single-word mood" to ensure clean, predictable output.
-   **Constraints:** The possible categories (happy, sad, stressed, etc.) are defined.

**Zero-shot Prompting:**
The model classifies the mood without being given any examples in the prompt. This is highly efficient for general classification tasks and relies on the model's pre-existing knowledge.

## 🔹 LLM Parameters

While the current code uses default settings for simplicity, the following LLM parameters are critical for fine-tuning AI behavior:

-   **Temperature:** Controls randomness. A low value (`0.2`) was chosen for mood classification to get predictable, factual results. A higher value (`0.8`) would be better for creative tasks.
-   **Top-P / Top-K:** Controls the diversity of responses by selecting from a pool of the most probable tokens.
-   **Stop Sequences:** Ensures the output is clean and concise by telling the model when to stop generating text (e.g., after outputting a single word).

## 🔹 Structured Output & Function Calling

A more advanced implementation would use **Structured Output** or **Function Calling**, where the LLM returns a JSON object that can be directly used by the program, reducing the risk of parsing errors:

```json
{
  "function": "fetch_content",
  "arguments": {"mood": "happy", "type": "song"}
}