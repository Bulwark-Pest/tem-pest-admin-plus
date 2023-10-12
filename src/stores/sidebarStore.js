import { defineStore } from 'pinia'

export const useSidebarStore= defineStore({
    id: 'sidebar',
    state: () => ({
        collapsed: false,
    }),
    actions: {
        toggleSidebar() {
            this.collapsed = !this.collapsed
        }
    }
})