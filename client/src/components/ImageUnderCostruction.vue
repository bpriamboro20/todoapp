<script setup>
import { useUCStore } from "@/stores/storeUnderConstruction.js";

const { imageUC } = useUCStore();
</script>

<template>
  <div>
    <img
      :src="imageUC"
      alt="Image Page Under Construction"
    />
  </div>
</template>

<style scoped>
img {
  width: 100%;
  height: 385px;
}
</style>
