<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h3 class="card-title">{{ title }}</h3>
      <p>{{ content }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  content: String,
});
</script>

<style lang="scss" scoped></style>
