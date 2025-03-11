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
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg z-10 w-auto max-w-md mt-3">
      <h1 class="text-4xl font-bold text-center text-cyan-600 mb-8">Form Login App</h1>

      <form
        @submit.prevent="handleLogin"
        class="space-y-6"
      >
        <!-- Input Components -->
        <emailInput
          v-model="user.email"
          :error="validationErrors.email"
        />
        <passwordInput
          v-model="user.password"
          :error="validationErrors.password"
        />

        <!-- reCAPTCHA -->
        <div class="flex justify-between">
          <vue-recaptcha
            ref="recaptchaRef"
            :sitekey="RECAPTCHA_SITE_KEY"
            @verify="onRecaptchaVerify"
            @expired="onRecaptchaExpire"
            @error="onRecaptchaError"
            :class="[!isRecaptchaVerified ? 'border-red-500' : '']"
            class="recaptha"
          ></vue-recaptcha>
          <img
            class="hidden lg:flex"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEa0lEQVR4nO2aX2gcRRzHd+by5pMVxaKVPBpftCLY88FANRUR+9InH9QiSBHpW9/Fm9+m1FTblJLQ/FHS1hefxFiD+FCa3s3vYhIvd0n0IbG2wf4R2oQ0fy7QwpRZmutdkt2bdG9vZs/5whd2GXZ/v99nfzPM7p3jWMVULm8lDHsJ4G8EeI/DMm/qTslIEUCXAoqNJsCZ7tyMUiKF+7cCte4EZN/TnaMxIsAvBMEigIO6czRGFPiVIFgU8G/dORojyvhkICzG87pzNEaJFD8TuGaxTLfuHM0RS+8jDLfsLsKw4DD+tu4UzdFRbKZw+SMK+HsFLBdHKMt86HyBzbpTNEtfppMJF7srpp+L3U47vq47NSNF27NHyKPtgqAse0R3TsaKAh7csGYd1J2TsaIWlrr+H7Da00kC/GvKMEcB/6uyG6+PGb9FAf8gjB93ILtHNyLHcbMvEeC/agejYAI45KSwReeXgiXdELbXbXg3Afz9+oJysY0C3tNe/OMBu58AfLc+pIA/RxnOay86nO84MLYzclYEsM+AYkObMH4mWlLu8NOxnX6bfc9pH3kqMlYUMp8YUGTtzPjHkcEirPJFN+4mwLuihPVTQ8Fi/MfoYAG/2GCdddHCAgtLNGxnNbkoWrpyItlfELs6xyKdTi90jnlxZLxEnGA1uSgOD82Kq3eWxdraWsnZa/Oi7fxUTSG98/20GJmbr4jzz+0l8fkvs0rQagLL/+ZYFdS5iZsVyZd7tbgmDv08UxNQn12YEUWfONIDuRtVgQXVEzmsw0Ozvsmve3m1KHb35EOBeq0vL1aKxaqxZIcZCavJxU1TL+iph4EV1L3lvnJ7KbC7tMFq6copFSAtoYaBdU3xoUi/2JUzD1ayv6BcwOLKaihY8nrVWDIv42Dt6hxTLmDq5mIoWH/eWlSO9fzJUfNgUUBve6BSwLH0XChYHek5pTj86nzgfbTCajs/5W0Pggr4d2FZPPuN/9NW8c4To+L6wkpgHJnH3rNyX5c1ExZ10dtHye2BH6g9/fnq96lieb1ci/yAyfifDlbfz2mHRQHFq715cTZ3w9tN310pemuUnHphO+qReanDvkrPefeXcWQ8uS15pWdCGbo+WKwWIBStEotxg2FBnYGFtH5YsBHcw6fL/BfacF6/L9/2gzILFphtCwssLGE7C+w0FLohxHLN2nF8VLQOTFZ4d29evNwz4Vkel48lvy2UxqTlueq10jJebGG1DkxuehVpPjVeGpfH5WN945UfBeW56rXSMl7dYRHASz5eaDBYC361qncWy3ywlQnw6caCxaf9arWwIAJYTsfEE1uZAB9usM4a9qvVqfcfQ1rNh2XGz/fUwuIWVlSd1XxqXBwanKnwG98VvF+UpeVx+diBH/4qjUnLc9VrpcunaeymIX34mblu3mY8CwviCgvMtoUFFpaIX2el+Gni8ksN4xQ/HRmshJt5y+9dKo6W9VhYzABYztHLTzodmWcaxrIeKysrKysrKysrR7ceAPhvRp/Id6oPAAAAAElFTkSuQmCC"
            alt="bot"
          />
        </div>

        <!-- Login Button -->
        <div class="space-y-4">
          <button
            type="submit"
            class="w-full bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="isLoading || !isRecaptchaVerified"
          >
            <span v-if="isLoading"> Loading... </span>
            <span v-else> Log In </span>
          </button>

          <!-- Registration Link -->
          <p class="font-semibold">
            Belum memiliki akun?
            <RouterLink
              class="text-cyan-800 font-bold hover:text-cyan-600 transition-colors"
              to="/register"
            >
              Register
            </RouterLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue"; // Mengimpor hook Vue untuk state reaktif dan lifecycle hooks
