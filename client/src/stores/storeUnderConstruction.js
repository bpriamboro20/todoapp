// Import `ref` dari Vue - Digunakan untuk membuat variabel reaktif
import { ref } from "vue";

// Import `defineStore` dari Pinia - Digunakan untuk mendefinisikan store (pengelola state)
import { defineStore } from "pinia";

// Import gambar untuk halaman 404
import imageUnderConstruction from "@/assets/image/underconstruction.gif";

// Definisikan store bernama "notfound" untuk mengelola data terkait halaman 404
export const useUCStore = defineStore("underconstruction", () => {
  // `imageUnderConstruction` adalah referensi reaktif yang menyimpan path gambar untuk halaman 404
  const imageUC = ref(imageUnderConstruction);

  // `textContent` adalah teks yang akan ditampilkan pada halaman 404
  const textContent = "We’re making things better for you! Our website is under construction, please visit us again later.";

  // Return objek yang berisi properti yang bisa diakses di komponen lain
  return { imageUC, textContent };
});
