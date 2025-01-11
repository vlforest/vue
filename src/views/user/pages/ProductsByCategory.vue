<template>
  <div class="products-by-category container">
    <h1 class="my-4">{{ categoryName }}</h1>
    <div class="row">
      <div
        v-for="product in products"
        :key="product.id"
        class="col-lg-4 col-md-6 mb-4"
      >
        <ProductCard :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";

export default {
  name: "ProductsByCategory",
  components: {
    ProductCard,
  },
  data() {
    return {
      categoryName: "",
      products: [],
    };
  },
  created() {
    const categoryId = this.$route.params.categoryId;
    const subcategoryId = this.$route.params.subcategoryId;
    this.fetchProductsByCategory(categoryId, subcategoryId);
  },
  watch: {
    "$route.params": {
      handler(newParams) {
        const categoryId = newParams.categoryId;
        const subcategoryId = newParams.subcategoryId;
        this.fetchProductsByCategory(categoryId, subcategoryId);
      },
      immediate: true,
    },
  },
  methods: {
    fetchProductsByCategory(categoryId, subcategoryId) {
      // Đây là một ví dụ giả định, bạn cần thay thế bằng mã thực tế để lấy dữ liệu từ API hoặc dữ liệu tĩnh
      const allProducts = [
        {
          id: 1,
          categoryId: 1,
          subcategoryId: 1,
          name: "Máy cưa công nghiệp",
          description: "Mô tả về máy cưa công nghiệp",
          price: "$100",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 2,
          categoryId: 1,
          subcategoryId: 2,
          name: "Máy bào mịn",
          description: "Mô tả về máy bào mịn",
          price: "$150",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 3,
          categoryId: 1,
          subcategoryId: 1,
          name: "Máy cắt gỗ",
          description: "Mô tả về máy cắt gỗ",
          price: "$120",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 4,
          categoryId: 1,
          subcategoryId: 2,
          name: "Máy khoan gỗ",
          description: "Mô tả về máy khoan gỗ",
          price: "$130",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 5,
          categoryId: 2,
          subcategoryId: 3,
          name: "Giấy nhám cao cấp",
          description: "Mô tả về giấy nhám cao cấp",
          price: "$200",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 6,
          categoryId: 2,
          subcategoryId: 3,
          name: "Giấy nhám chất lượng",
          description: "Mô tả về giấy nhám chất lượng",
          price: "$220",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 7,
          categoryId: 2,
          subcategoryId: 4,
          name: "Nhám tròn loại 1",
          description: "Mô tả về nhám tròn loại 1",
          price: "$180",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 8,
          categoryId: 2,
          subcategoryId: 4,
          name: "Nhám tròn loại 2",
          description: "Mô tả về nhám tròn loại 2",
          price: "$190",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 9,
          categoryId: 1,
          subcategoryId: 2,
          name: "Máy dán cạnh",
          description: "Mô tả về máy dán cạnh",
          price: "$140",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 10,
          categoryId: 1,
          subcategoryId: 1,
          name: "Máy ép gỗ",
          description: "Mô tả về máy ép gỗ",
          price: "$110",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 11,
          categoryId: 3,
          subcategoryId: 5,
          name: "Phụ kiện gỗ loại 1",
          description: "Mô tả về phụ kiện gỗ loại 1",
          price: "$200",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 12,
          categoryId: 3,
          subcategoryId: 5,
          name: "Phụ kiện gỗ loại 2",
          description: "Mô tả về phụ kiện gỗ loại 2",
          price: "$220",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 13,
          categoryId: 3,
          subcategoryId: 6,
          name: "Phụ kiện gỗ loại 3",
          description: "Mô tả về phụ kiện gỗ loại 3",
          price: "$230",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 14,
          categoryId: 3,
          subcategoryId: 6,
          name: "Phụ kiện gỗ loại 4",
          description: "Mô tả về phụ kiện gỗ loại 4",
          price: "$240",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 15,
          categoryId: 3,
          subcategoryId: 5,
          name: "Phụ kiện gỗ loại 5",
          description: "Mô tả về phụ kiện gỗ loại 5",
          price: "$250",
          image: "https://via.placeholder.com/150",
        },
      ];

      this.products = allProducts.filter(
        (product) =>
          product.categoryId == categoryId &&
          product.subcategoryId == subcategoryId
      );

      const categories = [
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
      ];

      const category = categories.find((cat) => cat.id == categoryId);
      const subcategory = category
        ? category.subcategories.find((sub) => sub.id == subcategoryId)
        : null;
      this.categoryName = subcategory
        ? `${category.name} - ${subcategory.name}`
        : "Unknown Category";
    },
  },
};
</script>

<style scoped>
.products-by-category {
  padding: 20px;
}
@media (max-width: 767px) {
  .product-by-category {
    padding: 10px;
  }
  .product-content {
    padding: 10px 0;
  }
}
</style>
