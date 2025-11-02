import { UserProfile, Gender, NutritionalGoals } from '../types';

// Calculates BMR using the Mifflin-St Jeor equation
const calculateBMR = (profile: UserProfile): number => {
  const { weight, height, age, gender } = profile;
  if (gender === Gender.Male) {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  }
  if (gender === Gender.Female) {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
  // For 'Other', average the male and female formulas
  const maleBMR = 10 * weight + 6.25 * height - 5 * age + 5;
  const femaleBMR = 10 * weight + 6.25 * height - 5 * age - 161;
  return (maleBMR + femaleBMR) / 2;
};

export const calculateRecommendedGoals = (profile: UserProfile): NutritionalGoals => {
  const bmr = calculateBMR(profile);
  // Assuming a sedentary to light activity level (x1.375)
  const activityMultiplier = 1.375;
  let maintenanceCalories = bmr * activityMultiplier;

  // Adjust calories for weight goal
  const weightDifference = profile.targetWeight - profile.weight;
  // Adjust by 300 calories for a moderate gain/loss goal.
  const calorieAdjustment = weightDifference > 0 ? 300 : weightDifference < 0 ? -300 : 0;
  
  const targetCalories = Math.round((maintenanceCalories + calorieAdjustment) / 10) * 10;

  // Calculate macros based on a 40% carbs, 30% protein, 30% fat split
  // 1g protein = 4 kcal, 1g carbs = 4 kcal, 1g fat = 9 kcal
  const proteinGrams = Math.round((targetCalories * 0.30) / 4);
  const carbsGrams = Math.round((targetCalories * 0.40) / 4);
  const fatsGrams = Math.round((targetCalories * 0.30) / 9);

  return {
    calories: targetCalories,
    protein: proteinGrams,
    carbs: carbsGrams,
    fats: fatsGrams,
    water: 2500, // Default water goal in ml
  };
};