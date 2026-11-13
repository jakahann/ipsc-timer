import React from 'react';
import { Paper, Stack, Text, SegmentedControl, Slider, Group, Box, Card } from '@mantine/core';
import { useTimerContext } from '../context';

export const Settings: React.FC = () => {
  const { 
    discipline, 
    setDiscipline, 
    soundThreshold, 
    setSoundThreshold,
    delayMin,
    delayMax,
    setDelayMin,
    setDelayMax,
  } = useTimerContext();

  return (
    <Stack gap="xl">
      <Paper p="lg" radius="lg" withBorder className="border-2 border-cyan-500/30 bg-gradient-to-br from-slate-800/70 to-slate-900/70 hover:border-cyan-500/50 transition-all">
        <Stack gap="md">
          <Group gap="sm">
            <Box className="text-3xl">🎯</Box>
            <Text fw={700} size="lg">Discipline Selection</Text>
          </Group>
          <SegmentedControl
            value={discipline}
            onChange={(value) => setDiscipline(value as 'ipsc' | 'sra')}
            data={[
              { label: '🏆 IPSC', value: 'ipsc' },
              { label: '🎖️ SRA', value: 'sra' },
            ]}
            fullWidth
            size="lg"
            className="[&_button]:font-bold [&_button]:text-sm"
          />
        </Stack>
      </Paper>

      <Paper p="lg" radius="lg" withBorder className="border-2 border-purple-500/30 bg-gradient-to-br from-slate-800/70 to-slate-900/70 hover:border-purple-500/50 transition-all">
        <Stack gap="lg">
          <Group gap="sm">
            <Box className="text-3xl">⏱️</Box>
            <Text fw={700} size="lg">Reaction Time Delay</Text>
          </Group>
          <Stack gap="lg">
            <Card p="md" radius="md" className="bg-slate-700/30 border border-purple-500/20">
              <Stack gap="lg">
                <div>
                  <Group justify="space-between" mb="xs">
                    <Text size="sm" fw={600}>Minimum Delay</Text>
                    <Text fw={800} className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-mono text-lg">
                      {(delayMin / 1000).toFixed(2)}s
                    </Text>
                  </Group>
                  <Slider
                    value={delayMin}
                    onChange={setDelayMin}
                    min={500}
                    max={delayMax - 500}
                    step={100}
                    marks={[
                      { value: 500, label: '0.5s' },
                      { value: 2500, label: '2.5s' },
                      { value: 4000, label: '4s' },
                    ]}
                    className="[&_track]:bg-gradient-to-r [&_track]:from-cyan-500 [&_track]:to-purple-500"
                  />
                </div>
                <div>
                  <Group justify="space-between" mb="xs">
                    <Text size="sm" fw={600}>Maximum Delay</Text>
                    <Text fw={800} className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-mono text-lg">
                      {(delayMax / 1000).toFixed(2)}s
                    </Text>
                  </Group>
                  <Slider
                    value={delayMax}
                    onChange={setDelayMax}
                    min={delayMin + 500}
                    max={6000}
                    step={100}
                    marks={[
                      { value: 1000, label: '1s' },
                      { value: 3500, label: '3.5s' },
                      { value: 6000, label: '6s' },
                    ]}
                    className="[&_track]:bg-gradient-to-r [&_track]:from-purple-500 [&_track]:to-pink-500"
                  />
                </div>
              </Stack>
            </Card>

            <Box p="md" className="bg-purple-500/10 border-2 border-purple-500/30 rounded-md">
              <Text size="xs" fw={700} c="purple.2" mb="xs">
                💡 Current Range
              </Text>
              <Text size="sm" fw={600} className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                Random beep between {(delayMin / 1000).toFixed(2)}s - {(delayMax / 1000).toFixed(2)}s
              </Text>
            </Box>
          </Stack>
        </Stack>
      </Paper>

      <Paper p="lg" radius="lg" withBorder className="border-2 border-blue-500/30 bg-gradient-to-br from-slate-800/70 to-slate-900/70 hover:border-blue-500/50 transition-all">
        <Stack gap="lg">
          <Group gap="sm">
            <Box className="text-3xl">🎤</Box>
            <Text fw={700} size="lg">Sound Sensitivity</Text>
          </Group>

          <Card p="md" radius="md" className="bg-slate-700/30 border border-blue-500/20">
            <Stack gap="lg">
              <div>
                <Group justify="space-between" mb="md">
                  <Text size="sm" fw={600}>Detection Threshold</Text>
                  <Text fw={800} className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-mono text-lg">
                    {soundThreshold}
                  </Text>
                </Group>
                <Slider
                  value={soundThreshold}
                  onChange={setSoundThreshold}
                  min={5}
                  max={100}
                  step={1}
                  marks={[
                    { value: 5, label: 'Low' },
                    { value: 50, label: 'Med' },
                    { value: 100, label: 'High' },
                  ]}
                  className="[&_track]:bg-gradient-to-r [&_track]:from-blue-500 [&_track]:to-cyan-500"
                />
              </div>
            </Stack>
          </Card>

          <Box p="md" className="bg-blue-500/10 border-2 border-blue-500/30 rounded-md">
            <Text size="xs" fw={700} c="blue.2" mb="sm">
              💡 Recommended Levels
            </Text>
            <Stack gap={6}>
              <Group justify="space-between">
                <Text size="xs" c="dimmed">Gunshots</Text>
                <Text size="xs" fw={600} className="text-orange-300">35-55</Text>
              </Group>
              <Group justify="space-between">
                <Text size="xs" c="dimmed">Hand claps</Text>
                <Text size="xs" fw={600} className="text-amber-300">25-40</Text>
              </Group>
              <Group justify="space-between">
                <Text size="xs" c="dimmed">Dry-fire</Text>
                <Text size="xs" fw={600} className="text-yellow-300">30-45</Text>
              </Group>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Stack>
  );
};
