<template>
  <div class="hero min-h-screen bg-neutral">
    <div class="hero-content text-center text-secondary-100">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">About Me</h1>
        <p class="py-6">
          Hello! I'm a passionate software developer with a love for creating elegant and efficient solutions. I have experience in a variety of technologies and I'm always eager to learn new things.
        </p>
      </div>
    </div>
  </div>

  <div class="divider"></div>

  <div class="container mx-auto px-4 py-8">
    <h2 class="text-4xl font-bold text-center mb-8">My Skills</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <Card title="Frontend" content="Vue.js, React, Tailwind CSS, JavaScript, HTML, CSS" />
      <Card title="Backend" content="Node.js, Express, Python, Django" />
      <Card title="Databases" content="MongoDB, PostgreSQL, MySQL" />
    </div>
  </div>

  <div class="divider"></div>

  <div class="container mx-auto px-4 py-8">
    <h2 class="text-4xl font-bold text-center mb-8">My Interests</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <Card title="Coding" content="I love exploring new technologies and building cool projects in my free time." />
      <Card title="Reading" content="I'm an avid reader, especially of science fiction and fantasy novels." />
      <Card title="Hiking" content="I enjoy spending time in nature and exploring new trails." />
    </div>
  </div>
</template>

<script setup>
import Card from "@components/Card.vue";
</script>

<style lang="scss" scoped></style>
