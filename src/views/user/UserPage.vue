<template>
  <div class="user-layout container-fluid">
    <HeaderUser class="header" />
    <div class="main-section d-flex">
      <SidebarUser class="sidebar flex-shrink-0 d-none d-md-block" />
      <main class="main-content flex-grow-1">
        <div class="container">
          <router-view />
          <!-- Hiển thị nội dung của các trang khác nhau -->
        </div>
      </main>
    </div>
    <FooterUser class="footer" />
  </div>
</template>

<script>
import HeaderUser from "@/components/user/HeaderUser.vue";
import SidebarUser from "@/components/user/SidebarUser.vue";
import FooterUser from "@/components/user/FooterUser.vue";

export default {
  name: "UserPage",
  components: {
    HeaderUser,
    SidebarUser,
    FooterUser,
  },
};
</script>

<style scoped>
.user-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-section {
  flex: 1;
  display: flex;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  overflow: auto;
}

.footer {
  background-color: #f8f9fa;
  padding: 10px 0;
}
.container-fluid {
  max-width: 1200px;
  margin: 0px auto;
  padding: 10px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

/* Điều chỉnh cho giao diện di động */
@media (max-width: 767px) {
  .sidebar {
    display: none; /* Ẩn sidebar trên màn hình nhỏ */
  }
}
</style>
