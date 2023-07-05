import { hasPermission } from "@/composable/checkPermission.js";

export function checkHasPermission(to, from, next) {
  if (hasPermission(to.meta.middleware)) {
    next();
  } else {
    next({
      path: "/",
    });
  }
}
