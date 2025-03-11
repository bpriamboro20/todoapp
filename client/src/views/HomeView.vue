<script setup>
import textHome from "@/components/TextHome.vue";
import imageHero from "@/components/ImageHero.vue";
</script>

<template>
  <div class="flex flex-col-reverse px-10 py-10 md:px-28 md:py-20 lg:flex lg:flex-row">
    <div class="basis-1/2">
      <textHome />
    </div>
    <div class="basis-1/2">
      <imageHero />
    </div>
  </div>
</template>
