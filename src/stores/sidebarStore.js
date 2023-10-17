import { defineStore } from 'pinia'

export const useSidebarStore= defineStore({
  id: 'sidebar',
  state: () => ({
    isSidebarOpen: false,
    isSidebarLocked: false
  }),
  actions: {
    setSidebarState(state) {
      this.isSidebarOpen = state;
    },
    lockSidebar() {
      this.isSidebarLocked = !this.isSidebarLocked;
    }
  }
})