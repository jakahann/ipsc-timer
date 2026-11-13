import { useEffect, useRef, useState } from 'react';

export const useTimer = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const isRunningRef = useRef(false);

  useEffect(() => {
    const update = (now: number) => {
      if (isRunningRef.current) {
        const elapsed = now - startTimeRef.current;
        setCurrentTime(elapsed);
        animationFrameRef.current = requestAnimationFrame(update);
      }
    };

    animationFrameRef.current = requestAnimationFrame(update);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    isRunningRef.current = true;
    startTimeRef.current = performance.now();
    setCurrentTime(0);
  };

  const stopTimer = () => {
    isRunningRef.current = false;
  };

  return { currentTime, startTimer, stopTimer, isRunningRef };
};

export const formatTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = ms % 1000;

  if (minutes === 0 && totalSeconds === 0) {
    return `0.${milliseconds.toString().padStart(3, '0')}`;
  }

  if (minutes === 0) {
    return `${seconds}.${milliseconds.toString().padStart(3, '0')}`;
  }
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
};
