import routes from "@/routes/routes.js";
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/store/auth/userStore.js";

export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  await userStore.getUser();
  next();
});

export default router;
