import React from 'react';
import { Button, Group } from '@mantine/core';
import { IconPlayerPlay, IconPlayerStop, IconPlayerPause, IconTargetOff } from '@tabler/icons-react';
import { useTimerContext } from '../context';

export const Controls: React.FC = () => {
  const {
    isRunning,
    isPaused,
    isWaiting,
    startTimer,
    stopTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    recordSplit,
  } = useTimerContext();

  return (
    <Group justify="center" gap="md" grow>
      {!isRunning && !isPaused && !isWaiting && (
        <Button 
          onClick={startTimer} 
          size="lg"
          radius="lg"
          leftSection={<IconPlayerPlay size={20} />}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl hover:shadow-emerald-500/50 font-bold transition-all hover:scale-105"
        >
          START
        </Button>
      )}

      {isWaiting && (
        <Button 
          disabled
          size="lg"
          radius="lg"
          leftSection="⏳"
          className="bg-gradient-to-r from-purple-500 to-pink-600 opacity-75 font-bold"
        >
          WAITING FOR BEEP...
        </Button>
      )}

      {(isRunning || isPaused) && (
        <>
          {isRunning && (
            <Button 
              onClick={pauseTimer} 
              size="lg"
              radius="lg"
              leftSection={<IconPlayerPause size={20} />}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg hover:shadow-xl hover:shadow-amber-500/50 font-bold transition-all hover:scale-105"
            >
              PAUSE
            </Button>
          )}
          {isPaused && (
            <Button 
              onClick={resumeTimer} 
              size="lg"
              radius="lg"
              leftSection={<IconPlayerPlay size={20} />}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg hover:shadow-xl hover:shadow-amber-500/50 font-bold transition-all hover:scale-105"
            >
              RESUME
            </Button>
          )}
          <Button 
            onClick={stopTimer} 
            size="lg"
            radius="lg"
            leftSection={<IconPlayerStop size={20} />}
            className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg hover:shadow-xl hover:shadow-red-500/50 font-bold transition-all hover:scale-105"
          >
            STOP
          </Button>
          {isRunning && (
            <Button 
              onClick={() => recordSplit()} 
              size="lg"
              radius="lg"
              leftSection={<IconTargetOff size={20} />}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg hover:shadow-xl hover:shadow-cyan-500/50 font-bold transition-all hover:scale-105"
            >
              SPLIT
            </Button>
          )}
        </>
      )}

      {!isRunning && !isWaiting && (
        <Button 
          onClick={resetTimer} 
          size="lg"
          radius="lg"
          leftSection="🔄"
          variant="default"
          className="font-bold border-2 border-slate-600 hover:border-slate-500 hover:bg-slate-700/50"
        >
          RESET
        </Button>
      )}
    </Group>
  );
};
