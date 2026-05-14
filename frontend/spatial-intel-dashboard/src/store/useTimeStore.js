import { create } from 'zustand';

export const useTimeStore = create((set) => ({
  timelineDates: ['2023-05-01', '2023-05-10', '2023-05-20'],
  currentDateIndex: 2, // Default to latest
  compareMode: false,
  compareDateIndex: 0, // Date to compare against

  setCurrentDateIndex: (index) => set({ currentDateIndex: index }),
  setCompareMode: (compareMode) => set({ compareMode }),
  setCompareDateIndex: (index) => set({ compareDateIndex: index }),
}));
