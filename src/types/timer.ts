export type TimerMode = 'work' | 'short-break' | 'long-break';

export interface TimerSettings {
  work: number;
  shortBreak: number;
  longBreak: number;
  longBreakInterval: number;
  notifications: boolean;
  sound: boolean;
}

export interface TimerState {
  mode: TimerMode;
  timeLeft: number;
  isRunning: boolean;
  sessionsCompleted: number;
}