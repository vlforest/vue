<template>
  <div class="admin-sidebar d-none d-lg-block shadow p-3 mb-5 bg-white rounded">
    <div class="sidebar-header">
      <h4 class="text-white">Menu</h4>
    </div>
    <ul class="nav nav-pills flex-column mb-auto sidebar-list">
      <li class="nav-item">
        <router-link class="nav-link link-dark" to="/admin/dashboard">
          🏠 Dashboard
        </router-link>
      </li>
      <li class="nav-item" @click="toggleExpand('products')">
        <span class="nav-link link-dark cursor-pointer">
          📦 Quản lý sản phẩm
          <i
            :class="{
              'bi-chevron-down': isExpanded('products'),
              'bi-chevron-right': !isExpanded('products'),
            }"
            class="bi ms-auto"
          ></i>
        </span>
        <ul v-if="isExpanded('products')" class="nav flex-column ms-3">
          <li class="nav-item">
            <router-link class="nav-link link-dark" to="/admin/products"
              >Sản Phẩm</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link link-dark"
              to="/admin/products/categories"
              >Danh mục sản phẩm</router-link
            >
          </li>
        </ul>
      </li>
      <li class="nav-item" @click="toggleExpand('orders')">
        <span class="nav-link link-dark cursor-pointer">
          🛒 Quản lý đơn hàng
          <i
            :class="{
              'bi-chevron-down': isExpanded('orders'),
              'bi-chevron-right': !isExpanded('orders'),
            }"
            class="bi ms-auto"
          ></i>
        </span>
        <ul v-if="isExpanded('orders')" class="nav flex-column ms-3">
          <li class="nav-item">
            <router-link class="nav-link link-dark" to="/admin/orders"
              >Tất cả đơn hàng</router-link
            >
          </li>
        </ul>
      </li>
      <li class="nav-item" @click="toggleExpand('customers')">
        <span class="nav-link link-dark cursor-pointer">
          👥 Quản lý khách hàng
          <i
            :class="{
              'bi-chevron-down': isExpanded('customers'),
              'bi-chevron-right': !isExpanded('customers'),
            }"
            class="bi ms-auto"
          ></i>
        </span>
        <ul v-if="isExpanded('customers')" class="nav flex-column ms-3">
          <li class="nav-item">
            <router-link class="nav-link link-dark" to="/admin/customers/all"
              >Tất cả khách hàng</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link link-dark" to="/admin/customers/add"
              >Thêm khách hàng mới</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link link-dark" to="/admin/customers/groups"
              >Nhóm khách hàng</router-link
            >
          </li>
        </ul>
      </li>
      <li class="nav-item" @click="toggleExpand('promotions')">
        <span class="nav-link link-dark cursor-pointer">
          🎉 Quản lý khuyến mãi
          <i
            :class="{
              'bi-chevron-down': isExpanded('promotions'),
              'bi-chevron-right': !isExpanded('promotions'),
            }"
            class="bi ms-auto"
          ></i>
        </span>
        <ul v-if="isExpanded('promotions')" class="nav flex-column ms-3">
          <li class="nav-item">
            <router-link class="nav-link link-dark" to="/admin/promotions/all"
              >Tất cả khuyến mãi</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link link-dark" to="/admin/promotions/add"
              >Thêm khuyến mãi mới</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link link-dark"
              to="/admin/promotions/coupons"
              >Mã giảm giá</router-link
            >
          </li>
        </ul>
      </li>
      <li class="nav-item" @click="toggleExpand('reports')">
        <span class="nav-link link-dark cursor-pointer">
          📊 Báo cáo
          <i
            :class="{
              'bi-chevron-down': isExpanded('reports'),
              'bi-chevron-right': !isExpanded('reports'),
            }"
            class="bi ms-auto"
          ></i>
        </span>
        <ul v-if="isExpanded('reports')" class="nav flex-column ms-3">
          <li class="nav-item">
            <router-link class="nav-link link-dark" to="/admin/reports/sales"
              >Báo cáo doanh số</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link link-dark" to="/admin/reports/products"
              >Báo cáo sản phẩm</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link link-dark"
              to="/admin/reports/customers"
              >Báo cáo khách hàng</router-link
            >
          </li>
        </ul>
      </li>
      <li class="nav-item">
        <router-link class="nav-link link-dark" to="/admin/settings">
          ⚙️ Cài đặt hệ thống
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AdminSidebar",
  data() {
    return {
      expandedSections: [],
    };
  },
  methods: {
    toggleExpand(section) {
      if (this.expandedSections.includes(section)) {
        this.expandedSections = this.expandedSections.filter(
          (s) => s !== section
        );
      } else {
        this.expandedSections.push(section);
      }
    },
    isExpanded(section) {
      return this.expandedSections.includes(section);
    },
  },
};
</script>

<style scoped>
.admin-sidebar {
  background-color: #28a745;
  color: #ffffff;
  margin-top: 10px; /* Cách Header một chút */
  border-radius: 10px; /* Bo tròn 4 góc */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Đổ bóng nhẹ nhàng */
  padding: 20px; /* Giữ nội dung Sidebar gọn gàng */
  max-height: 100vh; /* Giới hạn chiều cao tối đa */
  overflow-y: auto; /* Xuất hiện thanh cuộn dọc */
}

.sidebar-header {
  padding-bottom: 10px; /* Thêm khoảng cách dưới phần header */
}

.nav-link {
  color: #ffffff;
}

.nav-link.active {
  background-color: #218838;
  color: #fff;
}

/* Tùy chỉnh thanh cuộn để mảnh hơn và bo tròn */
::-webkit-scrollbar {
  width: 5px; /* Độ rộng của thanh cuộn */
}

::-webkit-scrollbar-thumb {
  background-color: #6c757d; /* Màu của thanh cuộn */
  border-radius: 10px; /* Bo tròn thanh cuộn */
}

::-webkit-scrollbar-track {
  background-color: #e9ecef; /* Màu nền của thanh cuộn */
  border-radius: 10px; /* Bo tròn nền thanh cuộn */
}

.cursor-pointer {
  cursor: pointer;
}
</style>
