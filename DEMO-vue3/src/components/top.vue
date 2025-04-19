<template>
    <div class="top">
        <h4>{{ title }}</h4>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const title = ref('简易便签');
</script>

<style lang="scss" scoped>
.top {
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;

    h4 {
        font-size: 25px;
    }
}
</style>