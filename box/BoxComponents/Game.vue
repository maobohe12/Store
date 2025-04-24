<template>
    <!-- 使用 key 强制重新渲染 -->
    <div>
        <Map></Map>
        <Player></Player>
        <template v-for="(item, index) in numObs" :key="index">
            <Obstacle :x="item.x" :y="item.y"></Obstacle>
        </template>
        <template v-for="(item, index) in numDoor" :key="index">
            <Door :x="item.x" :y="item.y"></Door>
        </template>
    </div>
</template>

<script setup lang="ts">
import Player from '@/BoxComponents/Player.vue';
import Map from '@/BoxComponents/Map.vue';
import Obstacle from '@/BoxComponents/Obstacle.vue';
import Door from '@/BoxComponents/Door.vue';

import { useObsStore } from '@/store/box/boxObs';
import { useDoorStore } from '@/store/box/Door';
import { useBoxMapStore } from '@/store/box/boxMap';

const MapStore = useBoxMapStore()
const { obsPosition } = useObsStore();
let numObs = obsPosition[MapStore.clev];
const { doorPosition } = useDoorStore();
let numDoor = doorPosition[MapStore.clev];




</script>

<style lang="scss" scoped></style>