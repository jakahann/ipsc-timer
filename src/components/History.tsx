import React from 'react';
import { Paper, Stack, Text, Group, Accordion, SimpleGrid, ThemeIcon } from '@mantine/core';
import { useTimerContext } from '../context';
import { formatTime } from '../useTimer';

export const History: React.FC = () => {
  const { sessions } = useTimerContext();

  if (sessions.length === 0) {
    return (
      <Paper p="xl" radius="lg" ta="center" className="border-cyan-500/30 bg-slate-800/50">
        <Text size="xl" fw={700} mb="md">📝 No Sessions Yet</Text>
        <Text c="dimmed">Start a timer to create your first session</Text>
      </Paper>
    );
  }

  const totalSessions = sessions.length;
  const totalTime = sessions.reduce((sum, s) => sum + s.totalTime, 0);
  const totalShots = sessions.reduce((sum, s) => sum + s.splits.length, 0);

  return (
    <Stack gap="lg">
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
        <Paper p="lg" radius="lg" withBorder className="border-cyan-500/30 bg-slate-800/50 text-center">
          <Text fw={700} size="xl" className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            {totalSessions}
          </Text>
          <Text size="xs" c="dimmed" mt="xs">Total Sessions</Text>
        </Paper>
        <Paper p="lg" radius="lg" withBorder className="border-cyan-500/30 bg-slate-800/50 text-center">
          <Text fw={700} size="xl" className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            {formatTime(totalTime)}
          </Text>
          <Text size="xs" c="dimmed" mt="xs">Combined Time</Text>
        </Paper>
        <Paper p="lg" radius="lg" withBorder className="border-cyan-500/30 bg-slate-800/50 text-center">
          <Text fw={700} size="xl" className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            {totalShots}
          </Text>
          <Text size="xs" c="dimmed" mt="xs">Total Shots</Text>
        </Paper>
      </SimpleGrid>

      <Paper p="lg" radius="lg" withBorder className="border-cyan-500/30 bg-slate-800/50">
        <Text fw={600} mb="md">📊 Session History</Text>
        <Accordion>
          {sessions
            .slice()
            .reverse()
            .map((session) => (
              <Accordion.Item key={session.id} value={session.id}>
                <Accordion.Control>
                  <Group justify="space-between" w="100%">
                    <Group>
                      <Text size="lg">
                        {session.discipline === 'ipsc' ? '🏆' : '🎖️'}
                      </Text>
                      <div>
                        <Text fw={600}>{session.discipline.toUpperCase()}</Text>
                        <Text size="xs" c="dimmed">
                          {new Date(session.createdAt).toLocaleString()}
                        </Text>
                      </div>
                    </Group>
                    <div>
                      <Text fw={700} className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                        {formatTime(session.totalTime)}
                      </Text>
                      <Text size="xs" c="dimmed">{session.splits.length} shots</Text>
                    </div>
                  </Group>
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack gap="xs">
                    {session.splits.length === 0 ? (
                      <Text size="sm" c="dimmed">No splits recorded</Text>
                    ) : (
                      session.splits.map((split, idx) => (
                        <Group key={idx} justify="space-between" p="sm" className="bg-slate-700/30 rounded-md">
                          <Group gap="sm">
                            <ThemeIcon size="sm" radius="full" className="bg-gradient-to-br from-cyan-500 to-blue-500">
                              <Text size="xs" fw={700} c="white">{idx + 1}</Text>
                            </ThemeIcon>
                            <Text size="sm" c="dimmed">Shot {idx + 1}</Text>
                          </Group>
                          <Text fw={700} className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-mono">
                            {formatTime(split.time)}
                          </Text>
                        </Group>
                      ))
                    )}
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
        </Accordion>
      </Paper>
    </Stack>
  );
};
