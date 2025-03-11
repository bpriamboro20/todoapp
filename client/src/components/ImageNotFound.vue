<script setup>
import { use404Store } from "@/stores/store404.js";

const { imageNotFound } = use404Store();
</script>

<template>
  <div>
    <img
      :src="imageNotFound"
      alt="Image Page Not Found"
    />
  </div>
</template>

<style scoped>
img {
  width: 100%;
  height: 350px;
}

@media only screen and (max-width: 834px) {
  img {
    width: 100%;
    height: 500px;
  }
}

@media only screen and (max-width: 470px) {
  img {
    width: 100%;
    height: 350px;
  }
}

@media only screen and (max-width: 321px) {
  img {
    width: 100%;
    height: 225px;
  }
}
</style>
