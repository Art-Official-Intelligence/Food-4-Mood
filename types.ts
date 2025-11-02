export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export enum FoodPreference {
  Vegetarian = 'Vegetarian',
  NonVegetarian = 'Non-Vegetarian',
  Vegan = 'Vegan',
  Mixed = 'Mixed',
}

export interface UserProfile {
  name: string;
  age: number;
  gender: Gender;
  height: number; // in cm
  weight: number; // in kg
  targetWeight: number; // in kg
  foodPreference: FoodPreference;
  allergies: string; // comma-separated
  region: string;
}

export interface Mood {
  feeling: number; // 0-100 from slider
  descriptor: string;
}

export interface Meal {
  name: string;
  description: string;
  estimated_calories: number;
  protein_grams: number;
  carbs_grams: number;
  fats_grams: number;
  recipe: string[]; // array of steps
  ingredients: string[]; // array of ingredients
  cuisine_type: string;
  health_focus: string;
}

export interface Recommendations {
  drink: Meal;
  main_course: Meal;
  snack: Meal;
  light_dish: Meal;
}

export interface ApiResponse {
  mood_summary: string;
  recommendations: Recommendations;
}

export interface NutritionalGoals {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  water: number; // in ml
}