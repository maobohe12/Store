<template>
    <div class="door" :style="position"></div>
</template>

<script setup lang="ts">
import { movePosition } from '@/store/box/position';

const props = defineProps<{ x: number, y: number }>();
let position = movePosition(props);
</script>

<style scoped lang="scss">
.door {
    position: absolute;
    width: 100px;
    height: 100px;
    border: 2px dotted red;

    &::before,
    &::after {
        content: '';
        position: absolute;
        width: 2px;
        height: 140px;
        background: repeating-linear-gradient(to bottom,
                red 0,
                red 5px,
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