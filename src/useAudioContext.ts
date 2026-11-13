import { useEffect, useRef } from 'react';

let globalAudioContext: AudioContext | null = null;

export const useAudioContext = () => {
  const contextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (globalAudioContext) {
      contextRef.current = globalAudioContext;
      return;
    }

    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    globalAudioContext = ctx;
    contextRef.current = ctx;

    ctx.resume().catch(() => {
      console.log('AudioContext resume pending (user interaction required)');
    });
  }, []);

  return contextRef;
};

export const getAudioContext = (): AudioContext => {
  if (!globalAudioContext) {
    globalAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return globalAudioContext;
};
