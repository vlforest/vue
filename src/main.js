import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createI18n } from "vue-i18n";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/assets/css/admin.css";

import en from "./locales/en.json";
import vi from "./locales/vi.json";
import zh from "./locales/zh.json";

const i18n = createI18n({
  locale: "vi",
  legacy: false,
  messages: {
    en,
    vi,
    zh,
  },
});

const app = createApp(App);
app.use(i18n);
app.use(router);

// Sử dụng afterEach để cập nhật tiêu đề trang sau mỗi lần điều hướng
router.afterEach((to) => {
  const titleKey = to.meta.titleKey; // Lấy khóa tiêu đề từ meta
  if (titleKey) {
    document.title = i18n.global.t(titleKey); // Sử dụng i18n để lấy giá trị bản dịch
  } else {
    document.title = "RIKEN Việt Nam";
  }
});

app.mount("#app");
