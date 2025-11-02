import React, { useState, useEffect } from 'react';
import { NutritionalGoals } from '../../types';

interface EditGoalsModalProps {
  initialGoals: NutritionalGoals;
  onClose: () => void;
  onSave: (newGoals: NutritionalGoals) => void;
}

const EditGoalsModal: React.FC<EditGoalsModalProps> = ({ initialGoals, onClose, onSave }) => {
  const [goals, setGoals] = useState<NutritionalGoals>(initialGoals);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGoals(prev => ({ ...prev, [name]: parseInt(value, 10) || 0 }));
  };
  
  const handleSave = () => {
      onSave(goals);
      onClose();
  }

  const InputField: React.FC<{label: string, name: keyof NutritionalGoals, value: number, unit: string}> = ({label, name, value, unit}) => (
      <div>
        <label htmlFor={name} className="block text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary">{label}</label>
        <div className="mt-1 relative rounded-md shadow-sm">
             <input type="number" name={name} id={name} value={value} onChange={handleChange} className="block w-full px-3 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-md focus:ring-accent-blue focus:border-accent-blue sm:text-sm" />
             <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">{unit}</span>
             </div>
        </div>
      </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 animate-fade-in-up" style={{ animationDuration: '0.3s' }} onClick={onClose}>
      <div className="bg-light-card dark:bg-dark-card rounded-2xl shadow-2xl w-full max-w-md m-4" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-light-textPrimary dark:text-dark-textPrimary">Set Custom Goals</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl leading-none">&times;</button>
          </div>
          <p className="text-light-textSecondary dark:text-dark-textSecondary mt-1 mb-6">Set your own daily nutritional targets.</p>
          <div className="space-y-4">
            <InputField label="Calories" name="calories" value={goals.calories} unit="kcal" />
            <InputField label="Protein" name="protein" value={goals.protein} unit="g" />
            <InputField label="Water Intake" name="water" value={goals.water} unit="ml" />
          </div>
        </div>
        <div className="bg-light-background dark:bg-dark-background px-6 py-4 flex justify-end space-x-3 rounded-b-2xl border-t border-light-border dark:border-dark-border">
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-light-textPrimary dark:text-dark-textPrimary bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-accent-blue rounded-md hover:bg-blue-700">Save Goals</button>
        </div>
      </div>
    </div>
  );
};

export default EditGoalsModal;
