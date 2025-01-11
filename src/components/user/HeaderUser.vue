<template>
  <header class="header">
    <nav
      class="navbar navbar-expand-lg navbar-light d-flex align-items-center justify-content-between"
      style="background-color: white; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)"
    >
      <div class="d-flex align-items-center">
        <router-link class="navbar-brand d-flex align-items-center" to="/">
          <img src="@/assets/images/logo.jpg" alt="Logo" class="logo" />
          <div class="company-info ms-3 text-dark">
            <h1 class="company-name">{{ $t("companyName") }}</h1>
            <p class="company-description">{{ $t("companyDescription") }}</p>
          </div>
        </router-link>
      </div>
    </nav>
    <nav
      class="navbar navbar-expand-lg navbar-light mt-2"
      style="
        background: linear-gradient(135deg, #1ed76d 0%, #80ffd4 100%);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      "
    >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav w-100 justify-content-center">
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/">{{
              $t("menu.home")
            }}</router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle text-white"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ $t("menu.categories") }}
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item" to="/category/1">{{
                  "Máy móc phục vụ ngành gỗ"
                }}</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/category/2">{{
                  "Nhám"
                }}</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/category/3">{{
                  "Các phụ kiện khác"
                }}</router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/about">{{
              $t("menu.about")
            }}</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/contact">{{
              $t("menu.contact")
            }}</router-link>
          </li>
          <li class="nav-item ms-auto d-flex align-items-center">
            <select
              v-model="$i18n.locale"
              class="form-select form-select-sm language-selector"
              aria-label="Language selector"
              @change="saveLanguage($i18n.locale)"
              style="margin-right: 10px"
            >
              <option value="en">English</option>
              <option value="vi">Tiếng Việt</option>
              <option value="zh">中文</option>
            </select>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "HeaderUser",
  methods: {
    saveLanguage(locale) {
      localStorage.setItem("preferredLanguage", locale);
    },
  },
  mounted() {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) {
      this.$i18n.locale = savedLanguage;
    }
  },
};
</script>

<style scoped>
.header {
  color: #1e6d4f;
}
.logo {
  height: 100px; /* Kích thước lớn hơn cho logo */
  margin-right: 10px;
}
.company-info {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
}
.company-name {
  margin: 0;
  font-size: 1.2rem; /* Điều chỉnh kích thước chữ */
}
.company-description {
  font-size: 1rem; /* Kích thước chữ cho mô tả công ty */
  margin-top: 5px;
}
.navbar-light .navbar-nav .nav-link {
  font-size: 1.1rem; /* Tăng kích thước phông chữ */
  padding: 10px 15px; /* Tăng khoảng cách cho sự rõ ràng */
  transition: background-color 0.3s, color 0.3s; /* Hiệu ứng mượt mà */
}
.navbar-light .navbar-nav .nav-link:hover,
.navbar-light .navbar-nav .nav-link.active {
  background-color: #ffc107 !important; /* Màu nền khi hover */
  color: #000000 !important; /* Màu chữ khi hover */
}
.dropdown-menu {
  background-color: #ffffff; /* Màu nền trắng cho dropdown */
  color: #000000; /* Màu chữ đen cho dropdown */
  border: 1px solid #6c757d; /* Viền nổi bật cho dropdown */
}
.dropdown-item:hover,
.dropdown-item.active {
  background-color: #ffc107; /* Màu nền khi hover cho dropdown item */
  color: #000000; /* Màu chữ khi hover cho dropdown item */
}
.language-selector {
  background-color: #1ed76d;
  color: white;
  border: 1px solid #1e6d4f;
}
</style>
