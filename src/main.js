import { createApp } from "vue";
import "./style.css";
import router from "./routes/router.js";
import pinia from "./store/pinia.js";
import App from "./App.vue";

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");
