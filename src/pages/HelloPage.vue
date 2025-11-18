<script setup>
import { computed } from "vue";
import SnakeGame from "@components/SnakeGame.vue";
const isMobile = computed(() => {
  return screen.width <= 760;
});
</script>
<template>
  <div v-show="!isMobile" class="flex justify-center">
    <SnakeGame />
  </div>
</template>

<style lang="scss" scoped></style>
