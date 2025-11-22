<script setup></script>
<template>
  <table class="border-line fixed bottom-0 w-full border z-9999 p-3">
    <tr class="p-3">
      <td class="border-line text-secondary-100 border text-center text-lg">Find me in</td>
      <td class="border-line border p-2 text-center">
        <a href="https://t.me/LazyFrontender">
          <font-awesome-icon
            :icon="['fab', 'telegram']"
            class="text-secondary-100 text-2xl duration-200 hover:text-white"
          />
        </a>
      </td>
      <td class="text-secondary-100 border-line border p-2 text-center">
        <a href="https://www.linkedin.com/in/javohirhasanov/">
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
        <a href="https://github.com/johnkhasan">
          <span class="hidden sm:inline"> @JohnKhasan </span>
          <font-awesome-icon :icon="['fab', 'github']" class="text-2xl" />
        </a>
      </td>
    </tr>
  </table>
</template>

<style lang="scss" scoped></style>
