<template>
    <div class="map">
        <div class="row" v-for="(row, i) in map[clev]">
            <div class="col" v-for="(col, j) in map[clev][i]">
                <template v-if="map[clev][i][j] === 1">
                    <div class="border"></div>
                </template>
                <template v-if="map[clev][i][j] === 2">
                    <div class="inter"></div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useBoxMapStore } from '@/store/box/boxMap';

let MapStore = useBoxMapStore();
const { map, clev } = useBoxMapStore();
</script>

<style scoped lang="scss">
.row {
    display: flex;
    width: 700px;
    height: 100px;

    .col {
        flex: 1;

        .inter {
            width: 100%;
            height: 100%;
            background-color: #dcd09e;
        }

        .border {
            width: 100%;
            height: 100%;
            background-color: #6c6c6c;
            border: 1px dotted black;
        }
    }
}
</style>