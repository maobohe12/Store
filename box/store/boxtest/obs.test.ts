import { expect, it, describe, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useObsStore } from '../box/boxObs';
import { useBoxMapStore } from '../box/boxMap';
import { usePlayerStore } from '../box/boxPlayer';

describe('obstest', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    })

    describe("meet the wall", () => {
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
        it('when meet the Rightwall should not move', () => {
            const palyerStore = usePlayerStore();
            const { obsPosition, obsMoveRight } = useObsStore();
            obsPosition[0][0] = { x: 1, y: 5 };
            obsPosition[0][1] = { x: 1, y: 5 };
            palyerStore.player[0].x = 1;
            palyerStore.player[0].y = 5;
            obsMoveRight();
            expect(obsPosition[0][0].y).toBe(5);
            expect(palyerStore.player[0].y).toBe(4);
        })
        it('when meet the Leftwall should not move', () => {
            const palyerStore = usePlayerStore();
            const { obsPosition, obsMoveLeft } = useObsStore();
            obsPosition[0][0] = { x: 1, y: 1 };
            obsPosition[0][1] = { x: 2, y: 1 };
            palyerStore.player[0].x = 1;
            palyerStore.player[0].y = 1;
            obsMoveLeft();
            expect(obsPosition[0][0].y).toBe(1);
            expect(palyerStore.player[0].y).toBe(2);
        })
        it('when meet the Upwall should not move', () => {
            const palyerStore = usePlayerStore();
            const { obsPosition, obsMoveUp } = useObsStore();
            obsPosition[0][0] = { x: 1, y: 1 };
            obsPosition[0][1] = { x: 2, y: 2 };
            palyerStore.player[0].x = 1;
            palyerStore.player[0].y = 1;
            obsMoveUp();
            expect(obsPosition[0][0].x).toBe(1);
            expect(palyerStore.player[0].x).toBe(2);
        })
        it('when meet the Upwall should not move', () => {
            const palyerStore = usePlayerStore();
            const { obsPosition, obsMoveDown } = useObsStore();
            obsPosition[0][0] = { x: 5, y: 1 };
            obsPosition[0][1] = { x: 2, y: 1 };
            palyerStore.player[0].x = 5;
            palyerStore.player[0].y = 1;
            obsMoveDown();
            expect(obsPosition[0][0].x).toBe(5);
            expect(palyerStore.player[0].x).toBe(4);
        })
        it('when meet the box should not move', () => {
            const palyerStore = usePlayerStore();
            const { obsPosition, obsMoveRight } = useObsStore();
            obsPosition[0][0] = { x: 1, y: 3 };
            obsPosition[0][1] = { x: 1, y: 4 };
            palyerStore.player[0].x = 1;
            palyerStore.player[0].y = 3;
            obsMoveRight();
            expect(obsPosition[0][0].y).toBe(3);
            expect(palyerStore.player[0].y).toBe(2);
        })
        it('when meet the box should not move', () => {
            const palyerStore = usePlayerStore();
            const { obsPosition, obsMoveLeft } = useObsStore();
            obsPosition[0][0] = { x: 1, y: 4 };
            obsPosition[0][1] = { x: 1, y: 3 };
            palyerStore.player[0].x = 1;
            palyerStore.player[0].y = 4;
            obsMoveLeft();
            expect(obsPosition[0][0].y).toBe(4);
            expect(palyerStore.player[0].y).toBe(5);
        })
    })
})