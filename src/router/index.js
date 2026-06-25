import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Explore from "../views/Explore.vue";
import Experience from "../views/Experience.vue";
import Visit from "../views/Visit.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/kham-pha", name: "Explore", component: Explore },
  { path: "/trai-nghiem", name: "Experience", component: Experience },
  { path: "/tham-quan", name: "Visit", component: Visit },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
