import { defineStore } from 'pinia';

export const useDoorStore = defineStore('door', {
    state: () => {
        const doorPosition = [
            [{ x: 2, y: 1 },
            { x: 5, y: 5 },
            { x: 5, y: 2 }],
            [{ x: 4, y: 5 },
            { x: 5, y: 4 }]
        ]
        return {
            doorPosition
        }
    }
})