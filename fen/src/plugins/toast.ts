import type { App } from "vue";
import Toast, { type PluginOptions, POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

export default {
  install(app: App) {
    const options: PluginOptions = {
      position: POSITION.BOTTOM_RIGHT,
      timeout: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      hideProgressBar: false,
    };
    app.use(Toast, options);
  },
};
