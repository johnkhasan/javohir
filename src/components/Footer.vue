<script setup>
const telegramURL = "https://t.me/JavohirHasanov";
const linkedinURL = "https://www.linkedin.com/in/javohirhasanov/";
const githubURL = "https://github.com/johnkhasan";
</script>
<template>
  <table class="border-line fixed bottom-0 z-9999 w-full border p-3 bg-primary-200">
    <tr class="p-3">
      <td class="border-line text-secondary-100 border text-center text-lg">Find me in</td>
      <td class="border-line border p-2 text-center">
        <a :href="telegramURL">
          <font-awesome-icon
            :icon="['fab', 'telegram']"
            class="text-secondary-100 text-2xl duration-200 hover:text-white"
          />
        </a>
      </td>
      <td class="text-secondary-100 border-line border p-2 text-center">
        <a :href="linkedinURL">
          <font-awesome-icon
            :icon="['fab', 'linkedin']"
            class="text-2xl duration-200 hover:text-white"
          />
        </a>
      </td>
      <td class="w-0 sm:w-[60%]"></td>
      <td
        class="border-line text-secondary-100 border p-1 text-center whitespace-nowrap duration-200 hover:text-white"
      >
        <a :href="githubURL">
          <span class="hidden sm:inline"> @JohnKhasan </span>
          <font-awesome-icon :icon="['fab', 'github']" class="text-2xl" />
        </a>
      </td>
    </tr>
  </table>
</template>

<style lang="scss" scoped></style>
