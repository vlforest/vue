<template>
  <aside class="sidebar">
    <div class="sidebar-title">
      <h2>{{ $t("sidebar.title") }}</h2>
    </div>
    <div v-for="category in categories" :key="category.id" class="card mb-3">
      <div class="card-header bg-gradient">
        <h5 class="mb-0">{{ category.name }}</h5>
      </div>
      <div class="card-body" v-if="category.subcategories.length">
        <ul class="list-group list-group-flush">
          <li
            v-for="subcategory in category.subcategories"
            :key="subcategory.id"
            class="list-group-item"
          >
            <router-link
              :to="`/categories/${category.id}/${subcategory.id}`"
              class="text-decoration-none"
            >
              {{ subcategory.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: "SidebarUser",
  data() {
    return {
      categories: [
        {
          id: 1,
          name: "Máy móc phục vụ ngành gỗ",
          subcategories: [
            { id: 1, name: "Máy cưa" },
            { id: 2, name: "Máy bào" },
          ],
        },
        {
          id: 2,
          name: "Nhám",
          subcategories: [
            { id: 3, name: "Giấy nhám" },
            { id: 4, name: "Nhám tròn" },
          ],
        },
        {
          id: 3,
          name: "Các phụ kiện khác",
          subcategories: [
            { id: 5, name: "Phụ kiện 1" },
            { id: 6, name: "Phụ kiện 2" },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.sidebar {
  background-color: rgb(252, 246, 246);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  min-height: 100vh; /* Đặt chiều cao tối thiểu */
  padding: 15px;
  margin: 10px;
  border-radius: 10px;
  width: 300px; /* Mở rộng chiều rộng */
}
.sidebar-title {
  margin-bottom: 20px;
  text-align: center;
}
.sidebar-title h2 {
  color: #1e6d4f;
}
.card {
  border: none; /* Loại bỏ viền của card */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Hiệu ứng nổi khối */
  margin-bottom: 15px;
}
.card-header {
  background: linear-gradient(
    135deg,
    #1ed76d 0%,
    #80ffd4 100%
  ); /* Hiệu ứng chuyển màu */
  color: #022c22;
  padding: 10px;
}
.card-body {
  padding: 0; /* Loại bỏ padding của card body */
}
.list-group-item {
  padding: 10px;
  border: none; /* Loại bỏ viền của list group item */
}
.list-group-item a {
  color: #1e6d4f;
  text-decoration: none;
  transition: color 0.3s, background-color 0.3s;
}
.list-group-item a:hover {
  color: white;
  background-color: #1e6d4f;
  border-radius: 4px;
  padding: 8px;
}

/* Điều chỉnh cho giao diện di động */
@media (max-width: 767px) {
  .sidebar {
    width: 100%; /* Đặt chiều rộng 100% cho thiết bị di động */
    padding: 10px; /* Giảm padding */
    margin: 0; /* Loại bỏ margin */
  }
  .card {
    margin-bottom: 10px; /* Giảm margin giữa các card */
  }
  .list-group-item a {
    display: block; /* Đặt thành block để dễ đọc hơn trên thiết bị di động */
    padding: 10px 15px; /* Tăng padding cho liên kết */
  }
}
</style>
