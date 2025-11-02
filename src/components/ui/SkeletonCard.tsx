import React from 'react';

interface SkeletonCardProps {
  className?: string;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ className }) => {
  return (
    <div
      className={`bg-light-card dark:bg-dark-card rounded-2xl p-6 shadow-md ${className}`}
    >
      <div 
        className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-shimmer"
        style={{
          backgroundImage: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
          backgroundSize: '1000px 100%',
        }}
      ></div>
    </div>
  );
};

export default SkeletonCard;
