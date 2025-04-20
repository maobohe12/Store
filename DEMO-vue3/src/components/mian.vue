<template>
    <div class="main">
        <Top></Top>
        <Center></Center>
        <Bottom></Bottom>
    </div>
</template>

<script setup lang="ts">
import Top from "./top.vue";
import Center from "./center.vue";
import Bottom from "./bottom.vue";
</script>

<style lang="scss">
.main {
    float: left;
    margin-left: 50%;
    transform: translate(-50%, 10%);
    flex-direction: column;
    width: 400px;
    min-height: 600px;
    background-color: rgb(245, 246, 252);
    border-radius: 20px;
    padding-top: 15px;
    // box-shadow: 0px 5px 15px #888888;
}
</style>