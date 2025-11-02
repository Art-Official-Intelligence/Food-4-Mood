import React, { useState } from 'react';
import { UserProfile, Gender, FoodPreference } from '../../types';
import { GENDERS, FOOD_PREFERENCES } from '../../constants';
import Slider from './ui/Slider';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    name: '',
    age: 30,
    gender: Gender.Male,
    height: 175,
    weight: 70,
    targetWeight: 68,
    foodPreference: FoodPreference.Mixed,
    allergies: '',
    region: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: parseInt(value, 10) }));
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = () => {
    if (profile.name && profile.region) {
       onComplete(profile as UserProfile);
    } else {
        alert("Please fill in all fields.");
    }
  };
  
  const renderStepIndicator = () => (
    <div className="flex justify-center space-x-2 mb-8">
      {[1, 2, 3].map(s => (
        <div key={s} className={`w-3 h-3 rounded-full ${step === s ? 'bg-accent-blue' : 'bg-gray-300 dark:bg-dark-border'}`}></div>
      ))}
    </div>
  );

  const inputClasses = "mt-1 block w-full px-3 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-accent-blue focus:border-accent-blue sm:text-sm text-light-textPrimary dark:text-dark-textPrimary";
  const labelClasses = "block text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary";

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-light-card dark:bg-dark-card rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-light-textPrimary dark:text-dark-textPrimary mb-2">Welcome to Food 4 Mood</h1>
        <p className="text-center text-light-textSecondary dark:text-dark-textSecondary mb-8">Let's set up your profile.</p>
        
        {renderStepIndicator()}
        
        <div className="space-y-6">
          {step === 1 && (
            <>
              <div>
                <label htmlFor="name" className={labelClasses}>Name</label>
                <input type="text" name="name" id="name" value={profile.name} onChange={handleChange} className={inputClasses} placeholder="Your Name" />
              </div>
              <Slider label="Age" name="age" value={profile.age || 30} min={12} max={100} unit="years" onChange={handleSliderChange} />
              <div>
                <label htmlFor="gender" className={labelClasses}>Gender</label>
                <select name="gender" id="gender" value={profile.gender} onChange={handleChange} className={inputClasses}>
                  {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <Slider label="Height" name="height" value={profile.height || 175} min={120} max={220} unit="cm" onChange={handleSliderChange} />
              <Slider label="Weight" name="weight" value={profile.weight || 70} min={30} max={200} unit="kg" onChange={handleSliderChange} />
              <Slider label="Target Weight" name="targetWeight" value={profile.targetWeight || 68} min={30} max={200} unit="kg" onChange={handleSliderChange} />
            </>
          )}
          {step === 3 && (
            <>
              <div>
                <label htmlFor="foodPreference" className={labelClasses}>Food Preference</label>
                <select name="foodPreference" id="foodPreference" value={profile.foodPreference} onChange={handleChange} className={inputClasses}>
                  {FOOD_PREFERENCES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="allergies" className={labelClasses}>Allergies (optional)</label>
                <input type="text" name="allergies" id="allergies" value={profile.allergies} onChange={handleChange} className={inputClasses} placeholder="e.g., peanuts, shellfish" />
              </div>
              <div>
                <label htmlFor="region" className={labelClasses}>Region / Country</label>
                <input type="text" name="region" id="region" value={profile.region} onChange={handleChange} className={inputClasses} placeholder="e.g., USA, India, Japan" />
              </div>
            </>
          )}
        </div>
        
        <div className="flex justify-between mt-8">
          <button onClick={prevStep} disabled={step === 1} className="px-4 py-2 text-sm font-medium text-light-textPrimary dark:text-dark-textPrimary bg-gray-200 dark:bg-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">Back</button>
          {step < 3 ? (
            <button onClick={nextStep} className="px-4 py-2 text-sm font-medium text-white bg-accent-blue rounded-md hover:bg-blue-700">Next</button>
          ) : (
            <button onClick={handleSubmit} className="px-4 py-2 text-sm font-medium text-white bg-accent-green rounded-md hover:bg-green-700">Finish</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
