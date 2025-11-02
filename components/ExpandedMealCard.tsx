import React, { useState, useEffect } from 'react';
import { Meal } from '../types';
import { isFavorited, addFavorite, removeFavorite } from '../services/favoritesService';
import { shareMeal } from '../services/shareService';
import { HeartIcon } from './icons/HeartIcon';
import { ShareIcon } from './icons/ShareIcon';
import { CheckIcon } from './icons/CheckIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface ExpandedMealCardProps {
  meal: Meal;
  onClose: () => void;
}

const ExpandedMealCard: React.FC<ExpandedMealCardProps> = ({ meal, onClose }) => {
  const [favorited, setFavorited] = useState(false);
  const [shareState, setShareState] = useState<'idle' | 'loading' | 'copied'>('idle');

  useEffect(() => {
    setFavorited(isFavorited(meal.name));
    // Add overflow hidden to body when modal is open
    document.body.style.overflow = 'hidden';
    
    // Cleanup function to restore overflow
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [meal]);

  const handleToggleFavorite = () => {
    if (favorited) {
      removeFavorite(meal.name);
      setFavorited(false);
    } else {
      addFavorite(meal);
      setFavorited(true);
    }
  };

  const handleShare = async () => {
    setShareState('loading');
    const result = await shareMeal(meal);
    if (result.method === 'copy' && result.success) {
      setShareState('copied');
      setTimeout(() => setShareState('idle'), 2000);
    } else {
      setShareState('idle');
    }
  };

  const Nutrient: React.FC<{ label: string; value: number; unit: string }> = ({ label, value, unit }) => (
    <div className="text-center bg-light-background dark:bg-dark-background p-3 rounded-lg">
      <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">{label}</p>
      <p className="font-semibold text-lg text-light-textPrimary dark:text-dark-textPrimary">
        {value}<span className="text-sm font-normal">{unit}</span>
      </p>
    </div>
  );

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-light-card dark:bg-dark-card rounded-2xl shadow-2xl w-full max-w-2xl m-4 max-h-[90vh] overflow-y-auto animate-fade-in-up-scale"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-light-textPrimary dark:text-dark-textPrimary">{meal.name}</h2>
              <p className="text-md text-light-textSecondary dark:text-dark-textSecondary mt-1">{meal.cuisine_type} &bull; {meal.health_focus}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-3xl leading-none">&times;</button>
          </div>
          <p className="mt-4 text-light-textSecondary dark:text-dark-textSecondary">{meal.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
              <Nutrient label="Calories" value={meal.estimated_calories} unit=" kcal" />
              <Nutrient label="Protein" value={meal.protein_grams} unit=" g" />
              <Nutrient label="Carbs" value={meal.carbs_grams} unit=" g" />
              <Nutrient label="Fats" value={meal.fats_grams} unit=" g" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-light-textPrimary dark:text-dark-textPrimary">Ingredients</h3>
              <ul className="space-y-2 list-disc list-inside text-light-textSecondary dark:text-dark-textSecondary">
                {meal.ingredients.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-light-textPrimary dark:text-dark-textPrimary">Recipe</h3>
              <ol className="space-y-3 list-decimal list-inside text-light-textSecondary dark:text-dark-textSecondary">
                {meal.recipe.map((step, index) => <li key={index}>{step}</li>)}
              </ol>
            </div>
          </div>
        </div>
        <div className="bg-light-background dark:bg-dark-background px-6 py-4 flex justify-end space-x-3 rounded-b-2xl border-t border-light-border dark:border-dark-border">
            <button 
              onClick={handleToggleFavorite}
              className="p-2.5 text-sm font-medium text-light-textPrimary dark:text-dark-textPrimary bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center"
              aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
            >
              <HeartIcon className={`w-5 h-5 ${favorited ? 'text-red-500' : ''}`} isFilled={favorited} />
            </button>
            <button 
              onClick={handleShare}
              disabled={shareState === 'loading'}
              className="px-4 py-2 text-sm font-medium text-white bg-accent-blue rounded-md hover:bg-blue-700 flex items-center min-w-[100px] justify-center disabled:opacity-70 disabled:cursor-wait"
            >
              {shareState === 'copied' ? (
                <>
                  <CheckIcon className="w-5 h-5 mr-2" /> Copied
                </>
              ) : shareState === 'loading' ? (
                <>
                  <SpinnerIcon className="w-5 h-5 mr-2" /> Sending...
                </>
              ) : (
                <>
                  <ShareIcon className="w-5 h-5 mr-2" /> Share
                </>
              )}
            </button>
        </div>
      </div>
    </div>
  );
};

export default ExpandedMealCard;