import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import { router } from "./router";
import App from "./App.vue";
import * as lucide from "lucide-vue-next";

// font awesome library
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTelegram, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
library.add(faTelegram, faGithub, faLinkedin, faBars, faXmark);

const app = createApp(App);
const pinia = createPinia();
app.component("font-awesome-icon", FontAwesomeIcon);

// for global using of Lucide Icons
for (const [key, component] of Object.entries(lucide)) {
  app.component(key, component);
}

app.use(pinia);
app.use(router);
app.mount("#app");
