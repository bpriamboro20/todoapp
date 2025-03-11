<script setup>
// Mengimpor komponen-komponen yang diperlukan dari Vue Router
import { RouterView, useRoute } from "vue-router";
// Mengimpor sidebar admin dari komponen
import sidebarAdmin from "@/components/SidebarAdmin.vue";

// Menggunakan hook useRoute untuk mengambil informasi rute saat ini
const route = useRoute();
</script>

<template>
  <div class="flex min-h-screen">
    <!-- Menampilkan sidebar admin -->
    <sidebarAdmin />

    <!-- Area konten utama -->
    <div class="p-8 w-full sm:max-h-screen sm:overflow-y-auto">
      <!-- RouterView akan menampilkan komponen berdasarkan rute saat ini -->
      <RouterView v-slot="{ Component }">
        <!-- Jika tidak ada komponen (misalnya ketika rute tidak ditemukan) -->
        <div v-if="!Component">
          <h1 class="font-bold text-3xl mt-16">Hello, selamat datang Admin 👋</h1>
        </div>
        <!-- Menampilkan komponen yang sesuai dengan rute saat ini -->
        <component :is="Component" />
      </RouterView>
    </div>
  </div>
</template>
