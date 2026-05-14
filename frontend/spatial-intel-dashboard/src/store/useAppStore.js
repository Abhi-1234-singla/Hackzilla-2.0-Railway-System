import { create } from 'zustand';

export const useAppStore = create((set) => ({
  leftSidebarOpen: true,
  rightSidebarOpen: true,
  alerts: [
    { id: 1, type: 'warning', message: 'New encroachment detected in Sector 4', timestamp: '10 mins ago' },
    { id: 2, type: 'critical', message: 'Drainage blockage risk: High', timestamp: '1 hour ago' },
  ],

  toggleLeftSidebar: () => set((state) => ({ leftSidebarOpen: !state.leftSidebarOpen })),
  toggleRightSidebar: () => set((state) => ({ rightSidebarOpen: !state.rightSidebarOpen })),
  addAlert: (alert) => set((state) => ({ alerts: [alert, ...state.alerts] })),
  removeAlert: (id) => set((state) => ({ alerts: state.alerts.filter((a) => a.id !== id) })),
}));
