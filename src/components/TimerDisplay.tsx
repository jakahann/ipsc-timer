import React from 'react';
import { Paper, Stack, Text, Group, SimpleGrid, Box, ThemeIcon, Badge, Progress } from '@mantine/core';
import { IconCircleFilled, IconTrendingUp } from '@tabler/icons-react';
import type { Split } from '../context';
import { formatTime } from '../useTimer';
import { useDrillsContext } from '../drillsContext';

interface Props {
  currentTime: number;
  isRunning: boolean;
  isPaused: boolean;
  isWaiting: boolean;
  splits: Split[];
}

export const TimerDisplay: React.FC<Props> = ({
  currentTime,
  isRunning,
  isPaused,
  isWaiting,
  splits,
}) => {
  const { selectedDrill } = useDrillsContext();
  const avgSplit = splits.length > 0
    ? splits.reduce((sum, s) => sum + s.time, 0) / splits.length
    : 0;

  const lastSplit = splits.length > 0 ? splits[splits.length - 1].time : 0;
  const fastestSplit = splits.length > 0 ? Math.min(...splits.map(s => s.time)) : 0;

  const totalShotsNeeded = selectedDrill 
    ? selectedDrill.targetCount * selectedDrill.shotsPerTarget 
    : 0;
  const shotsRemaining = totalShotsNeeded - splits.length;
  const completionPercent = totalShotsNeeded > 0 ? (splits.length / totalShotsNeeded) * 100 : 0;

  return (
    <Stack gap="lg">
      <Paper 
        p="xl" 
        radius="lg" 
        withBorder 
        className={`border-2 transition-all duration-300 ${
          isWaiting ? 'border-purple-500/50 bg-gradient-to-br from-purple-950 to-slate-900 shadow-lg shadow-purple-500/20' :
          isRunning ? 'border-green-500/50 bg-gradient-to-br from-green-950 to-slate-900 shadow-lg shadow-green-500/20' :
          isPaused ? 'border-yellow-500/50 bg-gradient-to-br from-yellow-950 to-slate-900 shadow-lg shadow-yellow-500/20' :
          'border-cyan-500/30 bg-gradient-to-br from-slate-800 to-slate-900'
        }`}
      >
        <Stack gap="md" align="center">
          <Group gap="sm">
            <ThemeIcon 
              size="lg" 
              radius="full" 
              variant="light"
              color={isWaiting ? 'purple' : isRunning ? 'green' : isPaused ? 'yellow' : 'gray'}
              className={isRunning ? 'animate-pulse' : ''}
            >
              <IconCircleFilled size={20} />
            </ThemeIcon>
            <Group gap="xs">
              <Text fw={700} size="sm" c={isWaiting ? 'purple' : isRunning ? 'green' : isPaused ? 'yellow' : 'gray'}>
                {isWaiting && '⏳ WAITING FOR BEEP'}
                {isRunning && !isWaiting && '● LIVE - LISTENING'}
                {isPaused && '⏸ PAUSED'}
                {!isRunning && !isPaused && !isWaiting && '○ READY'}
              </Text>
              {splits.length > 0 && (
                <Badge size="lg" radius="md" className="bg-gradient-to-r from-cyan-500 to-blue-500">
                  {splits.length} shots
                </Badge>
              )}
            </Group>
          </Group>

          {selectedDrill ? (
            <Group gap="md" w="100%" justify="center">
              <Badge size="lg" radius="md" variant="light" color="blue">
                📌 {selectedDrill.name}
              </Badge>
              <Text size="sm" fw={600} c="dimmed">
                {selectedDrill.targetCount} targets × {selectedDrill.shotsPerTarget} shots
              </Text>
            </Group>
          ) : (
            <Badge size="lg" radius="md" className="bg-gradient-to-r from-indigo-500 to-purple-500">
              🎯 FREE MODE
            </Badge>
          )}

          <div className="py-6 px-8 w-full text-center bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-lg border border-slate-700/30">
            <div className={`text-8xl font-black font-mono tracking-tighter transition-all duration-100 ${
              isRunning ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400' :
              isWaiting ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400' :
              isPaused ? 'text-yellow-300' :
              'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400'
            }`}>
              {formatTime(currentTime)}
            </div>
          </div>

          {selectedDrill && totalShotsNeeded > 0 && (
            <div className="w-full">
              <Group justify="space-between" mb="xs">
                <Text size="sm" fw={600}>Drill Progress</Text>
                <Text size="sm" fw={700} className="text-cyan-400">
                  {splits.length} / {totalShotsNeeded}
                </Text>
              </Group>
              <Progress 
                value={completionPercent} 
                radius="md" 
                size="lg"
                className="[&_div]:bg-gradient-to-r [&_div]:from-cyan-500 [&_div]:to-blue-500"
              />
              {shotsRemaining > 0 && (
                <Text size="xs" c="dimmed" mt="xs" ta="center">
                  {shotsRemaining} shot{shotsRemaining !== 1 ? 's' : ''} remaining
                </Text>
              )}
            </div>
          )}

          {splits.length > 0 && (
            <>
              <div className="w-full border-t border-gradient-to-r from-transparent via-slate-700 to-transparent" />
              <SimpleGrid cols={4} spacing="md" w="100%">
                <Box 
                  ta="center" 
                  p="md" 
                  className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 hover:from-cyan-500/20 hover:to-blue-500/20 transition-all rounded-lg"
                >
                  <Text size="xl" fw={800} className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
                    {splits.length}
                  </Text>
                  <Text size="xs" c="dimmed" fw={600}>Total Shots</Text>
                </Box>

                <Box 
                  ta="center" 
                  p="md" 
                  className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 hover:from-emerald-500/20 hover:to-teal-500/20 transition-all rounded-lg"
                >
                  <Text size="xl" fw={800} className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-2 font-mono">
                    {formatTime(lastSplit)}
                  </Text>
                  <Text size="xs" c="dimmed" fw={600}>Last Shot</Text>
                </Box>

                <Box 
                  ta="center" 
                  p="md" 
                  className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 hover:from-amber-500/20 hover:to-orange-500/20 transition-all rounded-lg"
                >
                  <Text size="xl" fw={800} className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 mb-2 font-mono">
                    {formatTime(avgSplit)}
                  </Text>
                  <Text size="xs" c="dimmed" fw={600}>Avg Split</Text>
                </Box>

                <Box 
                  ta="center" 
                  p="md" 
                  className="bg-gradient-to-br from-rose-500/10 to-red-500/10 border border-rose-500/20 hover:from-rose-500/20 hover:to-red-500/20 transition-all rounded-lg"
                >
                  <Text size="xl" fw={800} className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-400 mb-2 font-mono">
                    {formatTime(fastestSplit)}
                  </Text>
                  <Text size="xs" c="dimmed" fw={600}>Fastest</Text>
                </Box>
              </SimpleGrid>
            </>
          )}
        </Stack>
      </Paper>

      {splits.length > 0 && (
        <Paper p="lg" radius="lg" withBorder className="border-cyan-500/30 bg-gradient-to-br from-slate-800/50 to-slate-900/50">
          <Stack gap="md">
            <Group justify="space-between">
              <Text fw={700} size="lg" className="flex items-center gap-2">
                <IconTrendingUp size={20} className="text-cyan-400" />
                Split Sequence
              </Text>
              <Text size="sm" c="dimmed">{splits.length} total</Text>
            </Group>
            <Stack gap="xs" mah={400} style={{ overflowY: 'auto' }}>
              {splits.map((split, idx) => {
                const isPersonalBest = split.time === fastestSplit;
                return (
                  <Group 
                    key={idx} 
                    justify="space-between" 
                    p="md" 
                    className={`transition-all rounded-md ${
                      isPersonalBest
                        ? 'bg-gradient-to-r from-rose-500/20 to-red-500/20 border border-rose-500/30 shadow-lg shadow-rose-500/10'
                        : 'bg-slate-700/20 hover:bg-slate-700/40'
                    }`}
                  >
                    <Group gap="sm">
                      <ThemeIcon 
                        size="md" 
                        radius="full" 
                        className={`bg-gradient-to-br ${
                          isPersonalBest 
                            ? 'from-rose-500 to-red-600' 
                            : 'from-cyan-500 to-blue-600'
                        }`}
                      >
                        <Text size="xs" fw={800} c="white">
                          {idx + 1}
                        </Text>
                      </ThemeIcon>
                      <div>
                        <Text size="sm" fw={600}>
                          {split.targetIndex !== undefined ? `Target ${split.targetIndex}` : 'Shot'}
                        </Text>
                        {isPersonalBest && (
                          <Badge size="xs" variant="light" color="rose" mt={2}>
                            🏆 Personal Best
                          </Badge>
                        )}
                      </div>
                    </Group>
                    <Text fw={800} className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-mono text-lg">
                      {formatTime(split.time)}
                    </Text>
                  </Group>
                );
              })}
            </Stack>
          </Stack>
        </Paper>
      )}
    </Stack>
  );
};
