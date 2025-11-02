import React from 'react';

// FIX: Removed duplicate component declarations to resolve "Cannot redeclare" error.
// Kept the better leaf icon.
export const LightDishIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.5.6.22 1.16.22 1.76 0C18.29 20.17 22 16.42 22 12A10 10 0 0 0 12 2z" />
        <path d="M12 12a5.001 5.001 0 0 1-5-5c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5z" />
    </svg>
);
