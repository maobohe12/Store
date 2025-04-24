import { defineStore } from 'pinia';
import { usePlayerStore } from './boxPlayer';
import { useBoxMapStore } from './boxMap';
import { ArraysEqual } from '@/store/box/position';

export const useObsStore = defineStore("obstacle", {
    state: () => {
        const obsPosition = [
            [{ x: 3, y: 4 },
            { x: 4, y: 5 },
            { x: 2, y: 2 }],
            [{ x: 2, y: 4 },
            { x: 4, y: 2 }]]

        return {
            obsPosition
        }
    },
    actions: {
        obsMoveRight() {
            const { player } = usePlayerStore();
            const { clev, map } = useBoxMapStore();
            this.obsPosition[clev].forEach((item) => {
                if (item.x === player[clev].x && item.y === player[clev].y) {
                    //碰墙体 不移动  --箱子位置也不变--回退
                    if (map[clev][item.x][item.y + 1] === 1) {
                        player[clev].y -= 1;
                        return;
                    }
                    item.y += 1;
                    //碰箱子 不移动 回退
                    if (ArraysEqual(this.obsPosition[clev][0], this.obsPosition[clev][1], this.obsPosition[clev][2])) {
                        player[clev].y -= 1;
                        item.y -= 1;
                        return;
                    }
                }
            })
        },
        obsMoveLeft() {
            const { player } = usePlayerStore();
            const { clev, map } = useBoxMapStore();
            this.obsPosition[clev].forEach((item) => {
                if (item.x === player[clev].x && item.y === player[clev].y) {
                    //碰墙体 不移动  --箱子位置也不变--回退
                    if (map[clev][item.x][item.y - 1] === 1) {
                        player[clev].y += 1;
                        return;
                    }
                    item.y -= 1;
                    //碰箱子 不移动 回退
                    if (ArraysEqual(this.obsPosition[clev][0], this.obsPosition[clev][1], this.obsPosition[clev][2])) {
                        player[clev].y += 1;
                        item.y += 1;
                        return;
                    }
                }
            })
        },
        obsMoveUp() {
            const { player } = usePlayerStore();
            const { clev, map } = useBoxMapStore();
            this.obsPosition[clev].forEach((item) => {
                if (item.x === player[clev].x && item.y === player[clev].y) {
                    //碰墙体 不移动  --箱子位置也不变--回退
                    if (map[clev][item.x - 1][item.y] === 1) {
                        player[clev].x += 1;
                        return;
                    }
                    item.x -= 1;
                    //碰箱子-传过去的长度和去重后的长度不相同 不移动 回退
                    if (ArraysEqual(this.obsPosition[clev][0], this.obsPosition[clev][1], this.obsPosition[clev][2])) {
                        player[clev].x += 1;
                        item.x += 1;
                        return;
                    }
                }
            })
        },
        obsMoveDown() {
            const { player } = usePlayerStore();
            const { clev, map } = useBoxMapStore();
            this.obsPosition[clev].forEach((item) => {
                if (item.x === player[clev].x && item.y === player[clev].y) {
                    //碰墙体 不移动  --箱子位置也不变--回退
                    if (map[clev][item.x + 1][item.y] === 1) {
                        player[clev].x -= 1;
                        return;
                    }
                    item.x += 1;
                    //碰箱子 不移动 回退
                    if (ArraysEqual(this.obsPosition[clev][0], this.obsPosition[clev][1], this.obsPosition[clev][2])) {
                        player[clev].x -= 1;
                        item.x -= 1;
                        return;
                    }
                }
            })
        },

    }
})