import { defineStore } from 'pinia'

export const useComponentSizing= defineStore({
  id: 'sizing',
  state: () => ({
    sidebarWidth: 250,
    headerHeight: 100
  }),
  actions: {

  }
})
