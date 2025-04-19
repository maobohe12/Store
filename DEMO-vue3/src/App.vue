<template>
  <div class="app">
    <Top></Top>
    <Center></Center>
    <Bottom></Bottom>
  </div>
</template>

<script setup lang="ts">
import Top from "./components/top.vue";
import Center from "./components/center.vue";
import Bottom from "./components/bottom.vue";
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  flex-direction: column;
  margin: 20px auto;
  width: 400px;
  min-height: 600px;
  background-color: rgb(245, 246, 252);
  border-radius: 20px;
  padding-top: 15px;
  box-shadow: 0px 5px 15px #888888;
}
</style>
