import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { TimerSettings } from '../types/timer';

interface SettingsProps {
  settings: TimerSettings;
  onSettingsChange: (settings: TimerSettings) => void;
}

export function Settings({ settings, onSettingsChange }: SettingsProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleChange = (key: keyof TimerSettings, value: number | boolean) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
      >
        <SettingsIcon className="w-6 h-6 text-gray-600" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl p-4 z-10">
          <h3 className="text-lg font-semibold mb-4">Timer Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Focus Duration (minutes)</label>
              <input
                type="number"
                min="1"
                max="60"
                value={settings.work / 60}
                onChange={(e) => handleChange('work', Number(e.target.value) * 60)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Short Break (minutes)</label>
              <input
                type="number"
                min="1"
                max="30"
                value={settings.shortBreak / 60}
                onChange={(e) => handleChange('shortBreak', Number(e.target.value) * 60)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Long Break (minutes)</label>
              <input
                type="number"
                min="1"
                max="60"
                value={settings.longBreak / 60}
                onChange={(e) => handleChange('longBreak', Number(e.target.value) * 60)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Desktop Notifications</label>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleChange('notifications', e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Sound Alerts</label>
              <input
                type="checkbox"
                checked={settings.sound}
                onChange={(e) => handleChange('sound', e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}