import { createRouter, createWebHistory } from "vue-router";
import { useLoaderStore } from "@stores/loader";
const routes = [
  {
    path: "/",
    name: "Hello",
    component: () => import("@pages/HelloPage.vue"),
  },
  {
    path: "/about-me",
    name: "About",
    component: () => import("@pages/AboutMePage.vue"),
  },
  {
    path: "/projects",
    name: "Projects",
    component: () => import("@pages/ProjectsPage.vue"),
  },
  {
    path: "/contact-me",
    name: "Contact",
    component: () => import("@pages/ContactMePage.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach(() => {
  const loader = useLoaderStore();
  loader.start();
});

router.afterEach(() => {
  const loader = useLoaderStore();
  loader.stop();
});
