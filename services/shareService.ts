import { Meal } from '../types';

/**
 * Formats meal details into a user-friendly string for sharing.
 */
const formatMealForSharing = (meal: Meal): string => {
  const ingredientsList = meal.ingredients.map(i => `- ${i}`).join('\n');
  const recipeList = meal.recipe.map((step, index) => `${index + 1}. ${step}`).join('\n');

  return `
 meal: ${meal.name} 

 ${meal.description}

 Ingredients 
${ingredientsList}

 Recipe 
${recipeList}

Shared from Food 4 Mood!
  `.trim();
};

/**
 * Shares a meal using the Web Share API or copies it to the clipboard as a fallback.
 * @param {Meal} meal The meal to share.
 * @returns {Promise<{method: 'share' | 'copy', success: boolean}>} The method used and success status.
 */
export const shareMeal = async (meal: Meal): Promise<{method: 'share' | 'copy', success: boolean}> => {
  const formattedText = formatMealForSharing(meal);
  
  if (navigator.share) {
    try {
      await navigator.share({
        title: meal.name,
        text: formattedText,
      });
      return { method: 'share', success: true };
    } catch (error) {
      console.error('Error using Web Share API:', error);
      // User might have cancelled the share, which is not a true "error"
      // We'll return false to indicate the action wasn't completed.
      return { method: 'share', success: false };
    }
  } else {
    try {
      await navigator.clipboard.writeText(formattedText);
      return { method: 'copy', success: true };
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return { method: 'copy', success: false };
    }
  }
};
