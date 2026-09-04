'use client';

import { useSyncExternalStore } from 'react';

const subscribeToHydration = () => () => {};
const getClientHydrationSnapshot = () => true;
const getServerHydrationSnapshot = () => false;

export function useHydrated() {
  return useSyncExternalStore(
    subscribeToHydration,
    getClientHydrationSnapshot,
    getServerHydrationSnapshot,
  );
}

export function readStoredBoolean(key: string, fallback: boolean) {
  if (typeof window === 'undefined') return fallback;

  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue === null ? fallback : storedValue === 'true';
  } catch {
    return fallback;
  }
}

export function writeStoredBoolean(key: string, value: boolean) {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(key, String(value));
  } catch {
    // Preference persistence is best-effort when browser storage is unavailable.
  }
}
