// Import `ref` dari Vue - Digunakan untuk membuat variabel reaktif
import { ref } from "vue";

// Import `defineStore` dari Pinia - Digunakan untuk mendefinisikan store (pengelola state)
import { defineStore } from "pinia";

// Import gambar untuk tampilan halaman Home
import ImageHero from "@/assets/image/imageHero2.png";

// Definisikan store bernama "home" untuk mengelola data terkait halaman Home
export const useHomeStore = defineStore("home", () => {
  // `imageHome` adalah referensi reaktif yang menyimpan path gambar hero untuk halaman Home
  const imageHome = ref(ImageHero);

  // `textHeader` adalah teks utama (header) yang ditampilkan di halaman Home
  const textHeader = "Organize your tasks, achieve your goals!";

  // `textContent` adalah teks deskriptif yang memberikan informasi atau promosi tentang fitur aplikasi
  const textContent =
    "Manage your daily tasks effortlessly and maintain control of your schedule. Explore the to-do list app that boosts your productivity and propels you toward greater success. Experience the power of organized planning that allows you to make the best use of each day.";

  // Mengembalikan properti yang dapat diakses oleh komponen Vue yang menggunakan store ini
  return { imageHome, textHeader, textContent };
});
