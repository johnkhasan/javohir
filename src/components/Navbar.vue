<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

function changeRoute(routePath) {
  router.push(routePath);
}
</script>

<template>
  <!-- DESKTOP NAVBAR (TABLE) -->
  <table
    class="border-line z-9999 hidden w-full table-auto border-separate border-spacing-0 border border-x-0 border-y-0 sm:table"
  >
    <tbody class="border-line text-secondary-100 border">
      <td class="w-[25%] cursor-pointer  text-nowrap" @click="changeRoute('/')">
        <router-link to="/">javohir-hasan</router-link>
      </td>

      <!-- DESKTOP LINKS -->
      <td
        :class="{ 'nav-link  text-white': route.path === '/' }"
        class="border-line cursor-pointer border text-center"
        @click="changeRoute('/')"
      >
        <router-link to="/">_hello</router-link>
      </td>

      <td
        :class="{ 'nav-link text-white': route.path === '/about-me' }"
        class="border-line cursor-pointer border text-center text-nowrap"
        @click="changeRoute('/about-me')"
      >
        <router-link to="/about-me">_about-me</router-link>
      </td>

      <td
        :class="{ 'nav-link  text-white': route.path === '/projects' }"
        class="border-line cursor-pointer border text-center"
        @click="changeRoute('/projects')"
      >
        <router-link to="/projects">_projects</router-link>
      </td>
      <td class="w-[50%]"><span></span></td>
      <td
        :class="{ 'nav-link  text-white': route.path === '/contact-me' }"
        class="border-line cursor-pointer border text-center text-nowrap"
        @click="changeRoute('/contact-me')"
      >
        <router-link to="/contact-me">_contact-me</router-link>
      </td>
    </tbody>
  </table>

  <!-- MOBILE NAVBAR -->
  <div
    class="text-secondary-100 border-line relative mt-0 flex w-full items-center justify-between border p-4 sm:hidden"
  >
    <!-- LOGO -->
    <router-link class="z-50 text-xl font-bold" to="/">javohir-hasan</router-link>

    <!-- HAMBURGER -->
    <button class="relative z-50 flex h-6 w-8 flex-col justify-between" @click="toggleMenu">
      <span
        class="bg-secondary-100 block h-[3px] w-full rounded-sm transition-all duration-300"
        :class="{ 'translate-y-3 rotate-45': isOpen }"
      ></span>
      <span
        class="bg-secondary-100 block h-[3px] w-full rounded-sm transition-all duration-300"
        :class="{ 'opacity-0': isOpen }"
      ></span>
      <span
        class="bg-secondary-100 block h-[3px] w-full rounded-sm transition-all duration-300"
        :class="{ '-translate-y-2 -rotate-45': isOpen }"
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
