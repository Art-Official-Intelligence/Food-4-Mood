import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';
import { UserProfile, Mood } from '../src/types';

// This is the serverless function that will be deployed by Vercel.

// Define the schema for the Gemini API call, same as before.
const mealSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: 'Name of the meal.' },
    description: { type: Type.STRING, description: 'A short, enticing description of the meal.' },
    estimated_calories: { type: Type.NUMBER, description: 'Estimated calories for one serving.' },
    protein_grams: { type: Type.NUMBER, description: 'Grams of protein.' },
    carbs_grams: { type: Type.NUMBER, description: 'Grams of carbohydrates.' },
    fats_grams: { type: Type.NUMBER, description: 'Grams of fat.' },
    recipe: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'Step-by-step cooking instructions.' },
    ingredients: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'List of ingredients with quantities.' },
    cuisine_type: { type: Type.STRING, description: 'e.g., Italian, Mexican, Indian.' },
    health_focus: { type: Type.STRING, description: 'e.g., low-carb, high-protein, mood-boosting.' },
  },
  required: ['name', 'description', 'estimated_calories', 'protein_grams', 'carbs_grams', 'fats_grams', 'recipe', 'ingredients', 'cuisine_type', 'health_focus']
};

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        mood_summary: { type: Type.STRING, description: 'A short, warm, and calm summary of the user\'s mood and how the food choices relate to it.' },
        recommendations: {
            type: Type.OBJECT,
            properties: {
                drink: mealSchema,
                main_course: mealSchema,
                snack: mealSchema,
                light_dish: mealSchema
            },
            required: ['drink', 'main_course', 'snack', 'light_dish']
        }
    },
    required: ['mood_summary', 'recommendations']
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Securely get the API key from server-side environment variables.
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'The application is not configured correctly. Missing API Key.' });
  }

  try {
    const { profile, mood }: { profile: UserProfile, mood: Mood } = req.body;

    if (!profile || !mood) {
        return res.status(400).json({ error: 'Missing profile or mood data in request.' });
    }

    const ai = new GoogleGenAI({ apiKey });

    const moodValue = mood.feeling;
    let moodCategory;
    if (moodValue < 33) moodCategory = 'negative';
    else if (moodValue < 66) moodCategory = 'neutral';
    else moodCategory = 'positive';
    
    const prompt = `
        You are Food 4 Mood, an AI nutrition and mood assistant with an elegant, calm, and premium tone, like the Apple Health app.
        
        User Profile:
        - Name: ${profile.name}
        - Age: ${profile.age}
        - Gender: ${profile.gender}
        - Height: ${profile.height} cm
        - Weight: ${profile.weight} kg
        - Target Weight: ${profile.targetWeight} kg
        - Food Preference: ${profile.foodPreference}
        - Allergies: ${profile.allergies || 'None'}
        - Region: ${profile.region} (suggest locally relevant ingredients where possible)

        User's Current Mood:
        - Feeling Category: ${moodCategory}
        - Description: "${mood.descriptor}"

        Goal:
        Generate a personalized, balanced, and mood-appropriate meal plan for one day. The plan must include one drink, one main course, one snack, and one light dish. 
        Each recommendation must be tailored to the user's profile, preferences, allergies, and current mood. For example, if the user is stressed, suggest calming foods like chamomile tea. If they are tired, suggest energizing foods like a protein-rich snack. Adhere strictly to the user's food preference (e.g., no meat for vegetarians).

        Output MUST be a single, valid JSON object that strictly adheres to the provided schema. Do not include any text, markdown, or explanations outside of the JSON object.
    `;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: responseSchema,
        },
    });

    const responseText = response.text.trim();
    const jsonText = responseText.replace(/^```json/, '').replace(/```$/, '').trim();
    const data = JSON.parse(jsonText);

    res.status(200).json(data);

  } catch (error: any) {
    console.error("Error in serverless function:", error);
    res.status(500).json({ error: "Failed to get recommendations from the AI. " + error.message });
  }
}
