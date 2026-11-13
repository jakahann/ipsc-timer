import { useEffect, useRef } from 'react';
import { useTimerContext } from './context';

export const useAudioDetector = () => {
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const previousAverageRef = useRef(0);
  const lastShotTimeRef = useRef(0);
  const { isRunning, soundThreshold, recordSplit } = useTimerContext();

  useEffect(() => {
    if (!isRunning) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      return;
    }

    const startAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: false, noiseSuppression: false },
        });
        streamRef.current = stream;

        const audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        audioContextRef.current = audioContext;

        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        analyserRef.current = analyser;

        source.connect(analyser);

        const detectSound = () => {
          if (!analyserRef.current || !isRunning) return;

          const data = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(data);

          const midpoint = Math.floor(data.length / 2);
          const highFreqs = data.slice(midpoint);
          const highAverage = highFreqs.reduce((a, b) => a + b) / highFreqs.length;

          const overallAverage = data.reduce((a, b) => a + b) / data.length;

          const attack = overallAverage - previousAverageRef.current;
          previousAverageRef.current = overallAverage * 0.7 + previousAverageRef.current * 0.3;

          const isSharp = attack > soundThreshold * 0.5;
          const isLoud = highAverage > soundThreshold;

          if (isSharp && isLoud) {
            const now = Date.now();
            if (now - lastShotTimeRef.current > 100) {
              recordSplit();
              lastShotTimeRef.current = now;
            }
          }

          requestAnimationFrame(detectSound);
        };

        detectSound();
      } catch (err) {
        console.error('Microphone access denied:', err);
      }
    };

    startAudio();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [isRunning, soundThreshold, recordSplit]);
};
