<script setup>
import { ref, watch, defineProps, defineEmits } from "vue"; // Mengimpor modul Vue untuk reaktivitas, props, dan komunikasi antar komponen
import Swal from "sweetalert2"; // Mengimpor SweetAlert2 untuk menampilkan pesan notifikasi

// Mendefinisikan props untuk menerima data task yang akan diperbarui
const props = defineProps({
  task: {
    type: Object, // Menerima task dalam bentuk objek
    required: true, // Task harus ada saat komponen digunakan
  },
});

// Mendefinisikan emits untuk berkomunikasi dengan komponen parent
const emit = defineEmits(["closeModalUpdate", "updateTask"]);

// State untuk mengontrol visibilitas modal
const isModalOpen = ref(true); // Modal terbuka secara default

// State untuk menyimpan data task yang diperbarui
const updatedTask = ref({}); // Menyimpan data task yang sudah diperbarui

// Watcher untuk memantau perubahan pada props.task
watch(
  () => props.task, // Memantau perubahan pada task yang diterima
  (newTask) => {
    if (newTask) {
      // Mengupdate data task yang akan diperbarui
      updatedTask.value = {
        id: newTask.id, // Menyimpan ID task
        name: newTask.name, // Menyimpan nama task
        priority: newTask.priority, // Menyimpan prioritas task
        status: String(newTask.status), // Mengonversi status boolean menjadi string untuk elemen select
      };
    }
  },
  { immediate: true } // Menjalankan watcher segera setelah komponen dimuat
);

// Fungsi untuk menutup modal dan mengirimkan event ke parent
const closeModal = () => {
  isModalOpen.value = false; // Menutup modal
  emit("closeModalUpdate"); // Mengirimkan event ke parent untuk menutup modal
};

// Fungsi untuk mengonfirmasi pembaruan task
const handleUpdate = async () => {
  try {
    // Validasi untuk memastikan nama task tidak kosong
    if (!updatedTask.value.name || updatedTask.value.name.trim() === "") {
      throw new Error("Task name cannot be empty"); // Menampilkan error jika nama task kosong
    }

    // Validasi untuk memastikan status task valid
    if (!["true", "false"].includes(updatedTask.value.status)) {
      throw new Error("Invalid task status"); // Menampilkan error jika status tidak valid
    }

    // Menyiapkan data task yang diperbarui untuk dikirim ke parent
    const taskData = {
      id: updatedTask.value.id, // Menyertakan ID task
      name: updatedTask.value.name.trim(), // Menghilangkan spasi ekstra di nama task
      priority: updatedTask.value.priority, // Menyertakan prioritas task
      status: updatedTask.value.status === "true" || updatedTask.value.status === true, // Mengonversi status kembali ke boolean
    };

    // Mengirimkan event untuk memperbarui task
    emit("updateTask", taskData);

    // Menampilkan notifikasi sukses menggunakan SweetAlert2
    await Swal.fire({
      icon: "success", // Ikon sukses
      title: "Task Updated", // Judul pesan sukses
      text: "Task has been successfully updated.", // Teks pesan sukses
      timer: 1500, // Pesan otomatis hilang setelah 1,5 detik
      showConfirmButton: false, // Tidak ada tombol konfirmasi
    });

    closeModal(); // Menutup modal setelah pembaruan selesai
  } catch (error) {
    // Jika ada error, tampilkan pesan error
    console.error("Error updating task:", error); // Menampilkan error di konsol untuk debug
    await Swal.fire({
      icon: "error", // Ikon error
      title: "Update Failed", // Judul pesan error
      text: error.message || "Failed to update task. Please try again.", // Teks pesan error
      customClass: {
        confirmButton: "bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded", // Kustomisasi tombol konfirmasi
      },
    });
  }
};
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
          class="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          @click="closeModal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Header -->
        <div class="p-2 space-y-2 text-center dark:text-white">
          <h2
            class="text-xl font-bold tracking-tight"
            id="page-action.heading"
          >
            Update Task
          </h2>
          <p class="text-gray-500">Are you sure you want to update this task?</p>
          <!-- Pesan konfirmasi dalam Bahasa Indonesia -->
        </div>

        <!-- Divider -->
        <div
          aria-hidden="true"
          class="border border-gray-400"
        ></div>

        <!-- Konten form -->
        <div class="grid grid-cols-1 place-items-center px-4 py-3">
          <form class="space-y-4 w-full">
            <div>
              <label
                for="task"
                class="block text-gray-700 mb-2"
              >
                Task Name
              </label>
              <input
                id="task"
                type="text"
                v-model="updatedTask.name"
                placeholder="Enter task name"
                required
                class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                for="priority"
                class="block text-gray-700 mb-2"
              >
                Priority
              </label>
              <select
                id="priority"
                v-model="updatedTask.priority"
                required
                class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label
                for="status"
                class="block text-gray-700 mb-2"
              >
                Status
              </label>
              <select
                id="status"
                v-model="updatedTask.status"
                required
                class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="true">Done</option>
                <option value="false">Undone</option>
              </select>
            </div>
          </form>
        </div>

        <!-- Divider -->
        <div
          aria-hidden="true"
          class="border border-gray-400"
        ></div>

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
              type="submit"
              class="inline-flex items-center justify-center px-4 py-1 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              @click="handleUpdate"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
