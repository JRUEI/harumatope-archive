'use client';

import React, { createContext, useContext, useState } from 'react';
import { readStoredBoolean, useHydrated, writeStoredBoolean } from '@/lib/client-state';

type HomeLayoutContextType = {
  isTimeline: boolean;
  setIsTimeline: (value: boolean) => void;
  isDateInside: boolean;
  setIsDateInside: (value: boolean) => void;
  isCompact: boolean;
  setIsCompact: (value: boolean) => void;
};

const HomeLayoutContext = createContext<HomeLayoutContextType | undefined>(undefined);
const TIMELINE_STORAGE_KEY = 'harumatope-timeline';
const DATE_INSIDE_STORAGE_KEY = 'harumatope-date-inside';
const COMPACT_STORAGE_KEY = 'harumatope-compact';

export function HomeLayoutProvider({ children }: { children: React.ReactNode }) {
  const [isTimeline, setIsTimeline] = useState(
    () => readStoredBoolean(TIMELINE_STORAGE_KEY, true),
  );
  const [isDateInside, setIsDateInside] = useState(
    () => readStoredBoolean(DATE_INSIDE_STORAGE_KEY, false),
  );
  const [isCompact, setIsCompact] = useState(
    () => readStoredBoolean(COMPACT_STORAGE_KEY, false),
  );
  const mounted = useHydrated();

  const handleSetTimeline = (val: boolean) => {
    setIsTimeline(val);
    writeStoredBoolean(TIMELINE_STORAGE_KEY, val);
  };

  const handleSetDateInside = (val: boolean) => {
    setIsDateInside(val);
    writeStoredBoolean(DATE_INSIDE_STORAGE_KEY, val);
  };

  const handleSetCompact = (val: boolean) => {
    setIsCompact(val);
    writeStoredBoolean(COMPACT_STORAGE_KEY, val);
  };

  if (!mounted) {
    // Return default values during SSR to avoid hydration mismatch
    return (
      <HomeLayoutContext.Provider value={{ 
        isTimeline: true, setIsTimeline: () => {}, 
        isDateInside: false, setIsDateInside: () => {}, 
        isCompact: false, setIsCompact: () => {} 
      }}>
        {children}
      </HomeLayoutContext.Provider>
    );
  }

  return (
    <HomeLayoutContext.Provider value={{ 
      isTimeline, setIsTimeline: handleSetTimeline, 
      isDateInside, setIsDateInside: handleSetDateInside, 
      isCompact, setIsCompact: handleSetCompact 
    }}>
      {children}
    </HomeLayoutContext.Provider>
  );
}

export function useHomeLayout() {
  const context = useContext(HomeLayoutContext);
  if (context === undefined) {
    throw new Error('useHomeLayout must be used within a HomeLayoutProvider');
  }
  return context;
}
