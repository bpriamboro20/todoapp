<script setup>
// Import ref, watch, dan defineEmits dari Vue untuk mengelola reaktivitas dan event
import { ref, watch, defineEmits } from "vue";
// Import instance API untuk melakukan request HTTP
import Api from "@/services/api";
// Import SweetAlert2 untuk menampilkan alert yang lebih menarik
import Swal from "sweetalert2";

// Emit untuk mengirim event task baru ke komponen induk
const emit = defineEmits();

// State untuk menyimpan input task
const task = ref("");
// State untuk memvalidasi apakah task valid atau tidak
const isTaskValid = ref(false);

// Pantau perubahan pada `task` dan lakukan validasi secara langsung
watch(task, (value) => {
  // Validasi: task dianggap valid jika panjang teks setelah trim lebih dari 0
  isTaskValid.value = value.trim().length > 0;
});

// Fungsi untuk menangani proses create task
const createTask = async () => {
  try {
    // Kirim request POST ke endpoint API untuk membuat task baru
    const response = await Api.post("/api/users/tasks", { name: task.value });

    console.log("Response from API:", response); // Log untuk debugging

    // Cek jika response berhasil (status 201 dan success true)
    if (response.status === 201 && response.data.success) {
      // Task berhasil ditambahkan ke database
      const newTask = {
        id: response.data.data.id, // ID task yang baru dibuat
        task: task.value, // Nama task
        statusDone: response.data.data.status, // Status task (misalnya selesai atau belum)
      };

      // Emit event ke komponen induk untuk menambahkan task baru ke daftar
      emit("task-added", newTask);

      // Tampilkan notifikasi sukses menggunakan SweetAlert2
      Swal.fire({
        title: "Task berhasil ditambahkan!", // Judul alert
        icon: "success", // Ikon sukses
        text: "Task telah berhasil ditambahkan.", // Pesan alert
        timer: 2000, // Alert otomatis menghilang setelah 2 detik
        showConfirmButton: false, // Tidak menampilkan tombol konfirmasi
      });

      // Reset input task setelah berhasil ditambahkan
      task.value = "";

      // Emit event untuk memanggil ulang fungsi fetchTasks di komponen induk
      emit("fetch-tasks");
    } else {
      // Jika response tidak sesuai, lempar error
      throw new Error("Data tidak valid dari server.");
    }
  } catch (error) {
    console.error("Error:", error); // Log error untuk debugging

    // Ambil pesan error dari response API atau gunakan pesan default
    const errorMessage = error.response?.data?.message || error.message || "Something went wrong!";

    // Tampilkan notifikasi error menggunakan SweetAlert2
    Swal.fire({
      icon: "error", // Ikon error
      title: "Error", // Judul alert
      text: errorMessage, // Pesan error
      customClass: {
        confirmButton: "bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-36 mb-5 rounded", // Kustomisasi tombol konfirmasi
      },
    });
  }
};
</script>

<template>
  <div class="relative w-full">
    <!-- Input Task -->
    <input
      id="task"
      name="task"
      type="text"
      v-model="task"
      placeholder="Input your task or activity here!"
      class="w-3/4 sm:w-full p-2 pr-24 font-semibold border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
    />

    <!-- Tombol Tambahkan -->
    <button
      :disabled="!isTaskValid"
      @click="createTask"
      class="absolute bg-cyan-600 hover:bg-cyan-700 top-0 right-0 h-full px-2 sm:px-8 rounded-r-md font-bold text-white w-1/4 border-l-2 border-black disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Add
    </button>
  </div>
</template>
