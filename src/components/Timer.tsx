import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { formatTime } from '../utils/formatTime';
import { TimerMode } from '../types/timer';

interface TimerProps {
  timeLeft: number;
  mode: TimerMode;
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
}

export function Timer({ timeLeft, mode, isRunning, onToggle, onReset }: TimerProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-7xl font-bold text-gray-800 mb-8">
        {formatTime(timeLeft)}
      </div>
      
      <div className="flex gap-4">
        <button
          onClick={onToggle}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 transition-colors duration-200"
        >
          {isRunning ? (
            <Pause className="w-8 h-8" />
          ) : (
            <Play className="w-8 h-8" />
          )}
        </button>
        
        <button
          onClick={onReset}
          className="bg-gray-200 hover:bg-gray-300 rounded-full p-4 transition-colors duration-200"
        >
          <RotateCcw className="w-8 h-8 text-gray-700" />
        </button>
      </div>
    </div>
  );
}