import { publicRoutes } from "./public";
import { authRoutes } from "./auth";
import { adminRoutes } from "./admin";
import NotFoundPage from "@/pages/NotFoundPage.vue";

const routes = [
  ...publicRoutes,
  ...authRoutes,
  ...adminRoutes,
  {
    path: "/:catchAll(.*)",
    component: NotFoundPage,
  },
];

export default routes;
