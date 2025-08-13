import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "./routes";
import ToastPlugin from "./plugins/toast";
import App from "./App.vue";
import "./style.css";

const pinia = createPinia();
const app = createApp(App);

app.use(router).use(pinia).use(ToastPlugin).mount("#app");
