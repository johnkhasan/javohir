<script setup>
import Navbar from "@components/Navbar.vue";
import Loader from "@components/Loader.vue";
import Footer from "@components/Footer.vue";
import { useLoaderStore } from "@stores/loader";

const loader = useLoaderStore();
</script>

<template>
  <div class="border-line border">
    <Loader v-if="loader.loading" />
    <Navbar />
    <RouterView />
    <Footer />
  </div>
</template>
