import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import ExploreHome from "../views/ExploreHome.vue";
import ArtifactExplore from "../views/ArtifactExplore.vue";
import StoryExplore from "../views/StoryExplore.vue";
import StoryDetail from "../views/StoryDetail.vue";
import ExperienceHome from "../views/ExperienceHome.vue";
import ExperienceGenZ from "../views/ExperienceGenZ.vue";
import ExperiencePuzzle from "../views/ExperiencePuzzle.vue";
import ExperienceCharacters from "../views/ExperienceCharacters.vue";
import Visit from "../views/Visit.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/kham-pha",
    name: "ExploreHome",
    component: ExploreHome,
  },
  {
    path: "/kham-pha/hien-vat",
    name: "ArtifactExplore",
    component: ArtifactExplore,
  },
  {
    path: "/kham-pha/ky-uc",
    name: "StoryExplore",
    component: StoryExplore,
  },
  {
    path: "/kham-pha/ky-uc/:id",
    name: "StoryDetail",
    component: StoryDetail,
  },
  {
    path: "/trai-nghiem",
    name: "ExperienceHome",
    component: ExperienceHome,
  },
  {
    path: "/trai-nghiem/genz",
    name: "ExperienceGenZ",
    component: ExperienceGenZ,
  },
  {
    path: "/trai-nghiem/puzzle",
    name: "ExperiencePuzzle",
    component: ExperiencePuzzle,
  },
  {
    path: "/trai-nghiem/nhan-vat",
    name: "ExperienceCharacters",
    component: ExperienceCharacters,
  },
  { path: "/tham-quan", name: "Visit", component: Visit },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
