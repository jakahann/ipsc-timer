import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { playBeep } from './useAudio';
import { useAudioContext } from './useAudioContext';

export type Discipline = 'ipsc' | 'sra';

export interface Split {
  time: number;
  targetIndex?: number;
}

export interface Session {
  id: string;
  discipline: Discipline;
  totalTime: number;
  splits: Split[];
  createdAt: number;
}

interface TimerContextType {
  isRunning: boolean;
  isPaused: boolean;
  isWaiting: boolean;
  splits: Split[];
  discipline: Discipline;
  soundThreshold: number;
  sessions: Session[];
  delayMin: number;
  delayMax: number;
  
  startTimer: () => void;
  stopTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  recordSplit: (targetIndex?: number) => void;
  resetTimer: () => void;
  setDiscipline: (d: Discipline) => void;
  setSoundThreshold: (v: number) => void;
  setDelayMin: (v: number) => void;
  setDelayMax: (v: number) => void;
  recordSession: (session: Session) => void;
  loadSessions: () => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [splits, setSplits] = useState<Split[]>([]);
  const [discipline, setDiscipline] = useState<Discipline>('ipsc');
  const [soundThreshold, setSoundThreshold] = useState(40);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [delayMin, setDelayMin] = useState(1000);
  const [delayMax, setDelayMax] = useState(4000);
  const [timerStartTime, setTimerStartTime] = useState<number | null>(null);

  useAudioContext();

  const startTimer = useCallback(() => {
    setIsWaiting(true);
    setIsRunning(false);
    setIsPaused(false);
    setSplits([]);
    setTimerStartTime(null);
    
    const delay = Math.random() * (delayMax - delayMin) + delayMin;
    
    setTimeout(() => {
      playBeep(1500, 200);
      setTimerStartTime(Date.now());
      setIsWaiting(false);
      setIsRunning(true);
    }, delay);
  }, [delayMin, delayMax]);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsPaused(true);
    setIsRunning(false);
  }, []);

  const resumeTimer = useCallback(() => {
    setIsPaused(false);
    setIsRunning(true);
  }, []);

  const recordSplit = useCallback((targetIndex?: number) => {
    if (!isRunning || !timerStartTime) return;
    const elapsedTime = Date.now() - timerStartTime;
    setSplits((prev) => [...prev, { time: elapsedTime, targetIndex }]);
  }, [isRunning, timerStartTime]);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    setSplits([]);
  }, []);

  const recordSession = useCallback((session: Session) => {
    setSessions((prev) => {
      const updated = [...prev, session];
      localStorage.setItem('ipsc-sessions', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const loadSessions = useCallback(() => {
    const stored = localStorage.getItem('ipsc-sessions');
    if (stored) {
      try {
        setSessions(JSON.parse(stored));
      } catch {
        console.error('Failed to load sessions');
      }
    }
  }, []);

  const value: TimerContextType = {
    isRunning,
    isPaused,
    isWaiting,
    splits,
    discipline,
    soundThreshold,
    sessions,
    delayMin,
    delayMax,
    startTimer,
    stopTimer,
    pauseTimer,
    resumeTimer,
    recordSplit,
    resetTimer,
    setDiscipline,
    setSoundThreshold,
    setDelayMin,
    setDelayMax,
    recordSession,
    loadSessions,
  };

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
};

export const useTimerContext = () => {
  const ctx = useContext(TimerContext);
  if (!ctx) {
    throw new Error('useTimerContext must be used within TimerProvider');
  }
  return ctx;
};
