import React from 'react';

// FIX: Removed duplicate component declarations to resolve "Cannot redeclare" error.
// Kept the better apple icon.
export const SnackIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="13" r="7" />
        <path d="M12 6a4 4 0 0 1 4-4h.5a4.5 4.5 0 0 1 4.5 4.5V13a4 4 0 0 1-4 4h-1" />
        <path d="M12 6a4 4 0 0 0-4-4H7.5A4.5 4.5 0 0 0 3 6.5V13a4 4 0 0 0 4 4h1" />
        <path d="M12 6a2 2 0 0 1-2 2h4a2 2 0 0 1-2-2z" />
    </svg>
);
