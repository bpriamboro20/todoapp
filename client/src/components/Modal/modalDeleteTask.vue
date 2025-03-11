<script setup>
// Mengimpor 'ref', 'defineEmits', dan 'defineProps' dari Vue untuk reaktivitas dan komunikasi antar komponen
import { ref, defineEmits, defineProps } from "vue";
import Swal from "sweetalert2"; // Mengimpor SweetAlert2 untuk menampilkan notifikasi

// Mendefinisikan emits untuk berkomunikasi dengan komponen parent
const emit = defineEmits(["closeModalDelete", "deleteTask"]);

// Mendefinisikan props untuk menerima data task yang akan dihapus
const props = defineProps({
  task: {
    type: Object, // Menyatakan bahwa task adalah objek
    required: true, // Task harus ada saat komponen digunakan
  },
});

// State untuk mengontrol visibilitas modal
const isModalOpen = ref(true); // Menyimpan status modal apakah terbuka atau tertutup

// Fungsi untuk menutup modal dan mengirimkan event ke parent
const closeModal = () => {
  isModalOpen.value = false; // Mengubah status modal menjadi tertutup
  emit("closeModalDelete"); // Mengirimkan event ke parent untuk menutup modal
};

// Fungsi untuk mengonfirmasi penghapusan task
const confirmDelete = async () => {
  // Memeriksa apakah task ada dan memiliki ID
  if (props.task && props.task.id) {
    try {
      // Simulasikan aksi penghapusan (misalnya, panggilan API)
      // Anda bisa mengganti ini dengan logika penghapusan sebenarnya
      await new Promise((resolve) => setTimeout(resolve, 500)); // Menunggu 500ms untuk simulasi

      // Jika berhasil, tampilkan pesan sukses menggunakan SweetAlert2
      Swal.fire({
        title: "Success!", // Judul pesan
        text: "Task deleted successfully.", // Teks pesan
        icon: "success", // Ikon sukses
        timer: 2000, // Durasi pesan tampil selama 2 detik
        showConfirmButton: false, // Menyembunyikan tombol konfirmasi
      });

      // Emit event untuk menghapus task dengan ID yang diterima
      emit("deleteTask", props.task.id); // Mengirimkan ID task yang akan dihapus
      closeModal(); // Menutup modal setelah penghapusan berhasil
    } catch (error) {
      // Jika gagal, tampilkan pesan error menggunakan SweetAlert2
      Swal.fire({
        title: "Error!", // Judul pesan
        text: "Failed to delete task. Please try again.", // Teks pesan error
        icon: "error", // Ikon error
      });
    }
  } else {
    // Jika task tidak valid, tampilkan pesan error
    Swal.fire({
      title: "Error!", // Judul pesan
      text: "Task data is invalid.", // Teks pesan error
      icon: "error", // Ikon error
    });
  }
};
</script>

<template>
  <!-- Modal container, hanya ditampilkan jika isModalOpen bernilai true -->
  <div
    v-if="isModalOpen"
    class="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center"
  >
    <!-- Overlay yang menghalangi interaksi dengan konten di belakang modal -->
    <div
      aria-hidden="true"
      class="fixed inset-0 w-full h-full bg-black/50 cursor-pointer"
      @click="closeModal"
    ></div>

    <!-- Konten modal -->
    <div class="relative w-full pointer-events-none transition my-auto p-4">
      <div class="relative mx-auto max-w-sm w-full py-2 bg-white rounded-xl dark:bg-gray-800 pointer-events-auto">
        <!-- Tombol close untuk menutup modal -->
        <button
          type="button"
          class="absolute top-2 right-2 rtl:right-auto rtl:left-2"
          @click="closeModal"
        >
          <svg
            xlink:title="Close"
            class="h-4 w-4 text-gray-400 transition-all ease-in-out duration-500 cursor-pointer hover:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Close</span>
        </button>

        <!-- Header modal dengan judul dan penjelasan singkat -->
        <div class="p-2 space-y-2 text-center dark:text-white">
          <h2 class="text-xl font-bold tracking-tight">Delete Task</h2>
          <p class="text-gray-500">Are you sure you want to delete this task?</p>
        </div>

        <!-- Divider -->
        <div
          aria-hidden="true"
          class="border border-gray-400"
        ></div>

        <!-- Ikon peringatan -->
        <div class="flex justify-center py-8">
          <img
            src="data:image/png;base64,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"
            alt="box-important--v1"
          />
        </div>

        <!-- Divider -->
        <div
          aria-hidden="true"
          class="border border-gray-400"
        ></div>

        <!-- Tombol aksi modal: Cancel dan Confirm -->
        <div class="px-4 py-3">
          <div class="grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-2">
            <button
              type="button"
              class="inline-flex items-center justify-center px-4 py-1 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-lg transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
              @click="closeModal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="inline-flex items-center justify-center px-4 py-1 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              @click="confirmDelete"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
