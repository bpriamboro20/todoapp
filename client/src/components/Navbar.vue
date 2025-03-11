<script setup>
// Mengimpor store untuk otentikasi dari Pinia
import { useAuthStore } from "@/stores/authStore";
// Mengimpor ref dari Vue untuk reaktivitas
import { ref } from "vue";
// Mengimpor RouterLink untuk navigasi
import { RouterLink } from "vue-router";
// Mengimpor SweetAlert2
import Swal from "sweetalert2";

// Mendapatkan akses ke authStore untuk mengelola status login
const authStore = useAuthStore();

// Nama logo untuk aplikasi
const logoName = "To Do List App";

// Fungsi logout, yang memanggil logout dari authStore dan redirect ke halaman login
const logout = () => {
  authStore.logout(); // Memanggil logout dari authStore

  // Menampilkan SweetAlert untuk logout berhasil
  Swal.fire({
    title: "Logged Out",
    text: "Anda berhasil logout",
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
  }).then(() => {
    window.location.href = "/login"; // Mengarahkan ke halaman login setelah menutup SweetAlert
  });
};
</script>

<template>
  <div class="navbar sticky top-0 left-0 w-full bg-cyan-600 shadow-lg z-50">
    <div class="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
      <div class="relative flex h-16 justify-between">
        <div class="flex flex-1 items-stretch justify-start">
          <!-- Logo untuk pengguna yang belum login -->
          <RouterLink
            v-if="!authStore.isLoggedIn"
            to="/"
            class="font-family: Roboto, serif; flex flex-shrink-0 items-center font-bold text-gray-100 hover:text-white text-xl sm:text-2xl"
          >
            {{ logoName }}
          </RouterLink>
          <RouterLink
            v-else-if="authStore.isLoggedIn && authStore.user.role === 'ADMIN'"
            class="flex flex-shrink-0 items-center font-bold text-gray-100 hover:text-white text-2xl"
          >
            Dashboard Admin
          </RouterLink>
          <!-- Logo untuk pengguna yang sudah login -->
          <RouterLink
            v-else
            class="flex flex-shrink-0 items-center font-bold text-gray-100 hover:text-white text-2xl"
          >
            {{ logoName }}
          </RouterLink>
        </div>

        <!-- Bagian untuk navigasi login, register, atau sapaan berdasarkan status login -->
        <div>
          <!-- Jika belum login, tampilkan tombol Login dan Register -->
          <div
            v-if="!authStore.isLoggedIn"
            class="flex-shrink-0 flex px-2 mt-4 md:py-3 md:mt-0 items-center space-x-8"
          >
            <RouterLink
              class="text-gray-100 hover:text-white text-md sm:text-lg font-semibold"
              to="/login"
            >
              Login
            </RouterLink>
            <RouterLink
              class="text-gray-100 hover:text-white bg-cyan-700 hover:bg-cyan-800 inline-flex items-center justify-center px-2 py-1 border border-transparent text-md sm:text-lg font-semibold rounded-md shadow-sm"
              to="/register"
            >
              Register
            </RouterLink>
          </div>

          <!-- Jika sudah login sebagai USER, tampilkan sapaan dan tombol Logout -->
          <div
            v-if="authStore.isLoggedIn && authStore.user.role === 'USER'"
            class="flex-shrink-0 flex px-2 mt-4 md:py-3 md:mt-0 items-center space-x-8"
          >
            <div class="inline-flex gap-2">
              <!-- Menampilkan sapaan berdasarkan waktu dan username pengguna -->
              <h1 class="text-gray-100 text-lg font-semibold hidden sm:flex">Hi, {{ authStore.user?.username || "User" }} 👋</h1>
            </div>
            <!-- Tombol logout -->
            <button
              @click="logout"
              class="text-cyan-600 hover:text-cyan-700 bg-gray-100 hover:bg-white inline-flex items-center justify-center px-2 py-1 border border-transparent text-md sm:text-lg font-semibold rounded-md shadow-sm"
            >
              Logout
            </button>
          </div>

          <!-- Bagian untuk Admin (placeholder) -->
          <div
            v-if="authStore.isLoggedIn && authStore.user.role === 'ADMIN'"
            class="flex-shrink-0 flex px-2 py-3 items-center space-x-8"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  font-family: "Quicksand", serif;
}
</style>
