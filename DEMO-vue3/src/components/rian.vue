<template>
    <div class="rain" ref="rain">
        <!-- <div class="drop">
            <div class="stem"></div>
            <div class="splat"></div>
        </div> -->
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from "vue";
let rain = ref();
let drops = '';
onMounted(() => {
    RainBegin();
    rain.value.innerHTML = drops;
})
const RainBegin = () => {
    let num = 0;
    while (num < 100) {
        let delay = Math.floor(Math.random() * (98) + 1);
        let initial = Math.floor(Math.random() * 4 + 2);
        num += initial;
        drops += `
    <div class="drop" style="left: ${num - 2}%;bottom:${initial * 2 - 1 + 100}%;animation-delay:0.${delay}s;animation-duration:2.${+ delay}s">
            <div class="stem" style="animation-delay:0.${delay}s;animation-duration:2.${delay}s"></div>
            <div class="splat" style="animation-delay:0.${delay}s;animation-duration:2.${delay}s"></div>
        </div>`
    }
}
</script>

<style lang="scss">
.rain {
    position: relative;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to bottom, #202020, #111119);

    .drop {
        position: absolute;
        // left: 3%;
        // bottom: 105%;
        width: 15px;
        height: 120px;
        // background-color: red;
        // transform: translateY(95vh);
        animation: drop 2s linear infinite;

        .stem {
            width: 3px;
            height: 60%;
            background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, .5));
            margin-left: 7px;
            animation: stem 2s linear infinite;
        }

        .splat {
            width: 15px;
            height: 10px;
            border-top: 2px dotted rgba(255, 255, 255, .5);
            border-radius: 50%;
            opacity: 1;
            animation: splat 2s linear infinite;
        }
    }
}

@keyframes drop {
    0% {
        transform: translateY(0vh);
    }

    75% {
        transform: translateY(100vh);
    }

    100% {
        transform: translateY(100vh);
    }
}

@keyframes stem {
    0% {
        opacity: 1;
    }

    65% {
        opacity: 1;
    }

    75% {
        opacity: 0;
    }

    100% {
        opacity: 0;
    }
}

@keyframes splat {
    0% {
        opacity: 1;
        transform: scale(0);
    }

    80% {
        opacity: 1;
        transform: scale(0);
    }

    90% {
        opacity: .5;
        transform: scale(1);
    }

    100% {
        opacity: 0;
        transform: scale(2);
    }
}
</style>