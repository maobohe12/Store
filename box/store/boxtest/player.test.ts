import { expect, it, describe, beforeEach } from 'vitest';
import { usePlayerStore } from '../box/boxPlayer';
import { createPinia, setActivePinia } from 'pinia';
import { useBoxMapStore } from '../box/boxMap';

describe("player", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    })

    //单元测试
    describe("move", () => {
        beforeEach(() => {
            const { setupMap } = useBoxMapStore();
            //改变map  便于测试
            setupMap([
                [2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2]
            ])
        })
        it("move to left", () => {
            const palyerStore = usePlayerStore()
            palyerStore.player[0].x = 1;
            palyerStore.player[0].y = 1;
            palyerStore.moveLeft()
            expect(palyerStore.player[0].y).toBe(0);
        })
    })

    describe("meet wall", () => {
        beforeEach(() => {
            const { setupMap } = useBoxMapStore();
            // 原map测试
            setupMap([
                [1, 1, 1, 1, 1, 1, 1],
                [1, 2, 2, 2, 2, 2, 1],
                [1, 2, 2, 2, 2, 2, 1],
                [1, 2, 2, 2, 2, 2, 1],
                [1, 2, 2, 2, 2, 2, 1],
                [1, 2, 2, 2, 2, 2, 1],
                [1, 1, 1, 1, 1, 1, 1]
            ])
        })
        it("when meet the leftwall should not move", () => {
            const { player, moveLeft } = usePlayerStore();
            player[0].x = 1;
            player[0].y = 1;
            moveLeft();
            expect(player[0].x).toBe(1);
        })
        it("when meet the rightwall should not move", () => {
            const { player, moveRight } = usePlayerStore();
            player[0].x = 5;
            player[0].y = 1;
            moveRight();
            expect(player[0].x).toBe(5);
        })
        it("when meet the upwall should not move", () => {
            const { player, moveUp } = usePlayerStore();
            player[0].x = 1;
            player[0].y = 1;
            moveUp();
            expect(player[0].y).toBe(1);
        })
        it("when meet the downwall should not move", () => {
            const { player, moveRight } = usePlayerStore();
            player[0].x = 1;
            player[0].y = 5;
            moveRight();
            expect(player[0].y).toBe(5);
        })
    })
})
