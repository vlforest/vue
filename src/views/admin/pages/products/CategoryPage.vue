<template>
  <div class="category-page container">
    <h1 class="my-4">Danh Mục Sản Phẩm</h1>
    <div class="create-category mb-4 d-flex align-items-center">
      <form
        @submit.prevent="createCategory"
        class="d-flex align-items-center w-100"
      >
        <input
          type="text"
          class="form-control me-2"
          placeholder="Tên Danh Mục"
          v-model="newCategory.name"
          required
          style="flex: 2"
        />
        <select
          class="form-select me-2"
          v-model="newCategory.parentId"
          required
          style="flex: 1"
        >
          <option disabled value="">Chọn danh mục cha</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
        <button
          type="button"
          class="btn btn-secondary me-2"
          @click="openCreateParentCategoryModal"
        >
          <i class="bi bi-plus-lg"></i> Thêm
        </button>
        <button type="submit" class="btn btn-primary">
          <i class="bi bi-save"></i> Tạo
        </button>
      </form>
    </div>
    <div class="category-list">
      <h2 class="mb-3">Danh Sách Danh Mục</h2>
      <div class="row">
        <div
          class="col-lg-4 col-md-6 mb-4"
          v-for="category in categories"
          :key="category.id"
        >
          <div class="card h-100">
            <img
              :src="category.image || 'https://via.placeholder.com/150'"
              class="card-img-top"
              alt="Image not found"
            />
            <div class="card-body">
              <h5 class="card-title">{{ category.name }}</h5>
              <button @click="openModal(category)" class="btn btn-primary">
                <i class="bi bi-eye"></i> Chi tiết
              </button>
              <ul class="list-group list-group-flush mt-2">
                <li
                  v-for="subcategory in category.subcategories"
                  :key="subcategory.id"
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  {{ subcategory.name }}
                  <button
                    class="btn btn-danger btn-sm"
                    @click="confirmDeleteSubcategory(subcategory)"
                  >
                    <i class="bi bi-trash"></i> Xóa
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirm Delete Subcategory Modal -->
    <div
      class="modal fade"
      id="confirmDeleteSubcategoryModal"
      tabindex="-1"
      aria-labelledby="confirmDeleteSubcategoryModalLabel"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="confirmDeleteSubcategoryModalLabel">
              Xác nhận xóa danh mục con
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            Bạn có chắc chắn muốn xóa danh mục con này không?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Hủy
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteSubcategory"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirm Delete Category Modal -->
    <div
      class="modal fade"
      id="confirmDeleteCategoryModal"
      tabindex="-1"
      aria-labelledby="confirmDeleteCategoryModalLabel"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="confirmDeleteCategoryModalLabel">
              Xác nhận xóa danh mục
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            Bạn có chắc chắn muốn xóa danh mục này và tất cả các danh mục con
            của nó không?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Hủy
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteCategory"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Chi Tiết Danh Mục -->
    <div
      class="modal fade"
      id="categoryModal"
      tabindex="-1"
      aria-labelledby="categoryModalLabel"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="categoryModalLabel">
              Chi Tiết Danh Mục
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateCategory">
              <div class="mb-3">
                <label for="categoryName" class="form-label"
                  >Tên Danh Mục</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="categoryName"
                  v-model="selectedCategory.name"
                  required
                  placeholder="Nhập tên danh mục"
                />
              </div>
              <div class="mb-3">
                <label for="categoryDescription" class="form-label"
                  >Mô Tả</label
                >
                <textarea
                  class="form-control"
                  id="categoryDescription"
                  v-model="selectedCategory.description"
                  required
                  placeholder="Nhập mô tả"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="categoryImage" class="form-label"
                  >Hình Đại Diện</label
                >
                <input
                  type="file"
                  class="form-control"
                  id="categoryImage"
                  @change="handleEditImageUpload"
                />
                <img
                  :src="
                    selectedCategory.image || 'https://via.placeholder.com/150'
                  "
                  class="mt-2 img-thumbnail"
                  alt="Thumbnail"
                />
              </div>
              <button type="submit" class="btn btn-primary">
                <i class="bi bi-save"></i> Cập Nhật
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Thêm Danh Mục Cha -->
    <div
      class="modal fade"
      id="createParentCategoryModal"
      tabindex="-1"
      aria-labelledby="createParentCategoryModalLabel"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="createParentCategoryModalLabel">
              Tạo Danh Mục Cha
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createParentCategory">
              <div class="mb-3">
                <label for="parentCategoryName" class="form-label"
                  >Tên Danh Mục</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="parentCategoryName"
                  v-model="newParentCategory.name"
                  required
                  placeholder="Nhập tên danh mục"
                />
              </div>
              <div class="mb-3">
                <label for="parentCategoryDescription" class="form-label"
                  >Mô Tả</label
                >
                <textarea
                  class="form-control"
                  id="parentCategoryDescription"
                  v-model="newParentCategory.description"
                  required
                  placeholder="Nhập mô tả"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="parentCategoryImage" class="form-label"
                  >Hình Đại Diện</label
                >
                <input
                  type="file"
                  class="form-control"
                  id="parentCategoryImage"
                  @change="handleParentImageUpload"
                />
                <img
                  :src="
                    newParentCategory.image || 'https://via.placeholder.com/150'
                  "
                  class="mt-2 img-thumbnail"
                  alt="Thumbnail"
                />
              </div>
              <button type="submit" class="btn btn-primary">
                <i class="bi bi-save"></i> Tạo
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive, nextTick } from "vue";
import { Modal } from "bootstrap";

