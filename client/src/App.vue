<script setup>
// Import Pinia store untuk autentikasi
import { useAuthStore } from "@/stores/authStore";

// Import `RouterLink` dan `RouterView` dari `vue-router`
import { RouterLink, RouterView } from "vue-router";

// Import komponen `Navbar` untuk navigasi utama
import Navbar from "./components/Navbar.vue";

// Inisialisasi store autentikasi
const authStore = useAuthStore();

// Pastikan state autentikasi diperbarui saat aplikasi dimulai
authStore.reloadAuthState();
</script>

<template>
  <!-- Menampilkan komponen Navbar -->
  <Navbar />

  <!-- `RouterView` akan menampilkan komponen halaman sesuai rute aktif -->
  <RouterView />
</template>

<style>
/* Tambahkan styling global untuk komponen ini jika diperlukan */
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap");

* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  font-family: "Quicksand", serif;
}
html,
body {
  overflow-x: clip;
}
</style>
