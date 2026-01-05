<script setup>
// GMAIL
const gmail = "javokhirjonkhasanov@gmail.com";
const phoneNumber = 998972002466;

import { ref, onMounted, onUpdated, watch, nextTick, computed, reactive } from "vue";
// PRISM JS
import Prism from "prismjs";
import "prismjs/components/prism-javascript.js";

// Theme va line numbers CSS
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";

const message = reactive({
  name: "",
  email: "",
  message: "",
  date: new Date(),
});

const formattedCode = computed(() => {
  return `const message = {
  name: '${message.name}',
  email: '${message.email}',
  message: '${message.message}',
  date: '${message.date}',
}`;
});

const code = ref(
  `import { reactive } from 'vue'

const message = reactive({
  name: '${message.name}',
  email: '${message.email}',
  message: '${message.message}',
  date: new Date()
})

const sendMessage = () => {
  //
  //
}
`
);

const codeBlock = ref(null);
const highlightCode = () => {
  nextTick(() => {
    if (codeBlock.value) {
      Prism.highlightElement(codeBlock.value);
    }
  });
};
onMounted(() => {
  highlightCode();
});
watch(formattedCode, () => highlightCode());
onUpdated(() => {
  formattedCode;
});
const sendMessage = () => {
  alert("hi bro");
};
console.log(formattedCode);
</script>
<template>
  <table class="border-line text-secondary-100 w-full">
    <tbody>
      <tr class="border-line border border-t-0">
        <td
          class="border-line w-[25%] border border-y-0 py-1 text-nowrap hover:cursor-pointer duration-200 hover:text-white"
        >
          <font-awesome-icon :icon="['fas', 'caret-down']" class="text-md" />contacts
        </td>
        <td
          class="border-line border border-t-0 pl-3 duration-200 hover:cursor-pointer hover:text-white"
        >
          contacts
          <font-awesome-icon :icon="['fas', 'xmark']" class="text-sm" />
        </td>
      </tr>
      <tr class="border-line border py-2">
        <td class="border-line min-w-[15%] border border-x-0 border-y-0 border-r px-3 py-3">
          <a
            class="block text-nowrap hover:text-white duration-200"
            :href="`mailto:${gmail} ?subject=Hello%20Javohir&body=Salom%2C%0AQuyida%20savolim%20bor...`"
          >
            <font-awesome-icon :icon="['fas', 'envelope']" class="text-md" />
            gmail
          </a>

          <a class="text-nowrap duration-200 hover:text-white" :href="`tel:+${phoneNumber}`"
            ><font-awesome-icon :icon="['fas', 'phone']" class="text-md" /> phone</a
          >
        </td>
      </tr>
      <tr>
        <td class="border-line w-[25%] border border-y-0 py-1 text-nowrap hover:text-white duration-200 cursor-pointer">
          <font-awesome-icon :icon="['fas', 'caret-down']" class="text-xl" />find-me-also-in
        </td>
      </tr>
      <tr>
        <td class="border border-line py-1">
          <a href="#" class="text-nowrap hover:text-white duration-200 block">
            <font-awesome-icon :icon="['fas', 'arrow-up-right-from-square']" class="text-md" /> _codewars
          </a>
          <a href="#" class="text-nowrap hover:text-white duration-200 block">
            <font-awesome-icon :icon="['fas', 'arrow-up-right-from-square']" class="text-md" /> _codewars
          </a>
          <a href="#" class="text-nowrap hover:text-white duration-200 block">
            <font-awesome-icon :icon="['fas', 'arrow-up-right-from-square']" class="text-md" /> _codewars
          </a>
          <a href="#" class="text-nowrap hover:text-white duration-200 block">
            <font-awesome-icon :icon="['fas', 'arrow-up-right-from-square']" class="text-md" /> _codewars
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.code-block {
  background-color: #011627;
  padding: 1rem;
  font-family: "FiraCode";
  border-radius: 0.5rem;
  font-family: "Fira Code";
  font-size: 0.95rem;
  line-height: 1.5;
  left: 0;
  border-left: none;
}
</style>
