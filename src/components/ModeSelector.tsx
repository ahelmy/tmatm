import React from 'react';
import { TimerMode } from '../types/timer';

interface ModeSelectorProps {
  currentMode: TimerMode;
  onModeChange: (mode: TimerMode) => void;
}

export function ModeSelector({ currentMode, onModeChange }: ModeSelectorProps) {
  const modes: { value: TimerMode; label: string }[] = [
    { value: 'work', label: 'Focus' },
    { value: 'short-break', label: 'Short Break' },
    { value: 'long-break', label: 'Long Break' },
  ];

  return (
    <div className="flex gap-2 mb-8">
      {modes.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onModeChange(value)}
          className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
            currentMode === value
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}