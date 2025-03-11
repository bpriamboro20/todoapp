// Import `createApp` dari Vue - Fungsi utama untuk membuat instance aplikasi Vue
import { createApp } from "vue";

// Import `createPinia` dari Pinia - State management yang akan digunakan untuk mengelola data global aplikasi
import { createPinia } from "pinia";

// Import komponen root aplikasi - `App.vue` adalah entry point utama dari aplikasi Vue
import App from "./App.vue";

// Import router - Digunakan untuk mengatur navigasi antara berbagai halaman/komponen dalam aplikasi
import router from "./router";

// Buat instance aplikasi Vue dengan komponen root `App`
const app = createApp(App);

// Buat instance Pinia - Digunakan untuk mengelola state global
const pinia = createPinia();

import Particles from "@tsparticles/vue3";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.

app.use(Particles, {
  init: async (engine) => {
    // await loadFull(engine); // you can load the full tsParticles library from "tsparticles" if you need it
    await loadSlim(engine); // or you can load the slim version from "@tsparticles/slim" if don't need Shapes or Animations
  },
});

// Tambahkan Pinia ke aplikasi - Mengaktifkan state management di seluruh aplikasi
app.use(pinia);

// Tambahkan router ke aplikasi - Mengaktifkan navigasi antara halaman/komponen
app.use(router);

// Mount aplikasi ke elemen dengan ID `#app` di file HTML - Menjadikan aplikasi Vue terlihat di browser
app.mount("#app");
