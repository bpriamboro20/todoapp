<script setup>
import { useHomeStore } from "@/stores/storeHome.js";

const { textHeader, textContent } = useHomeStore();
</script>

<template>
  <h1 class="text-2xl text-left sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-cyan-800 font-bold pt-7 mb-6 md:mb-8">{{ textHeader }}</h1>
  <h2 class="text-xl text-justify sm:text-xl md:text-xl lg:text-xl xl:text-2xl text-cyan-600">{{ textContent }}</h2>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Quicksand:wght@300..700&display=swap");
* {
  font-family: "Oswald", sans-serif;
}
</style>
