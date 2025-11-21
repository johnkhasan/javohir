<script setup>
import TelegramIcon from "../assets/icons/telegram-icon.svg";

import LinkedinIcon from "../assets/icons/linkedin-icon.svg";
import GithubIcon from "../assets/icons/github-icon.svg";
</script>
<template>
  <table class="border-line absolute bottom-0 w-full border p-3">
    <tr class="p-3">
      <td class="border-line border text-center text-secondary-100 text-lg">Find me in</td>
      <td class="border-line border p-2  text-center">
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
      <td class="border-line text-secondary-100 border whitespace-nowrap text-center p-1">
        <a href="https://github.com/LazyBrogrammer">
           <span class="hidden sm:inline"> @LazyBrogrammer </span>
          <font-awesome-icon
            :icon="['fab', 'github']"
            class="text-2xl duration-200 hover:text-white"
          />
        </a>
      </td>
    </tr>
  </table>
</template>

<style lang="scss" scoped></style>
