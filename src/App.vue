<script setup lang="ts">
import { useCounterStore } from "./stores/counter";
const counter = useCounterStore();
</script>

<template>
  <h1 class="text-red-900 text-center text-4xl mt-4">
    Hello Vue {{ counter.count }}
  </h1>
  <div class="flex justify-center gap-4 mt-4">
    <button class="btn btn-soft btn-primary" @click="counter.increment">
      Increment
    </button>
    <button class="btn btn-soft btn-secondary ml-3" @click="counter.decrement">
      Decrement
    </button>
    <button class="btn btn-soft" @click="counter.reset">Reset</button>
  </div>
  <RouterView />
</template>
