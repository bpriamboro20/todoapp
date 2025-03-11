<script setup>
import { useUCStore } from "@/stores/storeUnderConstruction.js";

const { textContent } = useUCStore();
</script>

<template>
  <h1 class="text-2xl text-center font-bold text-cyan-700">{{ textContent }}</h1>
</template>
