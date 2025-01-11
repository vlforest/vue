<template>
  <div v-if="category">
    <h1>{{ category.name }}</h1>
    <p>{{ category.description }}</p>
    <img
      :src="category.image || 'https://via.placeholder.com/300x200'"
      alt="Category Image"
    />
    <h2>{{ $t("categories.learnMore") }}</h2>
    <ul>
      <li v-for="subcategory in category.subcategories" :key="subcategory.id">
        {{ subcategory.name }}
      </li>
    </ul>
    <h2>{{ $t("categories.title") }}</h2>
    <div class="featured-products">
      <div
        v-for="product in featuredProducts"
        :key="product.id"
        class="product-card"
      >
        <img
          :src="product.image || 'https://via.placeholder.com/150x150'"
          alt="Product Image"
        />
        <p>{{ product.name }}</p>
        <p>{{ product.description }}</p>
      </div>
    </div>
  </div>
  <div v-else>
    <p>{{ $t("categories.notFound") }}</p>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";

export default {
  name: "CategoryDetails",
  props: {
    categoryId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const category = ref(null);
    const featuredProducts = ref([]);

    const loadCategoryData = () => {
      const categories = [
        {
          id: 1,
          name: "Máy móc phục vụ ngành gỗ",
          description: "Mô tả về máy móc ngành gỗ",
          image: "",
          subcategories: [
            { id: 1, name: "Máy cưa" },
            { id: 2, name: "Máy bào" },
          ],
        },
        {
          id: 2,
          name: "Nhám",
          description: "Mô tả về giấy nhám",
          image: "",
          subcategories: [
            { id: 3, name: "Giấy nhám" },
            { id: 4, name: "Nhám tròn" },
          ],
        },
        {
          id: 3,
          name: "Các phụ kiện khác",
          description: "Mô tả về các phụ kiện khác",
          image: "",
          subcategories: [
            { id: 5, name: "Phụ kiện 1" },
            { id: 6, name: "Phụ kiện 2" },
          ],
        },
      ];

      const products = [
        {
          id: 1,
          name: "Máy cưa công nghiệp",
          description: "Mô tả về máy cưa công nghiệp",
          image: "",
          categoryId: 1,
        },
        {
          id: 2,
          name: "Giấy nhám cao cấp",
          description: "Mô tả về giấy nhám cao cấp",
          image: "",
          categoryId: 2,
        },
        {
          id: 3,
          name: "Phụ kiện gỗ 1",
          description: "Mô tả về phụ kiện gỗ 1",
          image: "",
          categoryId: 3,
        },
      ];

      category.value = categories.find((cat) => cat.id === props.categoryId);
      featuredProducts.value = products.filter(
        (product) => product.categoryId === props.categoryId
      );
    };

    onMounted(() => {
      loadCategoryData();
    });

    watch(
      () => props.categoryId,
      () => {
        loadCategoryData();
      }
    );

    return {
      category,
      featuredProducts,
    };
  },
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.featured-products {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.featured-products img {
  max-width: 100%;
  height: auto;
}
</style>
