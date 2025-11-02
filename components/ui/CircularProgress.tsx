import React from 'react';

interface CircularProgressProps {
  value: number;
  max: number;
  label: string;
  unit: string;
  color: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ value, max, label, unit, color }) => {
  const radius = 55;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const progress = max > 0 ? Math.min(value / max, 1) : 0;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="relative flex flex-col items-center justify-center w-40 h-40">
      <svg className="w-full h-full" viewBox="0 0 120 120">
        <circle
          className="text-gray-200 dark:text-gray-700"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
        />
        <circle
          className={`${color} origin-center -rotate-90 animate-ring-fill`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          style={{ '--stroke-dashoffset': strokeDashoffset } as React.CSSProperties}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-light-textPrimary dark:text-dark-textPrimary">
            {Math.round(value)}
        </span>
        <span className="text-xs text-light-textSecondary dark:text-dark-textSecondary -mt-1">{unit}</span>
        <span className="text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary mt-2">{label}</span>
      </div>
    </div>
  );
};

export default CircularProgress;
