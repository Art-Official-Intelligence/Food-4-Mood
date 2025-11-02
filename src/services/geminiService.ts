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
            let errorMessage = `Server Error: ${response.status} ${response.statusText}`;
            // Attempt to get a more specific error message from the JSON body
            try {
                const errorData = await response.json();
                if (errorData.error) {
                    errorMessage = errorData.error;
                }
            } catch (jsonError) {
                // Body was not JSON or failed to parse, the original statusText is the best we have.
                console.log("Could not parse error response as JSON.");
            }
            throw new Error(errorMessage);
        }

        const data = await response.json();
        
        // Stronger validation to ensure the response has the expected structure
        if (!data || !data.mood_summary || !data.recommendations || !data.recommendations.main_course) {
            // This specific error message is caught by the UI to show a user-friendly prompt
            throw new Error("Invalid response structure from server.");
        }
        
        return data as ApiResponse;
    } catch (error: any) {
        console.error("API Service Error:", error.message);
        // Re-throw the original error to be handled by the component
        throw error;
    }
};