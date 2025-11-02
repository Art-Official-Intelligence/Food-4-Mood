import React, { useState, useEffect } from 'react';
import { UserProfile, Mood, ApiResponse, Meal } from '../../types';
import { generateMealRecommendations } from '../../services/geminiService';
import MoodSelector from '../MoodSelector';
import MealCard from '../MealCard';
import ExpandedMealCard from '../ExpandedMealCard';
import { RefreshIcon } from '../icons/RefreshIcon';
import { DrinkIcon } from '../icons/DrinkIcon';
import { MainCourseIcon } from '../icons/MainCourseIcon';
import { SnackIcon } from '../icons/SnackIcon';
import { LightDishIcon } from '../icons/LightDishIcon';
import SkeletonCard from '../ui/SkeletonCard';

interface HomePageProps {
  userProfile: UserProfile;
  setNavBarVisible: (visible: boolean) => void;
}

const mealIcons = {
  drink: DrinkIcon,
  main_course: MainCourseIcon,
  snack: SnackIcon,
  light_dish: LightDishIcon,
};

const loadingMessages = [
    "Analyzing your mood...",
    "Crafting the perfect menu...",
    "Consulting with our AI chef...",
    "Balancing flavors and nutrients...",
    "Almost ready..."
];

const HomePage: React.FC<HomePageProps> = ({ userProfile, setNavBarVisible }) => {
  const [recommendations, setRecommendations] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedMeal, setExpandedMeal] = useState<Meal | null>(null);
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    let intervalId: number | undefined;
    if (isLoading) {
      let currentIndex = 0;
      setLoadingMessage(loadingMessages[0]); // Reset to first message on new load
      intervalId = window.setInterval(() => {
        currentIndex = (currentIndex + 1) % loadingMessages.length;
        setLoadingMessage(loadingMessages[currentIndex]);
      }, 3000);
    }
    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [isLoading]);

  const handleMoodSubmit = async (mood: Mood) => {
    setIsLoading(true);
    setError(null);
    setRecommendations(null); // Clear previous results
    try {
      const result = await generateMealRecommendations(userProfile, mood);
      setRecommendations(result);
    } catch (err: any) {
      // This ensures we always have a user-facing error message.
      const message = err.message || "An unexpected error occurred. Please try again.";
      
      // The service throws this specific message for malformed data from the AI
      if (message.includes("Invalid response structure")) {
        setError("No dishes found. Please try regenerating.");
      } else {
        setError(message);
      }
    } finally {
      // This block is guaranteed to run, resolving the infinite loader bug.
      setIsLoading(false);
    }
  };
  
  const handleRegenerate = () => {
      setRecommendations(null);
      setError(null);
  }
  
  const handleMealClick = (meal: Meal) => {
      setExpandedMeal(meal);
      setNavBarVisible(false);
  }
  
  const handleCloseExpanded = () => {
      setExpandedMeal(null);
      setNavBarVisible(true);
  }
  
  const renderLoadingSkeleton = () => (
    <div className="mt-8 text-center">
      <p className="text-lg text-light-subtitle dark:text-dark-subtitle mb-6 h-7">{loadingMessage}</p>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <SkeletonCard className="h-64" />
        </div>
        <div className="lg:col-span-4 space-y-6">
          <SkeletonCard className="h-40" />
          <SkeletonCard className="h-40" />
          <SkeletonCard className="h-40" />
        </div>
      </div>
    </div>
  );

  const renderRecommendations = () => {
    if (!recommendations) return null;

    const { drink, main_course, snack, light_dish } = recommendations.recommendations;
    
    return (
      <div className="mt-8">
        <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-light-textPrimary dark:text-dark-textPrimary">Your Daily Plan</h2>
            <p className="text-light-subtitle dark:text-dark-subtitle mt-1 max-w-xl mx-auto">{recommendations.mood_summary}</p>
            <button 
                onClick={handleRegenerate}
                className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-accent-blue bg-accent-blue/10 rounded-lg hover:bg-accent-blue/20"
            >
                <RefreshIcon className="w-4 h-4 mr-2" />
                New Plan
            </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
             <MealCard meal={main_course} mealType="Main Course" onClick={() => handleMealClick(main_course)} Icon={mealIcons.main_course} isFeatured />
          </div>
          <div className="lg:col-span-4 space-y-6">
             <MealCard meal={drink} mealType="Drink" onClick={() => handleMealClick(drink)} Icon={mealIcons.drink} />
             <MealCard meal={snack} mealType="Snack" onClick={() => handleMealClick(snack)} Icon={mealIcons.snack} />
             <MealCard meal={light_dish} mealType="Light Dish" onClick={() => handleMealClick(light_dish)} Icon={mealIcons.light_dish} />
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-light-textPrimary dark:text-dark-textPrimary">Hello, {userProfile.name}</h1>
      </header>
      
      <div className="max-w-2xl mx-auto">
        
        {error && (
            <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg relative text-center mb-4" role="alert">
                <strong className="font-bold">Oops! </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        )}

        {!recommendations && !isLoading && !error && <MoodSelector onSubmit={handleMoodSubmit} isLoading={isLoading} />}
      </div>
      
      {isLoading ? renderLoadingSkeleton() : renderRecommendations()}

      {expandedMeal && <ExpandedMealCard meal={expandedMeal} onClose={handleCloseExpanded} />}
    </div>
  );
};

export default HomePage;