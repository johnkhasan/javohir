import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import { router } from "./router";
import App from "./App.vue";
import * as lucide from "lucide-vue-next";


const app = createApp(App);
const pinia = createPinia();
// for global using of Lucide Icons
for (const [key, component] of Object.entries(lucide)) {
  app.component(key, component);
}

app.use(pinia);
app.use(router);
app.mount("#app");
