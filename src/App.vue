<script setup lang="ts">
import { useCounterStore } from "./stores/counter";
import SnakeGame from "./components/SnakeGame.vue";
import { computed } from "vue";
const counter = useCounterStore();

const isMobile = computed(() => {
  return screen.width <= 760;
});
</script>

<template>
  <h1 class="text-red-900 text-center text-4xl mt-4">
    Hello Vue {{ counter.count }}
  </h1>

  <div class="flex justify-center gap-4 my-4">
    <button class="btn btn-soft btn-primary" @click="counter.increment">
      Increment
    </button>
    <button class="btn btn-soft btn-secondary ml-3" @click="counter.decrement">
      Decrement
    </button>
    <button class="btn btn-soft" @click="counter.reset">Reset</button>
  </div>

  <template v-show="!isMobile">
    <SnakeGame />
  </template>

  <div v-show="!isMobile">Desktop</div>
  <div v-show="isMobile">Mobile</div>

  <RouterView />
</template>
