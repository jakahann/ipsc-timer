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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <Container size="md">
        <Stack gap="xl">
          <div className="text-center">
            <div className="text-6xl mb-4">🎯</div>
            <Title 
              order={1} 
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
              size={56}
            >
              IPSC/SRA Timer
            </Title>
            <Text c="dimmed" size="lg" mt="md">
              Professional shooting range timer with microphone detection
            </Text>
          </div>

          <Paper p="lg" radius="lg" withBorder className="border-cyan-500/20 bg-slate-800/50">
            <Tabs value={tab} onChange={setTab} defaultValue="timer">
              <Tabs.List>
                <Tabs.Tab value="timer" leftSection="⏱️">Timer</Tabs.Tab>
                <Tabs.Tab value="drills" leftSection="🎯">Drills</Tabs.Tab>
                <Tabs.Tab value="settings" leftSection="⚙️">Settings</Tabs.Tab>
                <Tabs.Tab value="history" leftSection="📊">History</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="timer" py="xl">
                <Stack gap="lg">
                  <TimerDisplay currentTime={currentTime} isRunning={isRunning} isPaused={isPaused} isWaiting={isWaiting} splits={splits} />
                  <Controls />
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel value="drills" py="xl">
                <Drills />
              </Tabs.Panel>

              <Tabs.Panel value="settings" py="xl">
                <Settings />
              </Tabs.Panel>

              <Tabs.Panel value="history" py="xl">
                <History />
              </Tabs.Panel>
            </Tabs>
          </Paper>

          <Group justify="center">
            <Text size="sm" c="dimmed" ta="center">
              🎤 Microphone required • 📱 Desktop & mobile • ⌨️ Keep app in focus
            </Text>
          </Group>
        </Stack>
      </Container>
    </div>
  );
}

export default App;
