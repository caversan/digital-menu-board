import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { MenuBoardSettings, MenuData, MediaItem } from '../types';

interface MenuBoardStore {
  // State
  settings: MenuBoardSettings | null;
  isLoading: boolean;
  error: string | null;
  isOnline: boolean;
  lastSync: Date | null;

  // Actions
  setSettings: (settings: MenuBoardSettings) => void;
  updateSettings: (partial: Partial<MenuBoardSettings>) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setOnline: (isOnline: boolean) => void;
  setLastSync: () => void;
  reset: () => void;
}

const initialState = {
  settings: null,
  isLoading: false,
  error: null,
  isOnline: true,
  lastSync: null,
};

export const useMenuBoardStore = create<MenuBoardStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setSettings: (settings) => {
        set({ settings, error: null, lastSync: new Date() });
      },

      updateSettings: (partial) => {
        const current = get().settings;
        if (current) {
          set({ settings: { ...current, ...partial } });
        }
      },

      setLoading: (isLoading) => {
        set({ isLoading });
      },

      setError: (error) => {
        set({ error, isLoading: false });
      },

      setOnline: (isOnline) => {
        set({ isOnline });
      },

      setLastSync: () => {
        set({ lastSync: new Date() });
      },

      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'menu-board-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        settings: state.settings,
        lastSync: state.lastSync,
      }),
    }
  )
);

// Selectors for better performance
export const useSettings = () => useMenuBoardStore((state) => state.settings);
export const useIsLoading = () => useMenuBoardStore((state) => state.isLoading);
export const useError = () => useMenuBoardStore((state) => state.error);
export const useIsOnline = () => useMenuBoardStore((state) => state.isOnline);
