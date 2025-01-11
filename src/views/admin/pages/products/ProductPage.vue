<template>
  <div class="product-page">
    <h1>Quản lý sản phẩm</h1>

    <!-- Nút mở modal tạo sản phẩm mới -->
    <button class="btn btn-primary mb-3" @click="showProductModal = true">
      Tạo sản phẩm mới
    </button>

    <!-- Modal tạo sản phẩm mới -->
    <div v-if="showProductModal" class="modal-backdrop">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="h5 mb-0">Tạo sản phẩm mới</h2>
          <button
            type="button"
            class="btn-close"
            @click="showProductModal = false"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createProduct">
            <div class="row mb-3">
              <div class="col">
                <label for="productName" class="form-label">Tên sản phẩm</label>
                <input
                  type="text"
                  class="form-control"
                  id="productName"
                  v-model="newProduct.name"
                  required
                />
              </div>
              <div class="col">
                <label for="productCategory" class="form-label">Danh mục</label>
                <select
                  class="form-control"
                  id="productCategory"
                  v-model="newProduct.subcategoryId"
                  required
                >
                  <option value="" disabled selected>Chọn danh mục</option>
                  <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col">
                <label for="productImage" class="form-label"
                  >Hình ảnh chính</label
                >
                <input
                  type="file"
                  class="form-control"
                  id="productImage"
                  @change="handleImageUpload"
                  required
                />
              </div>
              <div class="col">
                <label for="productThumbnail" class="form-label"
                  >Thumnail hình ảnh</label
                >
                <img
                  :src="newProduct.image"
                  alt="Product Thumbnail"
                  class="img-thumbnail"
                  width="100"
                  v-if="newProduct.image"
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="productDescription" class="form-label">Mô tả</label>
              <textarea
                class="form-control"
                id="productDescription"
                v-model="newProduct.description"
                required
              ></textarea>
            </div>
            <div class="row mb-3">
              <div class="col">
                <label for="productQuantity" class="form-label">Số lượng</label>
                <input
                  type="number"
                  class="form-control"
                  id="productQuantity"
                  v-model="newProduct.quantity"
                  required
                />
              </div>
              <div class="col">
                <label for="productPrice" class="form-label">Giá</label>
                <input
                  type="number"
                  class="form-control"
                  id="productPrice"
                  v-model="newProduct.price"
                  required
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="additionalImages" class="form-label"
                >Hình ảnh bổ sung</label
              >
              <input
                type="file"
                class="form-control"
                id="additionalImages"
                @change="handleAdditionalImagesUpload"
                multiple
              />
              <div class="mt-2" v-if="newProduct.additionalImages.length">
                <div
                  v-for="(image, index) in newProduct.additionalImages"
                  :key="index"
                  class="d-inline-block me-2"
                >
                  <img
                    :src="image"
                    alt="Additional Image"
                    class="img-thumbnail"
                    width="100"
                  />
                </div>
              </div>
            </div>
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <button type="submit" class="btn btn-primary">
              <i class="bi bi-save"></i> Tạo
            </button>
          </form>
        </div>
      </div>
    </div>
    <!-- Modal sửa sản phẩm -->
    <div v-if="showEditModal" class="modal-backdrop">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="h5 mb-0">Sửa sản phẩm</h2>
          <button
            type="button"
            class="btn-close"
            @click="showEditModal = false"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveEditedProduct">
            <div class="row mb-3">
              <div class="col">
                <label for="editProductName" class="form-label"
                  >Tên sản phẩm</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="editProductName"
                  v-model="editableProduct.name"
                  required
                />
              </div>
              <div class="col">
                <label for="editProductCategory" class="form-label"
                  >Danh mục</label
                >
                <select
                  class="form-control"
                  id="editProductCategory"
                  v-model="editableProduct.subcategoryId"
                  required
                >
                  <option value="" disabled selected>Chọn danh mục</option>
                  <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col">
                <label for="editProductImage" class="form-label"
                  >Hình ảnh chính</label
                >
                <input
                  type="file"
                  class="form-control"
                  id="editProductImage"
                  @change="handleEditImageUpload"
                />
              </div>
              <div class="col">
                <label for="editProductThumbnail" class="form-label"
                  >Thumnail hình ảnh</label
                >
                <img
                  :src="editableProduct.image"
                  alt="Product Thumbnail"
                  class="img-thumbnail"
                  width="100"
                  v-if="editableProduct.image"
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="editProductDescription" class="form-label"
                >Mô tả</label
              >
              <textarea
                class="form-control"
                id="editProductDescription"
                v-model="editableProduct.description"
                required
              ></textarea>
            </div>
            <div class="row mb-3">
              <div class="col">
                <label for="editProductQuantity" class="form-label"
                  >Số lượng</label
                >
                <input
                  type="number"
                  class="form-control"
                  id="editProductQuantity"
                  v-model="editableProduct.quantity"
                  required
                />
              </div>
              <div class="col">
                <label for="editProductPrice" class="form-label">Giá</label>
                <input
                  type="number"
                  class="form-control"
                  id="editProductPrice"
                  v-model="editableProduct.price"
                  required
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="editAdditionalImages" class="form-label"
                >Hình ảnh bổ sung</label
              >
              <input
                type="file"
                class="form-control"
                id="editAdditionalImages"
                @change="handleEditAdditionalImagesUpload"
                multiple
              />
              <div class="mt-2" v-if="editableProduct.additionalImages.length">
                <div
                  v-for="(image, index) in editableProduct.additionalImages"
                  :key="index"
                  class="d-inline-block me-2"
                >
                  <img
                    :src="image"
                    alt="Additional Image"
                    class="img-thumbnail"
                    width="100"
                  />
                </div>
              </div>
            </div>
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <button type="submit" class="btn btn-primary">
              <i class="bi bi-save"></i> Lưu
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Phần danh sách sản phẩm có sẵn -->
    <div class="product-list card">
      <div class="card-header"><h2 class="h5 mb-0">Danh sách sản phẩm</h2></div>
      <div class="card-body">
        <ul class="list-group">
          <li
            v-for="product in products"
            :key="product.id"
            class="list-group-item"
          >
            <div
              class="product-item d-flex justify-content-between align-items-center"
            >
              <div class="product-info d-flex">
                <div class="product-image">
                  <img
                    :src="product.image"
                    alt="Product Image"
                    class="img-thumbnail"
                    width="100"
                  />
                </div>
                <div class="product-details ms-3">
                  <ul class="list-unstyled">
                    <li><strong>ID:</strong> {{ product.id }}</li>
                    <li><strong>Tên:</strong> {{ product.name }}</li>
                    <li>
                      <strong>Danh mục con:</strong>
                      {{ getCategoryName(product.subcategoryId) }}
                    </li>
                    <li><strong>Mô tả:</strong> {{ product.description }}</li>
                    <li><strong>Số lượng:</strong> {{ product.quantity }}</li>
                    <li><strong>Giá:</strong> {{ product.price }}</li>
                  </ul>
                  <div class="additional-images">
                    <strong>Hình ảnh bổ sung:</strong>
                    <div v-if="product.additionalImages.length">
                      <div
                        v-for="(image, index) in product.additionalImages"
                        :key="index"
                        class="d-inline-block me-2"
                      >
                        <img
                          :src="image"
                          alt="Additional Image"
                          class="img-thumbnail"
                          width="100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="product-actions">
                <button
                  class="btn btn-warning btn-sm me-2"
                  @click="editProduct(product)"
                >
                  <i class="bi bi-pencil-square"></i> Sửa
                </button>
                <button
                  class="btn btn-danger btn-sm"
                  @click="deleteProduct(product.id)"
                >
                  <i class="bi bi-trash"></i> Xóa
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ProductPage",
  data() {
    return {
      newProduct: {
        name: "",
        description: "",
        image: "",
        additionalImages: [],
        subcategoryId: "",
        quantity: "",
        price: "",
      },
      showProductModal: false,
      showEditModal: false,
      editableProduct: null,
      error: "",
      categories: [
        { id: 1, name: "Danh mục con 1" },
        { id: 2, name: "Danh mục con 2" },
      ],
      products: [
        {
          id: 1,
          name: "Sản phẩm 1",
          description: "Mô tả sản phẩm 1",
          image: "https://via.placeholder.com/100",
          additionalImages: [
            "https://via.placeholder.com/100",
            "https://via.placeholder.com/100",
          ],
          subcategoryId: 1,
          quantity: 10,
          price: 100.0,
        },
        {
          id: 2,
          name: "Sản phẩm 2",
          description: "Mô tả sản phẩm 2",
          image: "https://via.placeholder.com/100",
          additionalImages: ["https://via.placeholder.com/100"],
          subcategoryId: 2,
          quantity: 20,
          price: 200.0,
        },
      ],
    };
  },
  methods: {
    createProduct() {
      if (
        this.products.some((product) => product.name === this.newProduct.name)
      ) {
        this.error = "Tên sản phẩm đã tồn tại!";
        return;
      }
      this.error = "";

      const newProduct = {
        id: Date.now(),
        name: this.newProduct.name,
        description: this.newProduct.description,
        image: this.newProduct.image,
        additionalImages: [...this.newProduct.additionalImages],
        subcategoryId: this.newProduct.subcategoryId,
        quantity: this.newProduct.quantity,
        price: this.newProduct.price,
      };

      this.products.push(newProduct);
      this.resetNewProductForm();
      this.showProductModal = false;
    },
    editProduct(product) {
      this.editableProduct = { ...product };
      this.showEditModal = true;
    },
    saveEditedProduct() {
      const index = this.products.findIndex(
        (p) => p.id === this.editableProduct.id
      );
      if (index !== -1) {
        this.products.splice(index, 1, this.editableProduct);
      }
      this.showEditModal = false;
      this.editableProduct = null;
    },
    deleteProduct(productId) {
      this.products = this.products.filter(
        (product) => product.id !== productId
      );
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newProduct.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    handleEditImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.editableProduct.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    handleAdditionalImagesUpload(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newProduct.additionalImages.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    handleEditAdditionalImagesUpload(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
          this.editableProduct.additionalImages.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    getCategoryName(categoryId) {
      const category = this.categories.find((cat) => cat.id === categoryId);
      return category ? category.name : "N/A";
    },
    resetNewProductForm() {
      this.newProduct = {
        name: "",
        description: "",
        image: "",
        additionalImages: [],
        subcategoryId: "",
        quantity: "",
        price: "",
      };
    },
  },
};
</script>
<style scoped>
.product-page {
  padding: 20px;
}

.product-form {
  margin-bottom: 30px;
}

.product-list ul {
  list-style-type: none;
  padding-left: 0;
}

.product-list .product-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #dee2e6;
}

.product-list .product-info {
  display: flex;
  flex-direction: row;
}

.product-list .product-details {
  margin-left: 20px;
}

.product-list .additional-images {
  margin-top: 10px;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.modal-body {
  padding-bottom: 20px;
}
</style>
