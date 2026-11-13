import React, { useState } from 'react';
import { Paper, Stack, Text, Group, Button, Select, NumberInput, Textarea, Badge, ActionIcon, Modal, Card } from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { useDrillsContext } from '../drillsContext';

export const Drills: React.FC = () => {
  const { drills, selectedDrillId, setSelectedDrill, addDrill, removeDrill } = useDrillsContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    targetCount: 1,
    shotsPerTarget: 1,
    description: '',
  });

  const handleAddDrill = () => {
    if (formData.name.trim()) {
      addDrill(formData);
      setFormData({ name: '', targetCount: 1, shotsPerTarget: 1, description: '' });
      setModalOpen(false);
    }
  };

  return (
    <Stack gap="xl">
      <Paper p="lg" radius="lg" withBorder className="border-2 border-blue-500/30 bg-gradient-to-br from-slate-800/70 to-slate-900/70">
        <Stack gap="md">
          <Group justify="space-between">
            <Group gap="sm">
              <Box className="text-3xl">🎯</Box>
              <Text fw={700} size="lg">Select Drill</Text>
            </Group>
          </Group>

          <Select
            label="Available Drills"
            placeholder="Choose a drill"
            value={selectedDrillId}
            onChange={(id) => id && setSelectedDrill(id)}
            data={drills.map((d) => ({
              value: d.id,
              label: `${d.name} (${d.targetCount}T × ${d.shotsPerTarget}S)`,
              disabled: false,
            }))}
            searchable
            clearable={false}
            className="[&_input]:font-bold"
          />

          {selectedDrillId && (
            <Card p="md" radius="md" className="bg-blue-500/10 border border-blue-500/30">
              {drills.find((d) => d.id === selectedDrillId) && (
                <Stack gap="sm">
                  <div>
                    <Text size="xs" fw={700} c="blue.2" mb="xs">
                      DESCRIPTION
                    </Text>
                    <Text size="sm" c="dimmed">
                      {drills.find((d) => d.id === selectedDrillId)?.description}
                    </Text>
                  </div>
                  <div>
                    <Text size="xs" fw={700} c="blue.2" mb="xs">
                      STATS
                    </Text>
                    <Group gap="xl">
                      <div>
                        <Text size="sm" fw={600}>
                          {drills.find((d) => d.id === selectedDrillId)?.targetCount}
                        </Text>
                        <Text size="xs" c="dimmed">Targets</Text>
                      </div>
                      <div>
                        <Text size="sm" fw={600}>
                          {drills.find((d) => d.id === selectedDrillId)?.shotsPerTarget}
                        </Text>
                        <Text size="xs" c="dimmed">Shots/Target</Text>
                      </div>
                      <div>
                        <Text size="sm" fw={600} className="text-cyan-400">
                          {(drills.find((d) => d.id === selectedDrillId)?.targetCount || 0) *
                            (drills.find((d) => d.id === selectedDrillId)?.shotsPerTarget || 0)}
                        </Text>
                        <Text size="xs" c="dimmed">Total Shots</Text>
                      </div>
                    </Group>
                  </div>
                </Stack>
              )}
            </Card>
          )}
        </Stack>
      </Paper>

      <Paper p="lg" radius="lg" withBorder className="border-2 border-purple-500/30 bg-gradient-to-br from-slate-800/70 to-slate-900/70">
        <Stack gap="md">
          <Group justify="space-between">
            <Group gap="sm">
              <Box className="text-3xl">➕</Box>
              <Text fw={700} size="lg">Custom Drills</Text>
            </Group>
            <Button
              leftSection={<IconPlus size={18} />}
              onClick={() => setModalOpen(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 font-bold"
              size="sm"
            >
              Add Drill
            </Button>
          </Group>

          <Stack gap="sm">
            {drills
              .filter((d) => d.isCustom)
              .map((drill) => (
                <Card key={drill.id} p="md" radius="md" className="bg-slate-700/30 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                  <Group justify="space-between">
                    <div>
                      <Text fw={600}>{drill.name}</Text>
                      <Text size="xs" c="dimmed">
                        {drill.targetCount} targets × {drill.shotsPerTarget} shots
                      </Text>
                    </div>
                    <ActionIcon
                      color="red"
                      variant="subtle"
                      onClick={() => removeDrill(drill.id)}
                      title="Delete drill"
                    >
                      <IconTrash size={18} />
                    </ActionIcon>
                  </Group>
                </Card>
              ))}
            {!drills.some((d) => d.isCustom) && (
              <Text size="sm" c="dimmed" ta="center" py="md">
                No custom drills yet
              </Text>
            )}
          </Stack>
        </Stack>
      </Paper>

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create Custom Drill"
        centered
      >
        <Stack gap="md">
          <div>
            <Text size="sm" fw={600} mb="xs">Drill Name</Text>
            <input
              type="text"
              placeholder="e.g., My Accuracy Drill"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 rounded-md bg-slate-700 border border-slate-600 text-white text-sm"
            />
          </div>

          <div>
            <Text size="sm" fw={600} mb="xs">Number of Targets</Text>
            <NumberInput
              value={formData.targetCount}
              onChange={(val) => setFormData({ ...formData, targetCount: val || 1 })}
              min={1}
              max={20}
            />
          </div>

          <div>
            <Text size="sm" fw={600} mb="xs">Shots Per Target</Text>
            <NumberInput
              value={formData.shotsPerTarget}
              onChange={(val) => setFormData({ ...formData, shotsPerTarget: val || 1 })}
              min={1}
              max={20}
            />
          </div>

          <div>
            <Text size="sm" fw={600} mb="xs">Description (optional)</Text>
            <textarea
              placeholder="Describe the drill..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 rounded-md bg-slate-700 border border-slate-600 text-white text-sm"
              rows={3}
            />
          </div>

          <Group gap="sm" justify="flex-end">
            <Button variant="default" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddDrill}
              className="bg-gradient-to-r from-purple-500 to-pink-600 font-bold"
            >
              Create Drill
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
};

import { Box } from '@mantine/core';
