import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const Slider: React.FC<SliderProps> = ({ label, value, min, max, step = 1, unit, onChange, name }) => {
  return (
    <div className="w-full">
      <label className="flex justify-between items-baseline text-light-textSecondary dark:text-dark-textSecondary">
        <span className="font-medium">{label}</span>
        <span className="text-xl font-semibold text-accent-blue">
          {value} <span className="text-sm font-normal text-light-textSecondary dark:text-dark-textSecondary">{unit}</span>
        </span>
      </label>
      <input
        id={name}
        name={name}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent-blue mt-2"
      />
    </div>
  );
};

export default Slider;
