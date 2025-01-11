<template>
  <div class="home-page container-fluid">
    <header class="hero-section">
      <div class="hero-content text-center mb-4">
        <h1 class="display-4">{{ $t("hero.title") }}</h1>
        <p class="lead">{{ $t("hero.subtitle") }}</p>
      </div>
      <div
        id="homeCarousel"
        class="carousel slide position-relative"
        data-bs-ride="carousel"
        data-bs-interval="500"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#homeCarousel"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#homeCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#homeCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div
            v-for="(image, index) in sliderImages"
            :key="index"
            :class="['carousel-item', { active: index === 0 }]"
          >
            <img
              :src="image"
              class="d-block w-100"
              :alt="'Slide Image ' + (index + 1)"
            />
          </div>
        </div>
        <div class="fixed-button">
          <router-link to="/contact" class="btn btn-primary btn-lg">
            {{ $t("hero.cta") }}
          </router-link>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#homeCarousel"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#homeCarousel"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </header>

    <section class="about-section my-5">
      <div class="container">
        <h2 class="text-center mb-4">{{ $t("about.title") }}</h2>
        <p class="text-center">{{ $t("about.description") }}</p>
      </div>
    </section>

    <section class="categories-section my-5">
      <div class="container">
        <h2 class="text-center mb-4">{{ $t("categories.title") }}</h2>
        <div class="row">
          <div
            v-for="category in categories"
            :key="category.id"
            class="col-md-4 mb-4"
          >
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">{{ category.name }}</h5>
                <p class="card-text">{{ category.description }}</p>
                <router-link
                  :to="`/category/${category.id}`"
                  class="btn btn-primary"
                >
                  {{ $t("categories.learnMore") }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      categories: [
        {
          id: 1,
          name: "Máy móc phục vụ ngành gỗ",
          description: "Các loại máy móc công nghiệp phục vụ ngành gỗ.",
        },
        {
          id: 2,
          name: "Nhám",
          description: "Các sản phẩm nhám chất lượng cao cho mọi nhu cầu.",
        },
        {
          id: 3,
          name: "Các phụ kiện khác",
          description: "Các phụ kiện đa dạng cho ngành gỗ.",
        },
        // Thêm các danh mục khác nếu cần
      ],
      sliderImages: [],
    };
  },
  mounted() {
    // Automatically load all images in the src/assets/images/slide2 directory for the hero slider
    const requireContext = require.context(
      "@/assets/images/slide2",
      false,
      /\.(png|jpe?g|svg)$/
    );
    this.sliderImages = requireContext.keys().map(requireContext);
  },
};
</script>

<style scoped>
.hero-section {
  position: relative;
}
.hero-content {
  text-align: center;
  margin-bottom: 20px; /* Khoảng cách giữa phần chào mừng và slider */
}
.carousel-item {
  height: 60vh;
  transition: transform 1s ease-in-out; /* Thời gian chuyển đổi mượt mà hơn */
}
.carousel-item img {
  width: 100%;
  height: auto;
  max-height: 60vh;
  object-fit: cover;
}
.fixed-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}
.about-section,
.categories-section {
  padding: 2rem 0;
}
.card {
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-10px);
}
</style>
