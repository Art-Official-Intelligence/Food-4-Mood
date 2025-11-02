import React, { useState, useEffect } from 'react';
import { UserProfile } from './types';
import Onboarding from './components/Onboarding';
import HomePage from './components/pages/HomePage';
import FavoritesPage from './components/pages/FavoritesPage';
import GoalsPage from './components/pages/GoalsPage';
import SettingsPage from './components/pages/SettingsPage';
import BottomNavBar from './components/BottomNavBar';
import { ThemeProvider } from './contexts/ThemeContext';

export type Tab = 'home' | 'favorites' | 'goals' | 'settings';

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isNavBarVisible, setIsNavBarVisible] = useState(true);

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    } catch (error) {
      console.error("Failed to parse user profile from localStorage", error);
      localStorage.removeItem('userProfile');
    } finally {
      setLoadingProfile(false);
    }
  }, []);

  const handleOnboardingComplete = (userProfile: UserProfile) => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    setProfile(userProfile);
  };
  
  const handleProfileUpdate = (updatedProfile: UserProfile) => {
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    setProfile(updatedProfile);
  };
  
  const handleResetProfile = () => {
    localStorage.clear();
    setProfile(null);
    setActiveTab('home');
  }

  const renderContent = () => {
    if (loadingProfile) {
      return <div className="min-h-screen flex justify-center items-center bg-light-background dark:bg-dark-background">Loading...</div>;
    }

    if (!profile) {
      return <Onboarding onComplete={handleOnboardingComplete} />;
    }

    switch (activeTab) {
      case 'home':
        return <HomePage userProfile={profile} setNavBarVisible={setIsNavBarVisible} />;
      case 'favorites':
        return <FavoritesPage setNavBarVisible={setIsNavBarVisible} />;
      case 'goals':
        return <GoalsPage userProfile={profile} />;
      case 'settings':
        return <SettingsPage userProfile={profile} onUpdateProfile={handleProfileUpdate} onResetProfile={handleResetProfile} />;
      default:
        return <HomePage userProfile={profile} setNavBarVisible={setIsNavBarVisible} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="bg-light-background dark:bg-dark-background min-h-screen text-light-textPrimary dark:text-dark-textPrimary">
        <main className="pb-24"> {/* Padding bottom to avoid overlap with nav bar */}
          {renderContent()}
        </main>
        {profile && !loadingProfile && <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} isVisible={isNavBarVisible} />}
      </div>
    </ThemeProvider>
  );
};

export default App;