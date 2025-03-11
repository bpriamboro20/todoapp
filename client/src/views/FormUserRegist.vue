<template>
  <div
    id="app"
    class="relative h-screen"
  >
    <!-- Vue Particles Component -->
    <vue-particles
      id="tsparticles"
      @particles-loaded="particlesLoaded"
      :options="{
        background: {
          image: 'linear-gradient(to right, #06b6d4, #148CAA, #1A5276)',
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: 'push',
            },
            onHover: {
              enable: true,
              mode: 'grab',
            },
          },
          modes: {
            bubble: {
              distance: 200,
              duration: 2,
              opacity: 1,
              size: 40,
            },
            push: {
              quantity: 2,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: '#ffffff',
          },
          links: {
            color: '#ffffff',
            distance: 120,
            enable: true,
            opacity: 1,
            width: 1,
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: 'out',
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
            },
            value: 300,
          },
          opacity: {
            value: 1,
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      }"
    />

    <!-- Card Form in the center -->
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg z-10 w-11/12 sm:w-full max-w-md mt-10">
      <!-- Judul form dengan teks besar dan warna cyan -->
      <h1 class="text-4xl font-bold text-center text-cyan-600 mb-8">Form Register App</h1>

      <!-- Form yang menangani submit dan mencegah reload -->
      <form
        class="space-y-6"
        @submit.prevent="register"
      >
        <!-- Komponen input untuk username, terhubung dengan model user.username -->
        <usernameInput v-model="user.username" />

        <!-- Komponen input untuk email, terhubung dengan model user.email -->
        <emailInput v-model="user.email" />

        <!-- Komponen input untuk password, terhubung dengan model user.password -->
        <passwordInput v-model="user.password" />

        <!-- Komponen input untuk confirm password, terhubung dengan model user.confirmPassword -->
        <confirmPasswordInput
          v-model="user.confirmPassword"
          :password="user.password"
        />

        <div class="space-y-4">
          <!-- Tombol submit yang akan di-disable jika form tidak valid -->
          <button
            :disabled="!isFormValid"
            class="w-full font-bold py-2 px-4 rounded-lg mb-2 bg-cyan-600 hover:bg-cyan-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Register
          </button>

          <!-- Teks untuk link ke halaman login jika sudah memiliki akun -->
          <h3 class="font-semibold">
            Sudah memiliki akun? Silahkan
            <span>
              <RouterLink
                class="text-cyan-800 font-bold"
                to="/login"
              >
                Login
              </RouterLink>
            </span>
          </h3>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
// Import yang diperlukan untuk logika dan tampilan
import { reactive, computed } from "vue"; // Mengimpor reactive dan computed dari Vue untuk membuat state reaktif dan properti terhitung
import { useRouter, RouterLink } from "vue-router"; // Mengimpor useRouter dan RouterLink untuk navigasi antar halaman
import api from "@/services/api"; // Mengimpor API service untuk melakukan request HTTP
import Swal from "sweetalert2"; // Mengimpor SweetAlert2 untuk menampilkan alert ke pengguna

// Import komponen input untuk form
import usernameInput from "@/components/CompInputanForm/usernameInput.vue"; // Komponen input untuk username
import emailInput from "@/components/CompInputanForm/emailInput.vue"; // Komponen input untuk email
import passwordInput from "@/components/CompInputanForm/passwordInput.vue"; // Komponen input untuk password
import confirmPasswordInput from "@/components/CompInputanForm/confirmPasswordInput.vue"; // Komponen input untuk konfirmasi password

// Inisialisasi router untuk navigasi setelah registrasi
const router = useRouter(); // Menyimpan instance router untuk navigasi ke halaman lain

// State untuk data input pengguna
const user = reactive({
  username: "", // Data input untuk username
  email: "", // Data input untuk email
  password: "", // Data input untuk password
  confirmPassword: "", // Data input untuk konfirmasi password
});

// Properti terhitung untuk memvalidasi form
const isFormValid = computed(() => {
  // Validasi form: Memastikan semua field diisi dan password dan konfirmasi password cocok
  return user.username && user.email && user.password && user.confirmPassword && user.password === user.confirmPassword;
});

// Fungsi untuk menangani proses registrasi
const register = async () => {
  // Jika form tidak valid, tampilkan alert peringatan
  if (!isFormValid.value) {
    Swal.fire({
      icon: "warning",
      title: "Form tidak valid!", // Pesan peringatan jika form tidak lengkap atau password tidak cocok
    });
    return;
  }

  try {
    // Kirim request untuk registrasi menggunakan API
    await api.post("/api/register", {
      username: user.username, // Mengirimkan username
      email: user.email, // Mengirimkan email
      password: user.password, // Mengirimkan password
      confirmPassword: user.confirmPassword, // Mengirimkan konfirmasi password
    });

    // Tampilkan alert sukses setelah registrasi berhasil
    Swal.fire({
      title: "Akun Berhasil Dibuat!", // Judul alert sukses
      icon: "success", // Ikon sukses
      draggable: true, // Membuat alert bisa digeser
      text: "Anda akan diarahkan ke form login.", // Pesan alert sukses
      timer: 2000, // Alert akan muncul selama 2 detik
      showConfirmButton: false, // Tidak menampilkan tombol konfirmasi
    });

    // Redirect ke halaman login setelah registrasi berhasil
    router.push({ name: "login" }); // Mengarahkan pengguna ke halaman login
  } catch (error) {
    // Jika terjadi error saat registrasi, tampilkan pesan error
    if (error.response && error.response.data.errors) {
      const errors = error.response.data.errors.map((err) => err.msg).join("<br>"); // Menampilkan daftar error yang diterima dari API
      Swal.fire({
        icon: "error", // Ikon error
        title: "Validation Error", // Judul error validasi
        html: errors, // Menampilkan daftar kesalahan dari API
        customClass: {
          confirmButton: "bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-36 mb-5 rounded", // Kustomisasi tombol konfirmasi
        },
      });
    } else {
      // Jika ada error lainnya, tampilkan pesan error umum
      Swal.fire({
        icon: "error", // Ikon error
        title: "Error", // Judul error umum
        text: "Something went wrong!", // Pesan error default
        customClass: {
          confirmButton: "bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-36 mb-5 rounded", // Kustomisasi tombol konfirmasi
        },
      });
    }
  }
};

// Fungsi untuk menangani peristiwa setelah partikel dimuat (dari penggunaan library particles.js)
const particlesLoaded = async (container) => {
  console.log("Particles container loaded", container); // Menampilkan log saat partikel dimuat
};
</script>
