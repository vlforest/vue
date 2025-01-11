<template>
  <div class="about-us-page container-fluid">
    <section class="hero-section">
      <div id="aboutCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#aboutCarousel"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#aboutCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#aboutCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div
            v-for="(image, index) in heroSliderImages"
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
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#aboutCarousel"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#aboutCarousel"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </section>

    <section class="company-description my-5">
      <div class="container">
        <h2>{{ $t("about.companyTitle") }}</h2>
        <p>{{ $t("about.description") }}</p>
      </div>
    </section>

    <section class="team-section my-5">
      <div class="container">
        <h2 class="text-center mb-4">{{ $t("about.teamTitle") }}</h2>
        <div class="row">
          <div
            class="col-md-4"
            v-for="member in teamMembers"
            :key="member.name"
          >
            <div class="card h-100">
              <img
                :src="member.photo"
                class="card-img-top"
                :alt="member.name"
              />
              <div class="card-body">
                <h5 class="card-title">{{ member.name }}</h5>
                <p class="card-text">{{ member.position }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="values-section my-5">
      <div class="container">
        <h2 class="text-center mb-4">{{ $t("about.valuesTitle") }}</h2>
        <ul class="list-group">
          <li class="list-group-item">{{ $t("about.values.innovation") }}</li>
          <li class="list-group-item">{{ $t("about.values.integrity") }}</li>
          <li class="list-group-item">
            {{ $t("about.values.customerFocus") }}
          </li>
          <li class="list-group-item">{{ $t("about.values.quality") }}</li>
          <li class="list-group-item">
            {{ $t("about.values.sustainability") }}
          </li>
        </ul>
      </div>
    </section>

    <section class="image-slider my-5">
      <div class="container">
        <div id="imageCarousel" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#imageCarousel"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#imageCarousel"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#imageCarousel"
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
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#imageCarousel"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#imageCarousel"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "AboutUsPage",
  data() {
    return {
      teamMembers: [
        {
          name: "Nguyen Van A",
          position: "CEO",
          photo: "https://via.placeholder.com/200x200.png?text=CEO",
        },
        {
          name: "Tran Thi B",
          position: "COO",
          photo: "https://via.placeholder.com/200x200.png?text=COO",
        },
        {
          name: "Le Van C",
          position: "CTO",
          photo: "https://via.placeholder.com/200x200.png?text=CTO",
        },
        // Thêm các thành viên khác nếu cần
      ],
      heroSliderImages: [],
      sliderImages: [],
    };
  },
  mounted() {
    // Automatically load all images in the src/assets/images/slide1 directory for the hero slider
    const heroContext = require.context(
      "@/assets/images/slide1",
      false,
      /\.(png|jpe?g|svg)$/
    );
    this.heroSliderImages = heroContext.keys().map(heroContext);

    // Automatically load all images in the src/assets/images/slide2 directory for the second slider
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
.about-us-page {
  padding: 20px;
}
.hero-section {
  position: relative;
}
.carousel-item {
  height: 60vh;
}
.carousel-item img {
  width: 100%;
  height: auto;
  max-height: 60vh;
  object-fit: cover;
}
.company-description,
.team-section,
.values-section,
.image-slider {
  padding: 20px 0;
}
.card-img-top {
  height: 200px;
  object-fit: cover;
}
.carousel-indicators button {
  background-color: #1e6d4f;
}
</style>
