<script setup>
import { use404Store } from "@/stores/store404.js";

const { textContent } = use404Store();
</script>

<template>
  <h1 class="text-2xl font-bold text-cyan-700 text-center">{{ textContent }}</h1>
</template>
