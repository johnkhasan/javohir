<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <div class="navbar grid grid-cols-3 bg-primary-200 border-2 border-line p-4">
    <div class="logo nav-link text-secondary-100 col-span-1">
      <router-link to="/">javohir-hasanov</router-link>
    </div>
    <div class="navbar-left flex justify-around gap-4 self-start border-2 border-line ">
      <div class="">
        <router-link
          class="nav-link text-secondary-100"
          to="/"
          active-class="text-white"
          exact
          >_hello</router-link
        >
      </div>

      <div>
        <router-link
          class="nav-link text-secondary-100"
          to="/about-me"
          active-class="text-white"
          >_about-me</router-link
        >
      </div>
      <div>
        <router-link
          class="nav-link text-secondary-100"
          to="/projects"
          active-class="text-white"
          >_projects</router-link
        >
      </div>
    </div>
    <div class="navbar-right flex self-end  border-2 border-line">
      <div>
        <router-link
          class="nav-link text-secondary-100"
          to="/contact-me"
          active-class="text-white"
        >
          _contact-me
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
