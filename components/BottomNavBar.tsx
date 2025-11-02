import React from 'react';
import { Tab } from '../App';
import { useTheme } from '../contexts/ThemeContext';
import { HomeIcon } from './icons/HomeIcon';
import { HeartIcon } from './icons/HeartIcon';
import { GoalsIcon } from './icons/GoalsIcon';
import { SettingsIcon } from './icons/SettingsIcon';

interface BottomNavBarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  // FIX: Added isVisible prop to fix TypeScript error in App.tsx.
  isVisible: boolean;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, setActiveTab, isVisible }) => {
  const { theme } = useTheme();

  const navItems = [
    { id: 'home', label: 'Home', Icon: HomeIcon },
    { id: 'favorites', label: 'Favorites', Icon: HeartIcon },
    { id: 'goals', label: 'Goals', Icon: GoalsIcon },
    { id: 'settings', label: 'Settings', Icon: SettingsIcon },
  ];
  
  const activeColor = theme === 'light' ? 'text-accent-blue' : 'text-accent-mint';

  return (
    <nav className={`fixed bottom-0 left-0 right-0 bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-lg border-t border-light-border dark:border-dark-border z-50 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="max-w-4xl mx-auto flex justify-around items-center h-20">
        {navItems.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id as Tab)}
              className={`flex flex-col items-center justify-center w-20 h-20 text-xs font-medium transition-colors ${
                isActive ? activeColor : 'text-light-textSecondary dark:text-dark-textSecondary hover:text-light-textPrimary dark:hover:text-dark-textPrimary'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="w-7 h-7 mb-1" isFilled={isActive} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavBar;