import { useRouter } from "vue-router"; // Mengimpor useRouter untuk navigasi antarlaman
import Swal from "sweetalert2"; // Mengimpor SweetAlert2 untuk menampilkan alert
import Api from "@/services/api"; // Mengimpor instance API untuk melakukan request HTTP
import { useAuthStore } from "@/stores/authStore"; // Mengimpor store autentikasi untuk mengelola status login
import emailInput from "@/components/CompInputanForm/emailInput.vue"; // Mengimpor komponen input email
import passwordInput from "@/components/CompInputanForm/passwordInput.vue"; // Mengimpor komponen input password
import { VueRecaptcha } from "vue-recaptcha"; // Mengimpor komponen VueRecaptcha untuk reCAPTCHA

// Constants
const RECAPTCHA_SITE_KEY = "6Lfvwr8qAAAAAHcY7NlI73Y8kD7oSn1YV-xybmom"; // Menyimpan kunci site untuk reCAPTCHA

// Composables
const router = useRouter(); // Menyimpan instance router untuk navigasi
const authStore = useAuthStore(); // Mengakses store autentikasi untuk login dan logout

// Reactive State
const user = reactive({
  email: "", // Email pengguna
  password: "", // Password pengguna
});

const particlesLoaded = async (container) => {
  console.log("Particles container loaded", container); // Menampilkan log saat particles telah dimuat
};

const validationErrors = reactive({
  email: "", // Menyimpan error validasi email
  password: "", // Menyimpan error validasi password
});

const isLoading = ref(false); // Menyimpan status loading
const isRecaptchaVerified = ref(false); // Menyimpan status apakah reCAPTCHA sudah diverifikasi
const recaptchaToken = ref(""); // Menyimpan token reCAPTCHA

// Form Validation
const validateForm = () => {
  let isValid = true; // Variabel untuk mengecek validitas form
  validationErrors.email = ""; // Menghapus error validasi email
  validationErrors.password = ""; // Menghapus error validasi password

  if (!user.email) {
    // Mengecek apakah email kosong
    validationErrors.email = "Email is required"; // Pesan error jika email kosong
    isValid = false; // Form tidak valid
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    // Mengecek format email dengan regex
    validationErrors.email = "Invalid email format"; // Pesan error jika format email tidak valid
    isValid = false; // Form tidak valid
  }

  if (!user.password) {
    // Mengecek apakah password kosong
    validationErrors.password = "Password is required"; // Pesan error jika password kosong
    isValid = false; // Form tidak valid
  }

  return isValid; // Mengembalikan status validitas form
};

// reCAPTCHA Handlers
const onRecaptchaVerify = (token) => {
  // Handler saat reCAPTCHA berhasil diverifikasi
  recaptchaToken.value = token; // Menyimpan token reCAPTCHA
  isRecaptchaVerified.value = true; // Menandakan reCAPTCHA sudah diverifikasi
};

