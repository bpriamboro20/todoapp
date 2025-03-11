<script setup>
import { useHomeStore } from "@/stores/storeHome";

// Akses store di dalam setup
const { imageHome } = useHomeStore();
</script>

<template>
  <div class="sm:flex sm:justify-center">
    <img
      :src="imageHome"
      alt="Image Hero"
      class="sm:w-3/4 md:w-2/3 lg:w-full lg:mt-10 xl:mt-0"
    />
  </div>
</template>
