<template>
  <!-- <Main></Main>
  <Rain></Rain> -->
  <div :key="MapStore.clev">
    <Game></Game>
  </div>
</template>

<script setup lang="ts">
import Rain from "./components/rian.vue";
import Main from "./components/mian.vue";
import Game from "./BoxComponents/Game.vue";
import { useBoxMapStore } from '@/store/box/boxMap';

const MapStore = useBoxMapStore()
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  width: 100vw;
  height: 100vh;
}
</style>
