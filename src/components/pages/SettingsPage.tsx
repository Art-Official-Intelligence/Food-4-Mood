import React from 'react';
import { UserProfile } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import { UserIcon } from '../icons/UserIcon';

interface SettingsPageProps {
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void; // Placeholder for future edit functionality
  onResetProfile: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ userProfile, onResetProfile }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-light-textPrimary dark:text-dark-textPrimary">Settings</h1>
        <p className="text-light-subtitle dark:text-dark-subtitle mt-2 max-w-[80%] mx-auto">Manage your profile and app preferences.</p>
      </header>
      
      <div className="space-y-8 max-w-2xl mx-auto">
        {/* Profile Section */}
        <div className="bg-light-card dark:bg-dark-card p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-light-textPrimary dark:text-dark-textPrimary mb-4 flex items-center">
            <UserIcon className="w-6 h-6 mr-3 text-accent-blue" />
            Your Profile
          </h2>
          <div className="space-y-2 text-light-textSecondary dark:text-dark-textSecondary">
              <p><strong>Name:</strong> {userProfile.name}</p>
              <p><strong>Age:</strong> {userProfile.age}</p>
              <p><strong>Gender:</strong> {userProfile.gender}</p>
              <p><strong>Region:</strong> {userProfile.region}</p>
              <p><strong>Weight:</strong> {userProfile.weight}kg (Target: {userProfile.targetWeight}kg)</p>
              <p><strong>Preferences:</strong> {userProfile.foodPreference}</p>
              <p><strong>Allergies:</strong> {userProfile.allergies || 'None'}</p>
          </div>
           <button 
              onClick={() => alert("Profile editing is coming soon! For now, please reset your profile on this page to make changes.")}
              className="mt-4 px-4 py-2 text-sm font-medium text-white bg-accent-blue rounded-md hover:bg-blue-700"
            >
              Edit Profile
            </button>
        </div>

        {/* Appearance Section */}
        <div className="bg-light-card dark:bg-dark-card p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-light-textPrimary dark:text-dark-textPrimary mb-4">Appearance</h2>
            <div className="flex justify-between items-center">
                <span className="text-light-textSecondary dark:text-dark-textSecondary">Theme</span>
                <button onClick={toggleTheme} className="px-4 py-2 text-sm font-medium rounded-md bg-light-background dark:bg-dark-background">
                    {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                </button>
            </div>
        </div>

        {/* Data Management Section */}
        <div className="bg-light-card dark:bg-dark-card p-6 rounded-2xl shadow-lg border border-red-500/20">
            <h2 className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-4">Data Management</h2>
            <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-4">
                This will erase all your profile data, favorites, and custom goals. This action cannot be undone.
            </p>
            <div className="text-center">
                <button
                    onClick={() => {
                        if (window.confirm('Are you sure you want to reset all your data? This will return you to the onboarding screen.')) {
                            onResetProfile();
                        }
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-accent-red rounded-md hover:bg-red-700"
                >
                    Reset Profile & Data
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
