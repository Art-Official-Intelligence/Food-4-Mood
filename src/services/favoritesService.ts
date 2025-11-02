import { Meal } from '../types';

const FAVORITES_KEY = 'favoritedMeals';

/**
 * Retrieves the list of favorite meals from local storage.
 * @returns {Meal[]} An array of meal objects.
 */
export const getFavorites = (): Meal[] => {
  try {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  } catch (error) {
    console.error("Failed to parse favorites from localStorage", error);
    // If parsing fails, clear the corrupted data
    localStorage.removeItem(FAVORITES_KEY);
    return [];
  }
};

/**
 * Checks if a meal is already in the favorites list.
 * @param {string} mealName - The name of the meal to check.
 * @returns {boolean} True if the meal is a favorite, false otherwise.
 */
export const isFavorited = (mealName: string): boolean => {
  const favorites = getFavorites();
  return favorites.some(fav => fav.name === mealName);
};

/**
 * Adds a meal to the favorites list.
 * @param {Meal} meal - The meal object to add.
 */
export const addFavorite = (meal: Meal): void => {
  if (isFavorited(meal.name)) return;
  const favorites = getFavorites();
  const updatedFavorites = [...favorites, meal];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
};

/**
 * Removes a meal from the favorites list by its name.
 * @param {string} mealName - The name of the meal to remove.
 */
export const removeFavorite = (mealName: string): void => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(fav => fav.name !== mealName);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
};
