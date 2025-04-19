import routes from "@/router/routes/routes.js";
import { createRouter, createWebHistory } from "vue-router";
import MiddlewareResolver from "@/router/MiddlewareResolver";

const router = createRouter({
  history: createWebHistory(), // use html5 history mode
  routes, // short for `routes: routes`
});

/*
 * This function runs on every before route traversal
 * */
router.beforeEach(async (to, from, next) => {
  let middlewareEntries = to.meta.middleware || [];

  // prettier-ignore
  let nextPath = await MiddlewareResolver
      .withContext(to, from)
      .withEntries(middlewareEntries)
      .resolve();

  return next(nextPath);
});

export default router;
