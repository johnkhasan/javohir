<template>
  <div
    class="navbarborder-line border-line -mb-px flex flex-wrap items-center justify-between gap-4 border-2 p-4"
  >
    <!-- Logo -->
    <div class="logo nav-link text-secondary-100">
      <router-link to="/">javohir-hasanov</router-link>
    </div>

    <!-- Hamburger (mobile) -->
    <button class="text-4xl text-white md:hidden" @click="isOpen = !isOpen">☰</button>

    <!-- Left menu -->
    <div
      class="navbar-left flex w-full flex-col  gap-4 md:w-auto md:flex-row md:justify-start"
      :class="{ hidden: !isOpen, flex: isOpen, 'md:flex': true }"
    >
      <div class="border-line border-2 p-3 px-8">
        <router-link class="nav-link text-secondary-100" to="/" exact>_hello</router-link>
      </div>

      <div class="border-line border-2 p-3 px-8">
        <router-link class="nav-link text-secondary-100" to="/about-me">_about-me</router-link>
      </div>

      <div class="border-line border-2 p-3 px-8">
        <router-link class="nav-link text-secondary-100" to="/projects">_projects</router-link>
      </div>
    </div>

    <!-- Right Contact -->
    <div
      class="navbar-right border-line flex w-full justify-start border-2 p-3 px-8 md:w-auto md:justify-end"
      :class="{ hidden: !isOpen, flex: isOpen, 'md:flex': true }"
    >
      <router-link class="nav-link text-secondary-100" to="/contact-me"> _contact-me </router-link>
    </div>
  </div>
</template>