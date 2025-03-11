<script setup>
import ImageUnderCostruction from "@/components/ImageUnderCostruction.vue";
import TextUnderConstruction from "@/components/TextUnderConstruction.vue";
</script>

<template>
  <div class="w-5/6 mx-auto flex justify-center items-center">
    <div>
      <ImageUnderCostruction class="imageUnderConstruction" />
      <TextUnderConstruction />
    </div>
  </div>
</template>

<style scoped>
/* Media Query untuk Layar HP */
@media (max-width: 640px) {
  .imageUnderConstruction {
    width: 325px !important;
  }
}
</style>
