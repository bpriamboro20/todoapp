// Import `ref` dari Vue - Digunakan untuk membuat variabel reaktif
import { ref } from "vue";

// Import `defineStore` dari Pinia - Digunakan untuk mendefinisikan store (pengelola state)
import { defineStore } from "pinia";

// Import gambar untuk halaman 404
import image404 from "@/assets/image/notfound.png";

// Definisikan store bernama "notfound" untuk mengelola data terkait halaman 404
export const use404Store = defineStore("notfound", () => {
  // `imageNotFound` adalah referensi reaktif yang menyimpan path gambar untuk halaman 404
  const imageNotFound = ref(image404);

  // `textContent` adalah teks yang akan ditampilkan pada halaman 404
  const textContent = "We're sorry, the page you are looking for could not be found (404).";

  // Return objek yang berisi properti yang bisa diakses di komponen lain
  return { imageNotFound, textContent };
});
