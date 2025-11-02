import React, { useState, useEffect } from 'react';
import { UserProfile, NutritionalGoals } from '../../types';
import { calculateRecommendedGoals } from '../../services/nutritionService';
import EditGoalsModal from '../EditGoalsModal';
import CircularProgress from '../ui/CircularProgress';
import { PencilIcon } from '../icons/PencilIcon';

interface GoalsPageProps {
  userProfile: UserProfile;
}

const GoalsPage: React.FC<GoalsPageProps> = ({ userProfile }) => {
  const [goals, setGoals] = useState<NutritionalGoals | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    try {
      const savedGoals = localStorage.getItem('nutritionalGoals');
      if (savedGoals) {
        setGoals(JSON.parse(savedGoals));
      } else {
        const recommendedGoals = calculateRecommendedGoals(userProfile);
        setGoals(recommendedGoals);
        localStorage.setItem('nutritionalGoals', JSON.stringify(recommendedGoals));
      }
    } catch (error) {
      console.error("Failed to load or calculate goals:", error);
      const recommendedGoals = calculateRecommendedGoals(userProfile);
      setGoals(recommendedGoals);
    }
  }, [userProfile]);

  const handleSaveGoals = (newGoals: NutritionalGoals) => {
    setGoals(newGoals);
    localStorage.setItem('nutritionalGoals', JSON.stringify(newGoals));
  };
  
  const handleRecalculateGoals = () => {
      const recommendedGoals = calculateRecommendedGoals(userProfile);
      setGoals(recommendedGoals);
      localStorage.setItem('nutritionalGoals', JSON.stringify(recommendedGoals));
  }

  if (!goals) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-blue"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-light-textPrimary dark:text-dark-textPrimary">Your Goals</h1>
        <p className="text-light-subtitle dark:text-dark-subtitle mt-2 max-w-[80%] mx-auto">
          Track your daily nutritional targets. Customize them anytime by tapping the pencil icon.
        </p>
      </header>

      <div className="bg-light-card dark:bg-dark-card p-6 rounded-2xl shadow-lg relative">
        <button 
            onClick={() => setIsEditing(true)}
            className="absolute top-4 right-4 p-2 bg-gray-200/50 dark:bg-gray-700/50 rounded-full text-light-textSecondary dark:text-dark-textSecondary hover:bg-gray-300 dark:hover:bg-gray-600"
            aria-label="Edit goals"
        >
            <PencilIcon className="w-5 h-5" />
        </button>
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-8">
            <CircularProgress value={goals.calories} max={goals.calories} label="Calories" unit="kcal" color="text-accent-orange" />
            <CircularProgress value={goals.protein} max={goals.protein} label="Protein" unit="g" color="text-accent-green" />
            <CircularProgress value={goals.water} max={goals.water} label="Water" unit="ml" color="text-accent-mint" />
        </div>
      </div>
      
      <div className="text-center mt-6">
          <button 
            onClick={handleRecalculateGoals}
            className="text-sm text-accent-blue hover:underline"
          >
            Reset to recommended goals based on my profile
          </button>
      </div>

      {isEditing && (
        <EditGoalsModal
          initialGoals={goals}
          onClose={() => setIsEditing(false)}
          onSave={handleSaveGoals}
        />
      )}
    </div>
  );
};

export default GoalsPage;
