import React from 'react';
import { Timer } from './components/Timer';
import { ModeSelector } from './components/ModeSelector';
import { Settings } from './components/Settings';
import { useTimer } from './hooks/useTimer';
import { Clock } from 'lucide-react';

function App() {
  const { state, settings, toggleTimer, resetTimer, switchMode, updateSettings } = useTimer();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-lg p-12 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-indigo-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Pomodoro Timer</h1>
          </div>
          <Settings settings={settings} onSettingsChange={updateSettings} />
        </div>

        <ModeSelector
          currentMode={state.mode}
          onModeChange={switchMode}
        />

        <Timer
          timeLeft={state.timeLeft}
          mode={state.mode}
          isRunning={state.isRunning}
          onToggle={toggleTimer}
          onReset={resetTimer}
        />

        <div className="mt-8 text-center text-gray-600">
          Sessions completed: {state.sessionsCompleted}
        </div>
      </div>
    </div>
  );
}

export default App;