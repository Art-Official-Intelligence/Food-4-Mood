import { UserProfile, Mood, ApiResponse } from '../types';

export const generateMealRecommendations = async (profile: UserProfile, mood: Mood): Promise<ApiResponse> => {
    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ profile, mood }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            // Pass the server's error message to the client
            throw new Error(errorData.error || 'An unexpected error occurred on the server.');
        }

        const data = await response.json();
        
        if (!data.mood_summary || !data.recommendations) {
            throw new Error("Invalid response structure from server.");
        }
        
        return data as ApiResponse;
    } catch (error: any) {
        console.error("Error generating meal recommendations:", error);
        // Re-throw the error so the UI component can catch it and display it
        throw error;
    }
};