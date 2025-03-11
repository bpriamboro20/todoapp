<script setup>
// Mengimpor komponen-komponen yang digunakan dalam template
import toDoListInput from "@/components/CompInputanForm/toDoListInput.vue"; // Komponen input untuk menambahkan task
import buttonFilterTask from "@/components/CompInputanForm/buttonFilterTask.vue"; // Komponen tombol untuk filter task
import toDoListHeader from "@/components/CompInputanForm/toDoListHeader.vue"; // Komponen header untuk daftar task
import toDoListItem from "@/components/CompInputanForm/toDoListItem.vue"; // Komponen untuk menampilkan task individu
</script>

<template>
  <div class="flex flex-col items-center w-full mt-4">
    <!-- Form untuk menambahkan dan memfilter task -->
    <form
      @submit.prevent
      class="w-11/12 sm:w-3/4 flex flex-col"
    >
      <toDoListInput />
      <hr class="w-full border-t border-gray-500 mt-5" />
    </form>
    <div class="w-11/12 sm:w-3/4 flex flex-col">
      <!-- Daftar task individu -->
      <toDoListItem />
    </div>
  </div>
</template>
