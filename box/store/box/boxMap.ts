import { defineStore } from 'pinia';

type mapType = number[][];

export const useBoxMapStore = defineStore('boxMap', {
    state: () => {

        return {
            // 移动方向:x:行 y:列  left y*step   top:x*step
            map: [[
                [1, 1, 1, 1, 1, 1, 1],
                [1, 2, 2, 2, 2, 2, 1],
                [1, 2, 2, 2, 2, 2, 1],
                [1, 1, 2, 2, 2, 2, 1],
                [1, 2, 2, 2, 2, 2, 1],
                [1, 2, 2, 2, 2, 2, 1],
                [1, 1, 1, 1, 1, 1, 1]
            ], [
                [1, 1, 1, 1, 1, 1, 1],
                [1, 2, 2, 2, 1, 1, 1],
                [1, 2, 2, 2, 2, 2, 1],
                [1, 1, 2, 2, 2, 2, 1],
                [1, 2, 2, 2, 2, 2, 1],
                [1, 2, 2, 2, 2, 2, 1],
                [1, 1, 1, 1, 1, 1, 1]
            ],
            ],
            clev: 0
        }
    },
    actions: {
        //改变map
        setupMap(newmap: mapType) {
            //不改变引用 只改变值
            this.map[0].splice(0, this.map[0].length, ...newmap);
        }
    }
})