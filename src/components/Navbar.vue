<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <!-- DESKTOP NAVBAR (table) -->
  <table class="hidden w-full table-auto border-separate border-spacing-0 sm:table">
    <tr class="border-line text-secondary-100 border">
      <td class="p-3">
        <div class="logo text-secondary-100">
          <router-link to="/">javohir-hasanov</router-link>
        </div>
      </td>

      <!-- DESKTOP LINKS -->
      <td
        :class="{ 'nav-link text-white': route.path === '/' }"
        class="border-line border text-center"
      >
        <router-link active-class="text-white" to="/">_hello</router-link>
      </td>

      <td
        :class="{ 'nav-link text-white': route.path === '/about-me' }"
        class="border-line border text-center"
      >
        <router-link to="/about-me">_about-me</router-link>
      </td>

      <td
        :class="{ 'nav-link text-white': route.path === '/projects' }"
        class="border-line border text-center"
      >
        <router-link to="/projects">_projects</router-link>
      </td>

      <td
        :class="{ 'nav-link text-white': route.path === '/contact-me' }"
        class="border-line border text-center"
      >
        <router-link to="/contact-me">_contact-me</router-link>
      </td>
    </tr>
  </table>

  <!-- MOBILE NAVBAR -->
  <table class="b text-secondary-100 border border-line flex flex-col gap-2 p-3 sm:hidden">
    <tr class="text-secondary-100 text-xl font-bold border-b border-line py-3 flex items-center">
      <router-link to="/">javohir-hasanov</router-link>
    </tr>

    <tr class="border-line border-b py-2" :class="{ ' text-white': route.path === '/' }">
      <router-link to="/">_hello</router-link>
    </tr>

    <tr class="border-line border-b py-2" :class="{ ' text-white': route.path === '/about-me' }">
      <router-link to="/about-me">_about-me</router-link>
    </tr>

    <tr class="border-line border-b py-2" :class="{ ' text-white': route.path === '/projects' }">
      <router-link to="/projects">_projects</router-link>
    </tr>

    <tr class="border-line border-b py-2" :class="{ ' text-white': route.path === '/contact-me' }">
      <router-link to="/contact-me">_contact-me</router-link>
    </tr>
  </table>
</template>

<style scoped>
table,
tr,
td {
  border-collapse: collapse;
}

.nav-link {
  position: relative;
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: -1px;
  width: 100%;
  height: 2px;
  background-color: #fea55f;
  left: 0;
}
</style>
