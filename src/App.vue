<script setup>
import Navbar from "@components/Navbar.vue";
import Loader from "@components/Loader.vue";
import { useLoaderStore } from "@stores/loader";

const loader = useLoaderStore();
</script>

<template>
  <Loader v-if="loader.loading" />
  <Navbar />
  <RouterView />
</template>
