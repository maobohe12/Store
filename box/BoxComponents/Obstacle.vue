<template>
    <div class="obstacle" :style="position"></div>
</template>

<script setup lang="ts">
import { movePosition } from '@/store/box/position';

const props = defineProps<{ x: number, y: number }>();

//每个箱子都有自己的x,y 从Game那传过来的
let position = movePosition(props);

</script>

<style socped lang="scss">
.obstacle {
    position: absolute;
    width: 100px;
    height: 100px;
    border: 2px solid black;
    background-color: yellow;

    &::before,
    &::after {
        content: '';
        position: absolute;
        width: 2px;
        height: 140px;
        background: repeating-linear-gradient(to bottom,
                orange 0,
                orange 5px,
                transparent 5px,
                transparent 10px);
        top: 50%;
        left: 50%;
    }

    &::before {
        transform: translate(-50%, -50%) rotate(45deg);
    }

    &::after {
        transform: translate(-50%, -50%) rotate(-45deg);
    }
}
</style>