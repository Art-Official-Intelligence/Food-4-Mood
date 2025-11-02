import { GoogleGenAI, Type } from '@google/genai';
import { UserProfile, Mood, ApiResponse } from '../types';

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


export const generateMealRecommendations = async (profile: UserProfile, mood: Mood): Promise<ApiResponse> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: responseSchema,
            },
        });

        // FIX: The API might wrap the JSON in markdown backticks, so we strip them before parsing.
        const responseText = response.text.trim();
        const jsonText = responseText.replace(/^```json/, '').replace(/```$/, '').trim();
        const data = JSON.parse(jsonText);
        
        if (!data.mood_summary || !data.recommendations) {
            throw new Error("Invalid response structure from API.");
        }
        
        return data as ApiResponse;
    } catch (error) {
        console.error("Error generating meal recommendations:", error);
        throw new Error("Failed to get recommendations. The AI might be busy or the request could not be processed. Please try again.");
    }
};