const onRecaptchaExpire = () => {
  // Handler saat reCAPTCHA kedaluwarsa
  recaptchaToken.value = ""; // Menghapus token
  isRecaptchaVerified.value = false; // Menandakan reCAPTCHA belum diverifikasi
};

const onRecaptchaError = () => {
  // Handler saat terjadi error pada reCAPTCHA
  recaptchaToken.value = ""; // Menghapus token
  isRecaptchaVerified.value = false; // Menandakan reCAPTCHA belum diverifikasi
  showError("reCAPTCHA error occurred. Please try again."); // Menampilkan pesan error
};

const vueRecaptchaApiLoaded = () => {
  // Handler saat API reCAPTCHA berhasil dimuat
  console.log("reCAPTCHA API loaded"); // Menampilkan log bahwa API berhasil dimuat
};

// Alert Handlers
const showError = (message) => {
  // Fungsi untuk menampilkan alert error
  Swal.fire({
    icon: "error", // Ikon error
    title: "Error", // Judul alert
    text: message, // Pesan error
    customClass: {
      confirmButton: "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded", // Kustomisasi tombol konfirmasi
    },
  });
};

const showSuccess = async (message) => {
  // Fungsi untuk menampilkan alert sukses
  await Swal.fire({
    icon: "success", // Ikon sukses
    title: "Success", // Judul alert
    text: message, // Pesan sukses
    timer: 2000, // Menampilkan alert selama 2 detik
    showConfirmButton: false, // Menyembunyikan tombol konfirmasi
  });
};

// Login Handler
const handleLogin = async () => {
  if (!isRecaptchaVerified.value) {
    // Mengecek apakah reCAPTCHA sudah diverifikasi
    showError("Please complete the reCAPTCHA verification"); // Menampilkan pesan error jika reCAPTCHA belum diverifikasi
    return;
  }

  if (!validateForm()) {
    // Mengecek apakah form valid
    return; // Jika tidak valid, return
  }

  isLoading.value = true; // Menandakan status sedang loading

  try {
    const response = await Api.post("/api/login", {
      // Mengirim request login ke API
      email: user.email, // Mengirimkan email pengguna
      password: user.password, // Mengirimkan password pengguna
      captchaToken: recaptchaToken.value, // Mengirimkan token reCAPTCHA
    });

    const userData = {
      // Menyusun data pengguna dari response API
      username: response.data.data.user.username || user.email, // Jika username kosong, gunakan email
      email: response.data.data.user.email, // Menyimpan email pengguna
      role: response.data.data.user.role, // Menyimpan role pengguna
    };

    authStore.login(response.data.data.token, userData); // Menyimpan token dan data pengguna di store
    await showSuccess("Login successful!"); // Menampilkan alert sukses

    // Route based on user role
    const routeMap = {
      // Mapping role ke rute yang sesuai
      ADMIN: "dashboardadmin", // Role ADMIN diarahkan ke dashboardadmin
      USER: "dashboarduser", // Role USER diarahkan ke dashboarduser
    };

    const targetRoute = routeMap[userData.role]; // Menentukan rute tujuan berdasarkan role pengguna
    if (targetRoute) {
      // Mengecek apakah rute ditemukan
      router.push({ name: targetRoute }); // Mengarahkan ke rute tujuan
    } else {
      showError("Invalid user role detected"); // Menampilkan pesan error jika role tidak valid
    }
  } catch (error) {
    console.error("Login error:", error); // Menampilkan log jika terjadi error saat login
    showError(error.response?.data?.message || "An error occurred during login"); // Menampilkan pesan error
  } finally {
    isLoading.value = false; // Mengubah status loading menjadi false setelah proses selesai
  }
};

onMounted(() => {
  window.vueRecaptchaApiLoaded = () => {
    // Menginisialisasi fungsi saat API reCAPTCHA dimuat
    console.log("reCAPTCHA API loaded successfully"); // Menampilkan log bahwa API berhasil dimuat
  };
});
</script>
