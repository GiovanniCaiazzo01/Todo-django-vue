import { createApp } from "vue";
import { router } from "./routes";
import { pinia } from "./plugins/pinia";
import ToastPlugin from "./plugins/toast";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

app.use(pinia).use(ToastPlugin).use(router).mount("#app");
