<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <!-- DESKTOP NAVBAR (TABLE) -->
  <table class="hidden w-full table-auto border-separate border-spacing-0 sm:table">
    <tr class="border-line text-secondary-100 border">
      <td class="p-3">
        <router-link to="/">javohir-hasanov</router-link>
      </td>

      <!-- DESKTOP LINKS -->
      <td
        :class="{ 'nav-link text-white': route.path === '/' }"
        class="border-line border text-center"
      >
        <router-link to="/">_hello</router-link>
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
  <div class="text-secondary-100 relative flex w-full items-center justify-between p-4 sm:hidden">
    <!-- LOGO -->
    <router-link class="z-50 text-xl font-bold" to="/">javohir-hasanov</router-link>

    <!-- HAMBURGER -->
    <button class="relative z-50 flex h-8 w-10 flex-col justify-between" @click="toggleMenu">
      <span
        class="bg-secondary-100 block h-[3px] w-full transition-all duration-300"
        :class="{ 'translate-y-[16px] rotate-45': isOpen }"
      ></span>
      <span
        class="bg-secondary-100 block h-[3px] w-full transition-all duration-300"
        :class="{ 'opacity-0': isOpen }"
      ></span>
      <span
        class="bg-secondary-100 block h-[3px] w-full transition-all duration-300"
        :class="{ '-translate-y-[12px] -rotate-45': isOpen }"
      ></span>
    </button>

    <!-- FULLSCREEN MOBILE MENU -->
    <transition name="fade">
      <div
        v-if="isOpen"
        class="bg-primary-200 text-secondary-100 fixed inset-0 z-40 flex h-screen flex-col"
      >
        <div class="mt-10 flex flex-col gap-6 p-8 text-2xl">
          <router-link
            class="border-line border-b pb-3"
            :class="{ 'nav-link text-white': route.path === '/' }"
            to="/"
            @click="isOpen = false"
          >
            _hello
          </router-link>

          <router-link
            class="border-line border-b pb-3"
            :class="{ 'nav-link text-white': route.path === '/about-me' }"
            to="/about-me"
            @click="isOpen = false"
          >
            _about-me
          </router-link>

          <router-link
            class="border-line border-b pb-3"
            :class="{ 'nav-link text-white': route.path === '/projects' }"
            to="/projects"
            @click="isOpen = false"
          >
            _projects
          </router-link>

          <router-link
            class="border-line border-b pb-3"
            :class="{ 'nav-link text-white': route.path === '/contact-me' }"
            to="/contact-me"
            @click="isOpen = false"
          >
            _contact-me
          </router-link>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Underline (nav-link) for desktop AND mobile */
.nav-link {
  position: relative;
}
.nav-link::after {
  content: "";
  position: absolute;
  bottom: -2px;
  width: 100%;
  height: 2px;
  background-color: #fea55f;
  left: 0;
}

/* Fade animation for fullscreen menu */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
