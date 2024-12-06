import { useState, useEffect, useCallback } from 'react';
import { TimerMode, TimerState, TimerSettings } from '../types/timer';
import useSound from 'use-sound';

const DEFAULT_SETTINGS: TimerSettings = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
  longBreakInterval: 4,
  notifications: true,
  sound: true,
};

export function useTimer() {
  const [settings, setSettings] = useState<TimerSettings>(() => {
    const savedSettings = localStorage.getItem('timerSettings');
    return savedSettings ? JSON.parse(savedSettings) : DEFAULT_SETTINGS;
  });

  const [state, setState] = useState<TimerState>({
    mode: 'work',
    timeLeft: settings.work,
    isRunning: false,
    sessionsCompleted: 0,
  });

  // Use an absolute URL for the sound file
  const [playSound] = useSound('/notification.mp3', { 
    volume: 1.0,
    preload: true,
    interrupt: true // Allow interrupting previous sound playback
  });

  useEffect(() => {
    localStorage.setItem('timerSettings', JSON.stringify(settings));
  }, [settings]);

  const requestNotificationPermission = useCallback(async () => {
    if (settings.notifications && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  }, [settings.notifications]);

  useEffect(() => {
    requestNotificationPermission();
  }, [requestNotificationPermission]);

  const notify = useCallback((title: string, body: string) => {
    if (settings.notifications && Notification.permission === 'granted') {
      new Notification(title, { body });
    }
    if (settings.sound) {
      // Wrap playSound in a try-catch and add a small delay
      setTimeout(() => {
        try {
          playSound();
        } catch (error) {
          console.error('Error playing sound:', error);
        }
      }, 100);
    }
  }, [settings.notifications, settings.sound, playSound]);

  const switchMode = useCallback((mode: TimerMode) => {
    const duration = {
      work: settings.work,
      'short-break': settings.shortBreak,
      'long-break': settings.longBreak,
    }[mode];

    setState(prev => ({
      ...prev,
      mode,
      timeLeft: duration,
      isRunning: false,
    }));
  }, [settings]);

  const toggleTimer = useCallback(() => {
    setState(prev => ({ ...prev, isRunning: !prev.isRunning }));
  }, []);

  const resetTimer = useCallback(() => {
    setState(prev => ({
      ...prev,
      timeLeft: settings[prev.mode === 'work' ? 'work' : prev.mode === 'short-break' ? 'shortBreak' : 'longBreak'],
      isRunning: false,
    }));
  }, [settings]);

  const completeSession = useCallback(() => {
    const newSessionsCompleted = state.sessionsCompleted + 1;
    const shouldTakeLongBreak = newSessionsCompleted % settings.longBreakInterval === 0;
    const nextMode = shouldTakeLongBreak ? 'long-break' : 'short-break';
    
    notify(
      'Time to take a break!',
      `Great job! You've completed ${newSessionsCompleted} sessions.`
    );
    
    setState(prev => ({ ...prev, sessionsCompleted: newSessionsCompleted }));
    switchMode(nextMode);
  }, [state.sessionsCompleted, settings.longBreakInterval, switchMode, notify]);

  useEffect(() => {
    let interval: number;

    if (state.isRunning && state.timeLeft > 0) {
      interval = window.setInterval(() => {
        setState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
        }));
      }, 1000);
    } else if (state.timeLeft === 0) {
      if (state.mode === 'work') {
        completeSession();
      } else {
        notify('Break time is over!', 'Time to focus again.');
        switchMode('work');
      }
    }

    return () => clearInterval(interval);
  }, [state.isRunning, state.timeLeft, state.mode, completeSession, switchMode, notify]);

  return { 
    state, 
    settings,
    toggleTimer, 
    resetTimer, 
    switchMode,
    updateSettings: setSettings
  };
}