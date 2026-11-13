import { useEffect, useState } from 'react';
import { Container, Tabs, Title, Text, Stack, Group, Paper } from '@mantine/core';
import { useTimerContext } from './context';
import { useTimer } from './useTimer';
import { useAudioDetector } from './useAudioDetector';
import { TimerDisplay } from './components/TimerDisplay';
import { Controls } from './components/Controls';
import { Settings } from './components/Settings';
import { History } from './components/History';
import { Drills } from './components/Drills';
import './index.css';

function App() {
  const [tab, setTab] = useState<string | null>('timer');
  const { currentTime } = useTimer();
  const { isRunning, isPaused, isWaiting, splits, loadSessions } = useTimerContext();

  useAudioDetector();

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Container size="md" className="py-8">
        <Stack gap="xl">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 mb-4">
              <span className="text-4xl">🎯</span>
            </div>
            <Title 
              order={1} 
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 mb-3"
              size={48}
            >
              IPSC/SRA Timer
            </Title>
            <Text c="dimmed" size="lg" fw={500}>
              Professional reaction time training
            </Text>
          </div>

          <Paper 
            p={0}
            radius="2xl" 
            withBorder 
            className="border-cyan-500/20 bg-gradient-to-b from-slate-800/40 to-slate-900/40 backdrop-blur-xl overflow-hidden shadow-2xl"
          >
            {/* Decorative border glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 pointer-events-none" />
            
            <Tabs value={tab} onChange={setTab} defaultValue="timer" className="relative z-10">
              <Tabs.List className="border-b border-slate-700/30 bg-transparent px-6 py-4">
                <Tabs.Tab value="timer" leftSection="⏱️" fw={600}>Timer</Tabs.Tab>
                <Tabs.Tab value="drills" leftSection="🎯" fw={600}>Drills</Tabs.Tab>
                <Tabs.Tab value="settings" leftSection="⚙️" fw={600}>Settings</Tabs.Tab>
                <Tabs.Tab value="history" leftSection="📊" fw={600}>History</Tabs.Tab>
              </Tabs.List>

              <div className="p-6">
                <Tabs.Panel value="timer" py={0}>
                  <Stack gap="lg">
                    <TimerDisplay currentTime={currentTime} isRunning={isRunning} isPaused={isPaused} isWaiting={isWaiting} splits={splits} />
                    <Controls />
                  </Stack>
                </Tabs.Panel>

                <Tabs.Panel value="drills" py={0}>
                  <Drills />
                </Tabs.Panel>

                <Tabs.Panel value="settings" py={0}>
                  <Settings />
                </Tabs.Panel>

                <Tabs.Panel value="history" py={0}>
                  <History />
                </Tabs.Panel>
              </div>
            </Tabs>
          </Paper>

          {/* Footer */}
          <Group justify="center" className="mt-4">
            <Text size="xs" c="dimmed" ta="center" className="flex items-center gap-2">
              <span>🎤 Microphone</span>
              <span className="text-slate-700">•</span>
              <span>📱 Mobile Ready</span>
              <span className="text-slate-700">•</span>
              <span>⚡ Real-time Detection</span>
            </Text>
          </Group>
        </Stack>
      </Container>
    </div>
  );
}

export default App;
