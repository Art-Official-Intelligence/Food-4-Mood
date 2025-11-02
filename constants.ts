import { Gender, FoodPreference } from './types';

export const GENDERS: Gender[] = [Gender.Male, Gender.Female, Gender.Other];

export const FOOD_PREFERENCES: FoodPreference[] = [
  FoodPreference.Vegetarian,
  FoodPreference.NonVegetarian,
  FoodPreference.Vegan,
  FoodPreference.Mixed,
];

export const MOOD_DESCRIPTORS: { [key: string]: string[] } = {
  sad: ["Tired", "Sad", "Lonely", "Bored", "Stressed", "Anxious", "Overwhelmed", "Grumpy"],
  neutral: ["Calm", "Neutral", "Focused", "Content", "Relaxed", "Thoughtful", "Peaceful", "Indifferent"],
  happy: ["Happy", "Energetic", "Motivated", "Excited", "Joyful", "Proud", "Creative", "Playful"],
};

export const MOOD_EMOJIS = ['😔', '😟', '🙁', '😐', '🙂', '😊', '😄'];