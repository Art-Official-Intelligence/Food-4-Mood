import React from 'react';

export const HomeIcon: React.FC<{ className?: string, isFilled?: boolean }> = ({ className, isFilled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={isFilled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    {isFilled ? (
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    ) : (
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    )}
  </svg>
);
