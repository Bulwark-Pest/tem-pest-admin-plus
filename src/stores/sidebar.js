import { defineStore } from 'pinia'

export const useToggleSidebar= defineStore({
    id: 'sidebar',
    state: () => ({
        collapsed: false,
        sidebarWidth: 180
    }),
    actions: {
        collapse() {
            this.collapsed = true
            this.sidebarWidth = 38
        },
        uncollapse() {
            this.collapsed = false
            this.sidebarWidth = 180
        }
    }
})