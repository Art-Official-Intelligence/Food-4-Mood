import React, { useState } from 'react';
import { Meal } from '../types';
import { shareMeal } from '../services/shareService';
import { ShareIcon } from './icons/ShareIcon';
import { CheckIcon } from './icons/CheckIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface MealCardProps {
  meal: Meal;
  mealType: string;
  onClick: () => void;
  Icon: React.FC<{ className?: string }>;
  isFeatured?: boolean;
}

const MealCard: React.FC<MealCardProps> = ({ meal, mealType, onClick, Icon, isFeatured = false }) => {
  const [shareState, setShareState] = useState<'idle' | 'loading' | 'copied'>('idle');

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the modal
    setShareState('loading');
    const result = await shareMeal(meal);
    if (result.method === 'copy' && result.success) {
      setShareState('copied');
      setTimeout(() => setShareState('idle'), 2000);
    } else {
      setShareState('idle');
    }
  };

  const cardClasses = `relative bg-light-card dark:bg-dark-card rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group overflow-hidden ${isFeatured ? 'h-full' : ''}`;
  const titleClasses = `font-bold text-light-textPrimary dark:text-dark-textPrimary mt-1 ${isFeatured ? 'text-2xl' : 'text-xl'}`;
  
  return (
    <div onClick={onClick} className={cardClasses}>
      <button 
        onClick={handleShare}
        disabled={shareState === 'loading'}
        className="absolute top-4 right-4 z-20 p-2 bg-gray-100/50 dark:bg-gray-800/50 rounded-full text-light-textSecondary dark:text-dark-textSecondary opacity-0 group-hover:opacity-100 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-light-textPrimary dark:hover:text-dark-textPrimary transition-all duration-200 disabled:opacity-70 disabled:cursor-wait"
        aria-label="Share meal"
      >
        {shareState === 'copied' ? (
          <CheckIcon className="w-5 h-5 text-accent-green" />
        ) : shareState === 'loading' ? (
          <SpinnerIcon className="w-5 h-5" />
        ) : (
          <ShareIcon className="w-5 h-5" />
        )}
      </button>

      <Icon className="absolute -right-4 -top-4 text-gray-100/70 dark:text-gray-100/10 w-28 h-28 transform group-hover:rotate-6 transition-transform duration-300" />
      <div className="relative z-10 flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-accent-blue capitalize">{mealType}</p>
          <h3 className={titleClasses}>{meal.name}</h3>
          <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mt-2">{meal.cuisine_type} &bull; {meal.health_focus}</p>
        </div>
        <div className="text-right flex-shrink-0 ml-4">
            <p className={`font-semibold text-light-textPrimary dark:text-dark-textPrimary ${isFeatured ? 'text-3xl' : 'text-2xl'}`}>{meal.estimated_calories}</p>
            <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">kcal</p>
        </div>
      </div>
       <p className="relative z-10 text-light-textSecondary dark:text-dark-textSecondary mt-4 text-sm leading-relaxed">{meal.description}</p>
    </div>
  );
};

export default MealCard;