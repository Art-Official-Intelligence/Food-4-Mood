import React, { useState, useMemo } from 'react';
import { Mood } from '../types';
import { MOOD_DESCRIPTORS, MOOD_EMOJIS } from '../constants';

interface MoodSelectorProps {
  onSubmit: (mood: Mood) => void;
  isLoading: boolean;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ onSubmit, isLoading }) => {
  const [feeling, setFeeling] = useState(50);
  const [descriptor, setDescriptor] = useState<string | null>(null);

  const moodCategory = useMemo(() => {
    if (feeling < 33) return 'sad';
    if (feeling < 66) return 'neutral';
    return 'happy';
  }, [feeling]);

  const emojiIndex = Math.floor((feeling / 101) * MOOD_EMOJIS.length);
  const currentEmoji = MOOD_EMOJIS[emojiIndex];

  const handleDescriptorClick = (desc: string) => {
    setDescriptor(desc);
    onSubmit({ feeling, descriptor: desc });
  };
  
  return (
    <div className="bg-light-card dark:bg-dark-card p-6 md:p-8 rounded-2xl shadow-lg w-full">
      <h2 className="text-xl font-semibold text-center text-light-textPrimary dark:text-dark-textPrimary">How are you feeling today?</h2>
      
      <div className="my-8 text-center">
        <span className="text-7xl">{currentEmoji}</span>
      </div>

      <input 
        type="range"
        min="0"
        max="100"
        value={feeling}
        onChange={(e) => {
            setFeeling(parseInt(e.target.value, 10));
            setDescriptor(null); // Reset descriptor when slider moves
        }}
        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent-blue"
        disabled={isLoading}
      />
      <div className="flex justify-between text-xs text-light-textSecondary dark:text-dark-textSecondary mt-2 px-1">
        <span>😔</span>
        <span>😐</span>
        <span>😄</span>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-center text-light-textSecondary dark:text-dark-textSecondary mb-4">What best describes this?</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {MOOD_DESCRIPTORS[moodCategory].map(desc => (
            <button
              key={desc}
              onClick={() => handleDescriptorClick(desc)}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-accent-blue bg-accent-blue/10 rounded-full hover:bg-accent-blue/20 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-blue disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {desc}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodSelector;