<template>
    <div class="player" :style="position"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watchEffect } from 'vue';
import { usePlayerStore } from '@/store/box/boxPlayer';
import { movePosition, areArraysEqual } from '@/store/box/position';
import { useObsStore } from '@/store/box/boxObs';
import { useDoorStore } from '@/store/box/Door';
import { useBoxMapStore } from '@/store/box/boxMap';


const PlayerStore = usePlayerStore();
const { obsPosition } = useObsStore();
const { doorPosition } = useDoorStore();
const { clev } = useBoxMapStore();
const MapStore = useBoxMapStore();

let position = movePosition(PlayerStore.player[clev]);
const ObsStore = useObsStore();

// const step = 100;

//计算属性监视数据变化 dom同步更新
// const position = computed(() => {
//     return {
//         left: PlayerStore.player.x * step + 'px',
//         top: PlayerStore.player.y * step + 'px'
//     }
// })

//添加 跟 移除 的监听方法要全一致
onMounted(() => {
    window.addEventListener('keyup', Keyboard);
})

onUnmounted(() => {
    window.removeEventListener('keyup', Keyboard);
})

watchEffect(() => {
    if (areArraysEqual(obsPosition[clev], doorPosition[clev])) {
        if (MapStore.clev < 1) {
            setTimeout(() => {
                alert('OK,下一关');
                MapStore.clev++;
            }, 200)
        } else {
            setTimeout(() => {
                alert('通关');
            }, 200)
            return
        }
    }
})


//键盘事件包装成函数  挂载时给window添加键盘事件监听器
const Keyboard = (e: KeyboardEvent) => {
    // console.log(clev);
    switch (e.code) {
        case 'ArrowLeft':
            PlayerStore.moveLeft();
            ObsStore.obsMoveLeft();  //箱子推左移
            break;
        case 'ArrowRight':
            PlayerStore.moveRight();
            ObsStore.obsMoveRight();
            break;
        case 'ArrowUp':
            PlayerStore.moveUp();
            ObsStore.obsMoveUp();
            break;
        case 'ArrowDown':
            PlayerStore.moveDown();
            ObsStore.obsMoveDown();
            break;
        default:
            break;
    }
}
</script>

<style scoped lang="scss">
.player {
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: orange;
}
</style>