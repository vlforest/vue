<template>
  <header class="navbar navbar-expand-lg admin-header">
    <div class="container-fluid">
      <div class="row w-100 align-items-center">
        <!-- Phần giao diện điện thoại -->
        <div class="col-5 d-flex justify-content-start d-lg-none">
          <button
            class="navbar-toggler"
            @click="toggleCollapse('sidebarContent')"
            type="button"
            aria-controls="sidebarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="bi bi-list"></i>
          </button>
        </div>
        <div class="col-2 d-flex justify-content-center d-lg-none">
          <a class="navbar-brand" href="/">
            <img src="@/assets/images/logo.jpg" alt="Logo" class="logo" />
          </a>
        </div>
        <div class="col-5 d-flex justify-content-end d-lg-none">
          <button
            class="navbar-toggler"
            @click="toggleCollapse('userMenuContent')"
            type="button"
            aria-controls="userMenuContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="bi bi-person-circle"></i>
          </button>
        </div>

        <!-- Phần giao diện máy tính -->
        <div class="d-none d-lg-flex col-lg-6 align-items-center">
          <a class="navbar-brand" href="/">
            <img src="@/assets/images/logo.jpg" alt="Logo" class="logo" />
            <span class="company-name">Công ty TNHH Riken Việt Nam</span>
          </a>
        </div>
        <div
          class="d-none d-lg-flex col-lg-6 align-items-center justify-content-end"
        >
          <form class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Tìm kiếm"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              <i class="bi bi-search"></i>
            </button>
          </form>
          <ul class="navbar-nav ms-3">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="userMenuDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="bi bi-person-circle"></i> Tài khoản
              </a>
              <ul
                class="dropdown-menu dropdown-menu-end"
                aria-labelledby="userMenuDropdown"
              >
                <li>
                  <a class="dropdown-item" href="#"
                    ><i class="bi bi-bell"></i> Thông báo</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="#"
                    ><i class="bi bi-person"></i> Hồ sơ cá nhân</a
                  >
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item" href="#"
                    ><i class="bi bi-box-arrow-right"></i> Đăng xuất</a
                  >
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
  <!-- Sidebar cho điện thoại -->
  <div class="collapse" id="sidebarContent">
    <ul class="list-group">
      <li class="list-group-item">
        <a class="nav-link" href="/admin/dashboard">🏠 Dashboard</a>
      </li>
      <li class="list-group-item">
        <a class="nav-link" href="/admin/products">📦 Quản lý sản phẩm</a>
      </li>
      <li class="list-group-item">
        <a class="nav-link" href="/admin/orders">🛒 Quản lý đơn hàng</a>
      </li>
      <li class="list-group-item">
        <a class="nav-link" href="/admin/customers">👥 Quản lý khách hàng</a>
      </li>
      <li class="list-group-item">
        <a class="nav-link" href="/admin/promotions">🎉 Quản lý khuyến mãi</a>
      </li>
      <li class="list-group-item">
        <a class="nav-link" href="/admin/reports">📊 Báo cáo</a>
      </li>
      <li class="list-group-item">
        <a class="nav-link" href="/admin/settings">⚙️ Cài đặt hệ thống</a>
      </li>
    </ul>
  </div>
  <!-- Nút người dùng cho điện thoại -->
  <div class="collapse" id="userMenuContent">
    <ul class="list-group">
      <li class="list-group-item">
        <a class="nav-link" href="#"><i class="bi bi-bell"></i> Thông báo</a>
      </li>
      <li class="list-group-item">
        <a class="nav-link" href="#"
          ><i class="bi bi-person"></i> Hồ sơ cá nhân</a
        >
      </li>
      <li class="list-group-item">
        <a class="nav-link" href="#"
          ><i class="bi bi-box-arrow-right"></i> Đăng xuất</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { Collapse } from "bootstrap";

export default {
  name: "AdminHeader",
  data() {
    return {
      sidebarCollapse: null,
      userMenuCollapse: null,
    };
  },
  mounted() {
    this.sidebarCollapse = new Collapse(
      document.getElementById("sidebarContent"),
      { toggle: false }
    );
    this.userMenuCollapse = new Collapse(
      document.getElementById("userMenuContent"),
      { toggle: false }
    );
    document.addEventListener("click", this.handleOutsideClick);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
  },
  methods: {
    handleOutsideClick(event) {
      const sidebarContent = document.getElementById("sidebarContent");
      const userMenuContent = document.getElementById("userMenuContent");
      const navbarContent = document.querySelector(".navbar-collapse");

      const isClickInsideSidebar = sidebarContent?.contains(event.target);
      const isClickInsideUserMenu = userMenuContent?.contains(event.target);
      const isClickInsideNavbar = navbarContent?.contains(event.target);

      if (
        !isClickInsideSidebar &&
        !isClickInsideUserMenu &&
        !isClickInsideNavbar
      ) {
        this.sidebarCollapse.hide();
        this.userMenuCollapse.hide();
      }
    },
    toggleCollapse(target) {
      const element = document.getElementById(target);
      const collapse = new Collapse(element, { toggle: false });

      if (element.classList.contains("show")) {
        collapse.hide();
      } else {
        collapse.show();
      }
    },
  },
};
</script>

<style scoped>
.logo {
  height: 60px;
}
.container-fluid {
  padding: 0;
}

.company-name {
  font-size: 18px;
  font-weight: bold;
  color: #28a745;
}

.admin-header {
  background-color: #ffffff;
  border-bottom: 2px solid #28a745;
  padding: 0;
  margin: 0;
}

.btn-outline-success {
  transition: background-color 0.3s, color 0.3s; /* Hiệu ứng mềm hơn khi bấm nút */
}

.btn-outline-success:hover {
  background-color: #28a745;
  color: #fff;
}

.collapse {
  transition: height 0.3s ease, visibility 0.3s ease; /* Hiệu ứng mềm hơn khi ẩn/hiện toggle */
}

button {
  background-color: #fff;
  color: #28a745;
  height: 35px;
  width: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
}

button:hover,
button:focus,
button:active {
  background-color: #28a745;
  color: #fff;
}

@media (min-width: 992px) {
  .navbar-toggler {
    display: none;
  }

  .navbar-brand {
    margin-left: 0;
  }

  .navbar-nav {
    margin-left: 0;
  }

  .logo {
    height: 100px;
  }
}
</style>
