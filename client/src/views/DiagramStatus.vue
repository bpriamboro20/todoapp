<script setup>
import DiagramPiePriority from "@/components/DiagramPiePriority.vue";
import DiagramPieStatus from "@/components/DiagramPieStatus.vue";
import DiagramBar from "@/components/DiagramBar.vue";
</script>
<template>
  <DiagramBar />
  <div class="flex flex-wrap justify-center gap-10 shadow-xl rounded-lg mx-auto border border-gray-100 b-2 p-8">
    <DiagramPiePriority />
    <DiagramPieStatus />
  </div>
</template>
