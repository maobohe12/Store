import { defineStore } from 'pinia';
import type { listType } from './type';

export const useListStore = defineStore('list', {
    state: () => {
        return {
            list: [
                {
                    value: 'plan1',
                    finish: false
                }
            ]
        }
    },
    actions: {
        //增
        addList(content: any) {
            this.list.push(content);
        },
        //删
        deleteList(index: number) {
            this.list.splice(index, 1);
        }
    }
})