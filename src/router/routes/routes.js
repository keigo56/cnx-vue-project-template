import { publicRoutes } from "./public";
import { authRoutes } from "./auth";
import { appRoutes } from "./app";
import NotFoundPage from "@/pages/NotFoundPage.vue";

const routes = [
  ...publicRoutes,
  ...authRoutes,
  ...appRoutes,
  {
    path: "/:catchAll(.*)",
    component: NotFoundPage,
  },
];

export default routes;
