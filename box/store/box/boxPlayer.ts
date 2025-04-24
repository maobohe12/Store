import { defineStore } from 'pinia';
import { useBoxMapStore } from './boxMap';

type plaPosition = {
    x: number,
    y: number
}
export const usePlayerStore = defineStore('palyer', {
    state: () => {
        //x:行  y:列 
        const player: plaPosition[] = [
            { x: 1, y: 1 },
            { x: 2, y: 3 }
        ]
        return {
            player,
        }
    },
    actions: {

        //左移
        moveLeft() {
            const { clev, map } = useBoxMapStore();
            //碰墙体 不移动
            if (map[clev][this.player[clev].x][this.player[clev].y - 1] === 1) return;
            this.player[clev].y -= 1;
        },
        //右移
        moveRight() {
            const { clev, map } = useBoxMapStore();
            //碰墙体 不移动
            if (map[clev][this.player[clev].x][this.player[clev].y + 1] === 1) return;
            this.player[clev].y += 1;
        },
        //上移
        moveUp() {
            const { clev, map } = useBoxMapStore();
            //碰墙体 不移动
            if (map[clev][this.player[clev].x - 1][this.player[clev].y] === 1) return;
            this.player[clev].x -= 1;
        },
        //下移
        moveDown() {
            const { clev, map } = useBoxMapStore();
            //碰墙体 不移动
            if (map[clev][this.player[clev].x + 1][this.player[clev].y] === 1) return;
            this.player[clev].x += 1;
        }
    }
})