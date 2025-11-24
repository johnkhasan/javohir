<script setup>
import { computed } from "vue";
import SnakeGame from "@components/SnakeGame.vue";
const isMobile = computed(() => {
  return screen.width <= 760;
});
</script>
<template>
  <div
    class="hello-wrapper flex h-[80vh] w-full flex-col items-center justify-around sm:flex-row "
  >
    <div
      class="background-none sel relative flex flex-col items-center justify-center  sm:items-start sm:p-0"
    >
      <p class="text-white">Hi all. I am</p>
      <h1 class="text-center text-6xl font-bold text-white">Javohir Hasan</h1>
      <p class="text-secondary-300 mb-8 text-2xl font-bold">> Front-end developer</p>
      <span v-show="!isMobile" class="text-secondary-100">
        <p class="mb-2">// complete the game to continue</p>
        <p class="mb-2">// you can also see it on my Github page</p>
      </span>
      <p class="z-20">
        <span class="text-secondary-300 mr-1">const</span>
        <span class="text-a mr-1">githubLink</span>
        <span class="text-secondary-100 mr-1">=</span>
        <span class="sm:hidden"><br /></span>
        <span class="text-accent-100" title="GitHub">
          <a href="https://github.com/johnkhasan">https://github.com/johnkhasan</a></span
        >
      </p>
      <div
        class="back-blur w-screen h-screen absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 blur-2xl"
      ></div>
    </div>
    <!-- MOBILE CODE SNIPPET IMAGE -->
    <div v-show="isMobile" class="block sm:hidden ">
      <img src="../assets/images/code-snippet.svg" alt="" />
    </div>

    <!-- DESKTOP SNAKE GAME -->
    <div v-show="!isMobile" class="hidden sm:block">
      <SnakeGame />
    </div>
  </div>
</template>

<style scoped>
.back-blur {
  background-image: url("../assets/icons/background-blur.svg");
  background-size: 600px;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
