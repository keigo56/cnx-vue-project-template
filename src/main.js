import { createApp } from "vue";
import "./style.css";
import router from "./router/router.js";
import pinia from "./store/pinia.js";
import App from "./App.vue";
import { initializeAuth } from "./services/authService";
import { removeInterceptors, setupInterceptors } from "./api/api";

(async () => {
  const app = createApp(App);
  app.use(pinia);

  removeInterceptors();
  await initializeAuth();
  setupInterceptors();

  app.use(router);
  app.mount("#app");
})();
