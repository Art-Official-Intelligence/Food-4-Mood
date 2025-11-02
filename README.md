# Food 4 Mood

Food 4 Mood is a modern web application that acts as an AI nutrition and mood assistant. It generates personalized meal recommendations based on your user profile and current mood, presented in an elegant, calm interface inspired by the Apple Health app.

## Features

- **Personalized Onboarding**: Sets up a detailed user profile including dietary preferences, allergies, and health goals.
- **Mood-Based Recommendations**: Uses the Google Gemini API to generate a full day's meal plan (drink, main course, snack, light dish) tailored to your emotional state.
- **Interactive UI**: A sleek, mobile-first design with a professional dark mode, animated progress rings for goals, and a native-like bottom tab navigation.
- **Favorites & Goals**: Save your favorite meals for later and track your progress towards daily nutritional targets for calories, protein, and water intake.
- **Secure & Scalable**: Uses a serverless function to handle API requests, ensuring your API key is never exposed on the client-side.

## Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS for a utility-first design system.
- **AI**: Google Gemini API for meal generation.
- **Deployment**: Vercel

---

## Deploying to Vercel

You can deploy your own instance of Food 4 Mood to Vercel in a few simple steps.

### Prerequisites

1.  **Node.js**: Ensure you have Node.js installed on your local machine.
2.  **Vercel Account**: Sign up for a free account at [vercel.com](https://vercel.com).
3.  **Google Gemini API Key**: Get an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Deployment Steps

1.  **Fork the Repository**
    Click the "Fork" button at the top-right of this page to create your own copy of this project.

2.  **Create a New Vercel Project**
    - Go to your Vercel Dashboard and click "Add New... > Project".
    - Import the repository you just forked from your Git provider (e.g., GitHub).

3.  **Configure Environment Variables**
    - In the "Configure Project" screen, expand the "Environment Variables" section.
    - Add a new variable:
      - **Name**: `API_KEY`
      - **Value**: Paste your Google Gemini API Key here.
    - Vercel will automatically detect the framework and build settings.

4.  **Deploy**
    - Click the "Deploy" button.
    - Vercel will build and deploy your application. Once complete, you will be provided with a live URL for your project.

Your Food 4 Mood app is now live!
