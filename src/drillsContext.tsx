import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export interface Drill {
  id: string;
  name: string;
  targetCount: number;
  shotsPerTarget: number;
  description: string;
  isCustom: boolean;
}

interface DrillsContextType {
  drills: Drill[];
  selectedDrillId: string | null;
  selectedDrill: Drill | null;
  
  setSelectedDrill: (id: string | null) => void;
  addDrill: (drill: Omit<Drill, 'id' | 'isCustom'>) => void;
  removeDrill: (id: string) => void;
  loadDrills: () => void;
}

const DrillsContext = createContext<DrillsContextType | undefined>(undefined);

const DEFAULT_DRILLS: Drill[] = [
  {
    id: 'bill-drill',
    name: 'Bill Drill',
    targetCount: 1,
    shotsPerTarget: 6,
    description: '6 shots on 1 target as fast as possible',
    isCustom: false,
  },
  {
    id: 'mozambique',
    name: 'Mozambique',
    targetCount: 1,
    shotsPerTarget: 3,
    description: '3 shots in triangle pattern (2 center + 1 head)',
    isCustom: false,
  },
  {
    id: 'steel-challenge',
    name: 'Steel Challenge',
    targetCount: 5,
    shotsPerTarget: 1,
    description: '5 targets, 1 shot each',
    isCustom: false,
  },
  {
    id: 'classifier',
    name: 'IPSC Classifier',
    targetCount: 6,
    shotsPerTarget: 2,
    description: '6 targets, 2 shots each',
    isCustom: false,
  },
  {
    id: 'draw-drill',
    name: 'Draw Drill',
    targetCount: 1,
    shotsPerTarget: 5,
    description: '5 draws from holster',
    isCustom: false,
  },
];

export const DrillsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [drills, setDrills] = useState<Drill[]>(DEFAULT_DRILLS);
  const [selectedDrillId, setSelectedDrillId] = useState<string | null>(null);

  const loadDrills = useCallback(() => {
    const stored = localStorage.getItem('ipsc-drills');
    if (stored) {
      try {
        const customDrills = JSON.parse(stored);
        setDrills([...DEFAULT_DRILLS, ...customDrills]);
      } catch {
        console.error('Failed to load drills');
      }
    }
  }, []);

  const addDrill = useCallback((drill: Omit<Drill, 'id' | 'isCustom'>) => {
    const newDrill: Drill = {
      ...drill,
      id: `custom-${Date.now()}`,
      isCustom: true,
    };
    
    setDrills((prev) => {
      const updated = [...prev, newDrill];
      const customDrills = updated.filter(d => d.isCustom);
      localStorage.setItem('ipsc-drills', JSON.stringify(customDrills));
      return updated;
    });
  }, []);

  const removeDrill = useCallback((id: string) => {
    setDrills((prev) => {
      const updated = prev.filter(d => d.id !== id);
      const customDrills = updated.filter(d => d.isCustom);
      localStorage.setItem('ipsc-drills', JSON.stringify(customDrills));
      return updated;
    });
  }, []);

  const selectedDrill = drills.find(d => d.id === selectedDrillId) || null;

  const value: DrillsContextType = {
    drills,
    selectedDrillId,
    selectedDrill,
    setSelectedDrill: setSelectedDrillId,
    addDrill,
    removeDrill,
    loadDrills,
  };

  useEffect(() => {
    loadDrills();
  }, [loadDrills]);

  return (
    <DrillsContext.Provider value={value}>{children}</DrillsContext.Provider>
  );
};

export const useDrillsContext = () => {
  const ctx = useContext(DrillsContext);
  if (!ctx) {
    throw new Error('useDrillsContext must be used within DrillsProvider');
  }
  return ctx;
};
