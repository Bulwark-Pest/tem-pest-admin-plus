import { defineStore } from 'pinia'

export const useTesterStore= defineStore({
    id: 'tester',
    state: () => ({
        tester: 0
    }),
    actions: {
        increaseCount() {
            this.tester++
        },
        decreaseCount() {
            this.tester--
        }
    }
})