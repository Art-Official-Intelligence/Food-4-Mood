import React from 'react';

export const MainCourseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12h20z"/>
        <path d="M12 12c-3.314 0-6 2.686-6 6h12c0-3.314-2.686-6-6-6z"/>
        <path d="M12 12c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2z"/>
        <path d="M6 12c-2.21 0-4 1.79-4 4h8c0-2.21-1.79-4-4-4zM18 12c-2.21 0-4 1.79-4 4h8c0-2.21-1.79-4-4-4z"/>
        <path d="M10 6.27c0-1.25.34-2.42.94-3.4.6-1 1.4-1.87 2.06-2.87M14 6.27c0-1.25-.34-2.42-.94-3.4-.6-1-1.4-1.87-2.06-2.87"/>
    </svg>
);