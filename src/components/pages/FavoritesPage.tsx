import React, { useState, useEffect } from 'react';
import { Meal } from '../../types';
import { getFavorites } from '../../services/favoritesService';
import MealCard from '../MealCard';
import ExpandedMealCard from '../ExpandedMealCard';
import { HeartIcon } from '../icons/HeartIcon';
import { DrinkIcon } from '../icons/DrinkIcon';
import { MainCourseIcon } from '../icons/MainCourseIcon';
import { SnackIcon } from '../icons/SnackIcon';
import { LightDishIcon } from '../icons/LightDishIcon';

interface FavoritesPageProps {
  setNavBarVisible: (visible: boolean) => void;
}

const mealTypeIcons: { [key: string]: React.FC<{ className?: string }> } = {
  drink: DrinkIcon,
  main_course: MainCourseIcon,
  snack: SnackIcon,
  light_dish: LightDishIcon,
  default: MainCourseIcon,
};

const getMealType = (meal: Meal): string => {
    const name = meal.name.toLowerCase();
    const type = meal.cuisine_type.toLowerCase();
    if (type.includes('drink') || name.includes('tea') || name.includes('smoothie') || name.includes('juice') || name.includes('latte')) return 'drink';
    if (type.includes('salad') || type.includes('soup') || name.includes('salad') || name.includes('soup')) return 'light_dish';
    if (type.includes('snack') || name.includes('bar') || name.includes('bites') || name.includes('nuts')) return 'snack';
    return 'main_course';
};

const FavoritesPage: React.FC<FavoritesPageProps> = ({ setNavBarVisible }) => {
  const [favorites, setFavorites] = useState<Meal[]>([]);
  const [expandedMeal, setExpandedMeal] = useState<Meal | null>(null);

  // Re-fetch favorites when component mounts or when an expanded meal is closed
  // (in case the user unfavorited it).
  useEffect(() => {
    if (!expandedMeal) {
      setFavorites(getFavorites());
    }
  }, [expandedMeal]);

  const handleMealClick = (meal: Meal) => {
    setExpandedMeal(meal);
    setNavBarVisible(false);
  };

  const handleCloseExpanded = () => {
    setExpandedMeal(null);
    setNavBarVisible(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-light-textPrimary dark:text-dark-textPrimary">Favorites</h1>
        <p className="text-light-subtitle dark:text-dark-subtitle mt-2 max-w-[80%] mx-auto">Your saved meals for quick access.</p>
      </header>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((meal) => {
              const mealType = getMealType(meal);
              const Icon = mealTypeIcons[mealType] || mealTypeIcons.default;
              return (
                <MealCard
                    key={meal.name}
                    meal={meal}
                    mealType={mealType.replace('_', ' ')}
                    onClick={() => handleMealClick(meal)}
                    Icon={Icon}
                />
              );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-light-card dark:bg-dark-card rounded-2xl">
          <HeartIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto" />
          <h2 className="mt-4 text-xl font-semibold text-light-textPrimary dark:text-dark-textPrimary">No Favorites Yet</h2>
          <p className="mt-2 text-light-textSecondary dark:text-dark-textSecondary">
            Tap the heart icon on a meal to save it here.
          </p>
        </div>
      )}

      {expandedMeal && <ExpandedMealCard meal={expandedMeal} onClose={handleCloseExpanded} />}
    </div>
  );
};

export default FavoritesPage;