export default {
  name: "CategoryPage",
  setup() {
    const newCategory = reactive({
      name: "",
      parentId: 1, // Đặt giá trị mặc định là ID của danh mục cha đầu tiên
    });

    const newParentCategory = reactive({
      name: "",
      description: "",
      image: "",
    });

    const categories = ref([
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
    ]);

    const selectedCategory = reactive({
      id: null,
      name: "",
      image: "",
      description: "",
      subcategories: [],
    });

    const originalCategory = ref(null);
    const subcategoryToDelete = ref(null);
    const categoryToDelete = ref(null);

    function openCreateParentCategoryModal() {
      const modal = new Modal(
        document.getElementById("createParentCategoryModal")
      );
      modal.show();
    }

    function createParentCategory() {
      const newParentCategoryData = {
        id: categories.value.length + 1,
        name: newParentCategory.name,
        description: newParentCategory.description,
        image: newParentCategory.image,
        subcategories: [],
      };
      categories.value.push(newParentCategoryData);
      resetParentForm();
      const modal = Modal.getInstance(
        document.getElementById("createParentCategoryModal")
      );
      modal.hide();
    }

    function resetParentForm() {
      newParentCategory.name = "";
      newParentCategory.description = "";
      newParentCategory.image = "";
    }

    function handleParentImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          newParentCategory.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }

    function createCategory() {
      const newCategoryData = {
        id: categories.value.length + 1,
        name: newCategory.name,
        subcategories: [],
      };
      if (newCategory.parentId) {
        const parentCategory = categories.value.find(
          (category) => category.id === newCategory.parentId
        );
        parentCategory.subcategories.push(newCategoryData);
      } else {
        categories.value.push(newCategoryData);
      }
      resetForm();
      console.log("Category created:", newCategoryData);
    }

    function resetForm() {
      newCategory.name = "";
      newCategory.parentId = 1;
    }

    function openModal(category) {
      Object.assign(selectedCategory, JSON.parse(JSON.stringify(category)));
      originalCategory.value = category;
      nextTick(() => {
        const modalElement = document.getElementById("categoryModal");
        if (modalElement) {
          const modal = new Modal(modalElement, {
            backdrop: "static",
            keyboard: false,
          });
          modal.show();
        }
      });
    }

    function updateCategory() {
      Object.assign(originalCategory.value, selectedCategory);
      const modalElement = document.getElementById("categoryModal");
      if (modalElement) {
        const modal = Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
      console.log("Category updated:", selectedCategory);
    }

    function confirmDeleteCategory(category) {
      categoryToDelete.value = category;
      nextTick(() => {
        const modalElement = document.getElementById(
          "confirmDeleteCategoryModal"
        );
        if (modalElement) {
          const modal = new Modal(modalElement, {
            backdrop: "static",
            keyboard: false,
          });
          modal.show();
        }
      });
    }

    function deleteCategory() {
      if (categoryToDelete.value && categoryToDelete.value.id) {
        const index = categories.value.findIndex(
          (category) => category.id === categoryToDelete.value.id
        );
        if (index !== -1) {
          categories.value.splice(index, 1);
        }
        const modalElement = document.getElementById(
          "confirmDeleteCategoryModal"
        );
        if (modalElement) {
          const modal = Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
          }
        }
        console.log("Category deleted:", categoryToDelete.value);
        updateCategoriesList();
      }
    }

    function confirmDeleteSubcategory(subcategory) {
      if (subcategory && subcategory.id) {
        subcategoryToDelete.value = subcategory;
        const modal = new Modal(
          document.getElementById("confirmDeleteSubcategoryModal")
        );
        modal.show();
      }
    }

    function deleteSubcategory() {
      if (subcategoryToDelete.value && selectedCategory.subcategories) {
        const index = selectedCategory.subcategories.findIndex(
          (subcategory) => subcategory.id === subcategoryToDelete.value.id
        );
        if (index !== -1) {
          selectedCategory.subcategories.splice(index, 1);
        }
        const modal = Modal.getInstance(
          document.getElementById("confirmDeleteSubcategoryModal")
        );
        modal.hide();
        console.log("Subcategory deleted:", subcategoryToDelete.value);
        updateCategoriesList();
      }
    }

    function handleEditImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          selectedCategory.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }

    function updateCategoriesList() {
      categories.value = JSON.parse(JSON.stringify(categories.value));
    }

    return {
      newCategory,
      newParentCategory,
      categories,
      selectedCategory,
      openCreateParentCategoryModal,
      createParentCategory,
      resetParentForm,
      handleParentImageUpload,
      createCategory,
      resetForm,
      openModal,
      updateCategory,
      confirmDeleteCategory,
      deleteCategory,
      confirmDeleteSubcategory,
      deleteSubcategory,
      handleEditImageUpload,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
}

.my-4 {
  margin-top: 1.5rem !important;
  margin-bottom: 1.5rem !important;
}

.create-category {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.category-list .card {
  margin-bottom: 1.5rem;
}

.category-list .card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.category-list .card-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.category-list .btn {
  margin-top: 0.5rem;
}

.modal-content {
  border-radius: 0.5rem;
}

.modal-header {
  border-bottom: none;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.modal-body {
  font-size: 1rem;
  line-height: 1.5;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}

.btn-close {
  background: none;
  color: #dc3545;
  border: none;
  font-size: 1.25rem;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.img-thumbnail {
  max-width: 100%;
  height: auto;
  border: 1px solid #dee2e6;
}
</style>
