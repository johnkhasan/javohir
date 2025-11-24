<script setup>
// GMAIL
const gmail = 'javokhirjonkhasanov@gmail.com'
const phoneNumber = 998972002466

import { ref, onMounted,onUpdated, watch, nextTick, computed, reactive } from "vue";
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
  formattedCode
})
const sendMessage = () => {
  alert("hi bro");
};
console.log(formattedCode);
</script>
<template>
  <table class="border-line text-secondary-100 w-full">
    <tbody>
      <tr class="border-line border border-t-0">
        <td class="border-line w-[15%] border border-y-0 hover:cursor-pointer hover:text-white">
          <font-awesome-icon :icon="['fas', 'caret-down']" class="text-2xl" /> contacts
        </td>
        <td class="border-line border border-t-0 px-3 hover:cursor-pointer hover:text-white">
          contacts
          <font-awesome-icon :icon="['fas', 'xmark']" class="text-sm" />
        </td>
      </tr>
      <tr class="border-line border">
        <td>
          <a
            :href="`mailto:${gmail} ?subject=Hello%20Javohir&body=Salom%2C%0AQuyida%20savolim%20bor...`"
          >
            <font-awesome-icon :icon="['fas', 'envelope']" class="text-sm" />
            gmail
          </a>
          <br />
          <font-awesome-icon :icon="['fas', 'phone']" class="text-sm" />
          <a :href="`tel:+${phoneNumber}`">phone-number</a>
        </td>
        <td>
          <tr class="h-screen">
            <td class="border-line border border-y-0">
              <div class="mx-auto mt-10 max-w-md rounded-lg p-6 shadow-md">
                <form class="space-y-4">
                  <!-- Name Field -->
                  <div>
                    <label for="name" class="block text-sm font-medium">_name</label>
                    <input
                      type="text"
                      id="name"
                      v-model="message.name"
                      placeholder="Your Name"
                      class="border-line bg-primary-300 focus:border-secondary-100 mt-1 block w-full rounded-md border px-4 py-2 text-sm outline-none focus:ring-blue-400"
                    />
                  </div>

                  <!-- Email Field -->
                  <div>
                    <label for="email" class="block text-sm font-medium">_email</label>
                    <input
                      v-model="message.email"
                      type="email"
                      id="email"
                      placeholder="you@example.com"
                      class="border-line bg-primary-300 focus:border-secondary-100 mt-1 block w-full rounded-md border px-4 py-2 outline-none focus:ring-blue-400"
                    />
                  </div>

                  <!-- Message Field -->
                  <div>
                    <label for="message" class="block text-sm font-medium">_message</label>
                    <textarea
                      id="message"
                      rows="4"
                      v-model="message.message"
                      placeholder="Write your message..."
                      class="border-line bg-primary-300 focus:border-secondary-100 mt-1 block w-full resize-none rounded-md border px-4 py-2 outline-none focus:ring-blue-400 sm:text-sm"
                    ></textarea>
                  </div>

                  <!-- Button Group -->
                  <div class="mt-4">
                    <button
                      @click.prevent="sendMessage"
                      class="bg-secondary-150 focus:outline-secondary-100 focus:ring-secondary-100 focus-visible:ring-secondary-100 rounded-md border-0 border-none px-4 py-1 text-white outline-none hover:bg-gray-600 focus:outline-none focus-visible:ring-2 active:border-none"
                    >
                      submit-message
                    </button>
                  </div>
                </form>
              </div>
            </td>
            <td>
              <pre class="code-block line-numbers bg-gray-200 pl-12">
<code ref="codeBlock" class="language-javascript">{{ code }}</code>
</pre>
            </td>
          </tr>
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
