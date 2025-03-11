<script setup>
import { ref, computed, defineProps, defineEmits } from "vue"; // Mengimpor modul Vue untuk reaktivitas, props, dan komunikasi antar komponen
import Swal from "sweetalert2"; // Mengimpor SweetAlert2 untuk notifikasi
import usernameInput from "../CompInputanForm/usernameInput.vue"; // Mengimpor komponen usernameInput
import emailInput from "../CompInputanForm/emailInput.vue"; // Mengimpor komponen emailInput
import passwordInput from "../CompInputanForm/passwordInput.vue"; // Mengimpor komponen passwordInput

// Mendefinisikan props untuk menerima data pengguna dari komponen parent
const props = defineProps({
  user: Object, // Menerima data pengguna dalam bentuk objek
});

// Mendefinisikan emits untuk mengirimkan data kembali ke parent
const emit = defineEmits(); // Emit event untuk berkomunikasi dengan komponen parent

// State untuk mengontrol visibilitas modal
const isModalOpen = ref(true); // Modal terbuka secara default

// Membuat referensi untuk data pengguna yang akan diupdate, dimulai dengan data dari props
const updatedUser = ref({ ...props.user }); // Menyalin data user yang diterima dari parent untuk diperbarui

// Fungsi untuk menutup modal dan mengirimkan event ke parent
const closeModal = () => {
  isModalOpen.value = false; // Menutup modal
  emit("closeModalUpdate"); // Emit event untuk menutup modal di parent
};

// Fungsi untuk menangani pembaruan data pengguna
const handleUpdate = async () => {
  try {
    // Mensimulasikan panggilan API atau logika untuk memperbarui data pengguna
    const response = await emit("updateUser", updatedUser.value); // Mengirimkan data pengguna yang telah diperbarui ke parent
    // Menampilkan notifikasi sukses jika pembaruan berhasil
    Swal.fire({
      icon: "success", // Ikon sukses
      title: "Pengguna Diperbarui", // Judul sukses dalam Bahasa Indonesia
      text: "Data pengguna berhasil diperbarui.", // Pesan sukses dalam Bahasa Indonesia
      timer: 1500, // Otomatis menutup setelah 1.5 detik
      showConfirmButton: false, // Menyembunyikan tombol konfirmasi
    });
  } catch (error) {
    // Menampilkan notifikasi error jika terjadi kesalahan
    Swal.fire({
      icon: "error", // Ikon error
      title: "Gagal Memperbarui", // Judul error dalam Bahasa Indonesia
      text: "Terjadi kesalahan saat memperbarui data pengguna. Silakan coba lagi.", // Pesan error dalam Bahasa Indonesia
      customClass: {
        confirmButton: "bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-36 mb-5 rounded", // Styling kustom untuk tombol konfirmasi
      },
    });
  }
};

// Properti computed untuk memeriksa apakah password valid (minimal 8 karakter)
const isPasswordValid = computed(() => {
  return updatedUser.value.password && updatedUser.value.password.length >= 8; // Memeriksa apakah password memiliki panjang minimal 8 karakter
});
</script>

<template>
  <!-- Container untuk modal -->
  <div
    v-if="isModalOpen"
    class="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center"
  >
    <!-- Overlay -->
    <div
      aria-hidden="true"
      class="fixed inset-0 w-full h-full bg-black/50 cursor-pointer"
      @click="closeModal"
    ></div>

    <!-- Konten modal -->
    <div class="relative w-full pointer-events-none transition my-auto p-4">
      <div class="relative mx-auto max-w-sm w-full py-2 bg-white rounded-xl dark:bg-gray-800 pointer-events-auto">
        <!-- Tombol tutup -->
        <button
          type="button"
          class="absolute top-2 right-2 rtl:right-auto rtl:left-2"
          @click="closeModal"
        >
          <svg
            xlinkTitle="Close"
            class="h-4 w-4 text-gray-400 transition-all ease-in-out duration-500 cursor-pointer hover:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Tutup</span>
        </button>

        <!-- Header -->
        <div class="p-2 space-y-2 text-center dark:text-white">
          <h2
            class="text-xl font-bold tracking-tight"
            id="page-action.heading"
          >
            Update User
          </h2>
          <p class="text-gray-500">Are you sure you want to update this user?</p>
          <!-- Pesan konfirmasi dalam Bahasa Indonesia -->
        </div>

        <!-- Divider -->
        <div
          aria-hidden="true"
          class="border border-gray-400"
        ></div>

        <!-- Konten form -->
        <div class="grid grid-cols-1 place-items-center px-4 py-3">
          <form
            noValidate
            class="space-y-4 w-full"
          >
            <div class="w-full">
              <!-- Input form untuk username, email, dan password -->
              <usernameInput v-model="updatedUser.username" />
              <emailInput v-model="updatedUser.email" />
              <passwordInput v-model="updatedUser.password" />
            </div>
          </form>
        </div>

        <!-- Divider -->
        <div
          aria-hidden="true"
          class="border border-gray-400"
        ></div>

        <!-- Tombol aksi -->
        <div class="px-4 py-3">
          <div class="grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-2">
            <button
              type="button"
              class="inline-flex items-center justify-center px-4 py-1 min-h-[2.25rem] text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-lg transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-600 focus:bg-primary-50 focus:text-primary-600 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-500 dark:focus:text-primary-400 dark:focus:border-primary-400 dark:focus:bg-gray-800"
              @click="closeModal"
            >
              Batal
            </button>

            <button
              type="button"
              v-if="isPasswordValid"
              class="inline-flex items-center justify-center px-4 py-1 min-h-[2.25rem] text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white focus:bg-[#11071F] focus:ring-offset-[#11071F] border-transparent"
              @click="handleUpdate"
            >
              <span class="flex items-center gap-1">
                <span>Perbarui</span>
              </span>
            </button>

            <button
              type="button"
              v-else
              disabled
              class="inline-flex items-center justify-center px-4 py-1 min-h-[2.25rem] text-sm font-medium text-white bg-gray-400 hover:bg-gray-500 rounded-lg shadow transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white focus:bg-[#11071F] focus:ring-offset-[#11071F] border-transparent"
              @click="handleUpdate"
            >
              <span class="flex items-center gap-1">
                <span>Perbarui</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
