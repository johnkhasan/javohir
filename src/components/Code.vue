<script setup>
import { ref, onMounted, watch } from "vue";
// PRISM JS
import Prism from "prismjs";
import "prismjs/components/prism-javascript.js";

// Theme va line numbers CSS
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";

const gmail = "javokhirjonkhasanov.com";
const phoneNumber = "998972002466";
const name = ref("");
const email = ref("");
const message = ref("");

const code = ref(
  `import { reactive } from 'vue'

const message = reactive({
  name: 'Javohir Hasanov',
  email: '',
  message: '',
  date: new Date().toDateString()
})

const sendMessage = () => {
  //
  //
}
`
);

const codeBlock = ref(null);
const highlightCode = () => {
  if (codeBlock.value) Prism.highlightElement(codeBlock.value);
};
onMounted(() => {
  highlightCode();
});
</script>
<template>
  <td class="">
    <pre class="code-block line-numbers bg-gray-200 pl-12">
<code ref="codeBlock" class="language-javascript">{{ code }}</code>
</pre>
  </td>
</template>

<style scoped>
/* === BACKGROUND === */
code[class*="language-"],
pre[class*="language-"] {
  color: #cdd6f4;
  background: #0a0f1a; /* qora-ko‘k fon — rasmga juda yaqin */
  font-family: "Fira Code", Consolas, monospace;
  font-size: 15px;
  border-radius: 8px;
  line-height: 1.55;
}

/* Container */
pre[class*="language-"] {
  padding: 1.3em;
  overflow: auto;
}

/* === RASM BO‘YICHA RANGLAR === */

/* const, let, function, return, class */
.token.keyword {
  color: #b68cff; /* binafsha (rasmdagisi) */
}

/* Object key: name, email, message */
.token.property {
  color: #f91717; /* ko‘k (rasmdagi property rang) */
}

/* Strings */
.token.string {
  color: #ffc777; /* to‘q-sariq (rasmdagidek) */
}

/* Functions */
.token.function {
  color: #b68cff; /* xuddi rasmda binafsha */
}

/* Operators = => + - */
.token.operator {
  color: #c8d3f5;
}

/* Brackets, commas, colons */
.token.punctuation {
  color: #506070;
}

/* Comments */
.token.comment {
  color: #48566e;
  font-style: italic;
}

/* Numbers */
.token.number {
  color: #ff9cac;
}

/* Booleans / null */
.token.constant,
.token.boolean {
  color: #ff9cac;
}

/* Prism.js tomonidan qo‘shilgan token classlari */
.code-block .token.keyword {
  color: #ff7b72;
}
.code-block .token.string {
  color: #a5d6ff;
}
.code-block .token.comment {
  color: #6a9955;
  font-style: italic;
}
</style>
