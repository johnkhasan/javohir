<script setup>
import { computed } from "vue";
import SnakeGame from "@components/SnakeGame.vue";
import blurBackground from "../assets/icons/background-blur.svg";
const isMobile = computed(() => {
  return screen.width <= 760;
});
</script>
<template>
  <div class="hello-wrapper flex justify-between items-center w-full h-screen">
    <div class="hello-left relative">
      <p class="text-white">Hi all. I am</p>
      <h1 class="text-6xl font-bold text-white">Javohir Hasanov</h1>
      <p class="text-secondary-300 text-2xl font-bold mb-8">
        > Front-end developer
      </p>
      <span v-show="!isMobile" class="text-secondary-100">
        <p class="mb-2">// complete the game to continue</p>
        <p class="mb-2">// you can also see it on my Github page</p>
      </span>
      <p>
        <span class="text-secondary-300 mr-1">const</span>
        <span class="text-a mr-1">githubLink</span>
        <span class="text-secondary-100 mr-1">=</span>
        <span class="text-accent-100" title="GitHub">
          <a href="https://github.com/LazyBrogrammer"
            >https://github.com/LazyBrogrammer</a
          ></span
        >
      </p>
      <div class="back-blur absolute top-10"></div>
    </div>
    <div class="hello-right">
      <div v-show="!isMobile" class="">
        <SnakeGame />
      </div>
    </div>
  </div>
</template>

<style scoped>
.back-blur {
  background-image: url("../assets/icons/background-blur.svg");
  background-size: 800px;
  background-position: center;
  width: 50vw;
  height: 50vh;
}
</style>
