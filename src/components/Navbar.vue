<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <div class="logo">javohir-hasanov</div>
  <div class="navbar-left">
    <div>
      <router-link to="/" active-class="active">_hello</router-link>
    </div>
    <div>
      <router-link to="/about-me" active-class="active">_about-me</router-link>
    </div>
    <div>
      <router-link to="/projects" active-class="active">_projects</router-link>
    </div>
  </div>
  <div class="navbar-right">
    <div>
      <router-link to="/contact-me" active-class="active"
        >_contact-me
      </router-link>
      >
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
