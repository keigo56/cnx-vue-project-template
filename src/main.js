import { createApp } from "vue";
import "./style.css";
import router from "./router/router.js";
import pinia from "./store/pinia.js";
import App from "./App.vue";
import { authService } from "./services/authService";

(async () => {
  const app = createApp(App);
  app.use(pinia);

  await authService.initialize();

  app.use(router);
  app.mount("#app");
})();
