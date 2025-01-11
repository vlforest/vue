<template>
  <div class="card-container">
    <div class="card">
      <div class="card-front">
        <img :src="product.image" class="card-img-top" :alt="product.name" />
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <p class="card-text">{{ product.price }}</p>
        </div>
      </div>
      <div class="card-back">
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <p class="card-text">{{ product.description }}</p>
          <button class="btn btn-primary">
            {{ $t("categories.learnMore") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.card-container {
  perspective: 1000px;
}

.card {
  position: relative;
  border: none;
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease-in-out;
  transform-style: preserve-3d;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* Hiệu ứng nổi khối */
}

.card:hover {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 320px;
  backface-visibility: hidden;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.card-front {
  background: white;
}

.card-back {
  background: white;
  transform: rotateY(180deg);
}

.card-body,
.card-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.card-footer {
  background: #f8f9fa;
}
</style>
