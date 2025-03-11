<script setup>
// Import modul Vue dan library terkait
import { ref, onMounted, onUpdated, computed } from "vue";
import { useAuthStore } from "@/stores/authStore"; // Import store autentikasi
import Api from "@/services/api"; // Import instance API
import Cookies from "js-cookie"; // Import untuk mengelola cookies
import Swal from "sweetalert2"; // Import untuk menampilkan alert

// Import komponen tombol dan modal
import buttonEdit from "./buttonEdit.vue";
import buttonDelete from "./buttonDelete.vue";
import buttonSetasdone from "./buttonSetasdone.vue";
import buttonSetasundone from "./buttonSetasundone.vue";
import modalUpdateTask from "../Modal/modalUpdateTask.vue";
import modalDeleteTask from "../Modal/modalDeleteTask.vue";

// State dan referensi
const authStore = useAuthStore(); // Menggunakan store untuk autentikasi
const toDoListItem = ref([]); // Menyimpan daftar tugas
const isModalUpdateVisible = ref(false); // Kontrol visibilitas modal update
const isModalDeleteVisible = ref(false); // Kontrol visibilitas modal delete
const selectedTask = ref(null); // Menyimpan task yang dipilih
const activeFilter = ref("all"); // Filter aktif, default "all"

// Daftar tugas yang sudah difilter
const filteredTasks = computed(() => {
  if (activeFilter.value === "done") {
    return toDoListItem.value.filter((task) => task.status); // Filter task selesai
  } else if (activeFilter.value === "undone") {
    return toDoListItem.value.filter((task) => !task.status); // Filter task belum selesai
  }
  return toDoListItem.value; // Tampilkan semua task
});

// Fungsi untuk menampilkan alert
const showAlert = (message, type = "error") => {
  Swal.fire({
    icon: type,
    title: type === "success" ? "Success" : "Error",
    text: message,
    timer: type === "success" ? 1500 : undefined,
    showConfirmButton: type !== "success",
  });
};

// Fungsi untuk mengubah status task (done/undone)
const handleStatusToggle = async (task) => {
  try {
    const token = authStore.user?.token || Cookies.get("token"); // Ambil token dari store atau cookie
    if (!token) throw new Error("No authentication token found");

    Api.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Set header Authorization
    const newStatus = !task.status; // Toggle status task
    const response = await Api.put(`/api/users/tasks/${task.id}`, {
      name: task.name,
      priority: task.priority,
      status: newStatus,
    });

    if (response.data.success) {
      await fetchTasks(); // Perbarui daftar tugas
    } else {
      throw new Error(response.data.message || "Failed to update task status");
    }
  } catch (error) {
    console.error("Error updating task status:", error);
    showAlert(error.response?.data?.message || error.message || "Failed to update task status");
  }
};

// Fungsi untuk mengambil daftar tugas dari API
const fetchTasks = async () => {
  try {
    const token = authStore.user?.token || Cookies.get("token");
    if (!token) throw new Error("No authentication token found");

    Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await Api.get("/api/users/tasks");

    if (response.data?.data) {
      toDoListItem.value = response.data.data.map((task) => ({
        id: task.id,
        name: task.name,
        priority: task.priority,
        status: task.status,
      }));
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

// Fungsi untuk membuka modal update
const openModalUpdate = (task) => {
  selectedTask.value = { ...task }; // Set task yang dipilih
  isModalUpdateVisible.value = true; // Tampilkan modal update
};

// Fungsi untuk membuka modal delete
const openModalDelete = (task) => {
  selectedTask.value = { ...task }; // Set task yang dipilih
  isModalDeleteVisible.value = true; // Tampilkan modal delete
};

// Fungsi untuk menutup modal update
const closeModalUpdate = () => {
  isModalUpdateVisible.value = false;
  selectedTask.value = null;
};

// Fungsi untuk menutup modal delete
const closeModalDelete = () => {
  isModalDeleteVisible.value = false;
  selectedTask.value = null;
};

// Fungsi untuk mengupdate task
const handleTaskUpdate = async (updatedTask) => {
  try {
    const token = authStore.user?.token || Cookies.get("token");
    if (!token) throw new Error("No authentication token found");

    Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await Api.put(`/api/users/tasks/${updatedTask.id}`, {
      name: updatedTask.name,
      priority: updatedTask.priority,
      status: updatedTask.status,
    });

    if (response.data.success) {
      await fetchTasks(); // Refresh daftar tugas
      showAlert("Task updated successfully!", "success"); // Tampilkan pesan sukses
    } else {
      throw new Error(response.data.message || "Failed to update task");
    }
  } catch (error) {
    console.error("Error updating task:", error);
    showAlert(error.response?.data?.message || error.message || "Failed to update task");
  }
};

// Fungsi untuk menghapus task
const deleteTask = async (taskId) => {
  try {
    const token = authStore.user?.token || Cookies.get("token");
    if (!token) throw new Error("No authentication token found");

    Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await Api.delete(`/api/users/tasks/${taskId}`);

    await fetchTasks(); // Perbarui daftar tugas setelah dihapus
    closeModalDelete(); // Tutup modal delete
  } catch (error) {
    console.error("Error deleting task:", error);
    showAlert(error.response?.data?.message || error.message || "Failed to delete task");
  }
};

// Fungsi untuk mengatur filter daftar tugas
const setFilter = (filter) => {
  activeFilter.value = filter; // Set filter aktif
};

// Lifecycle hooks
onMounted(() => {
  fetchTasks(); // Ambil daftar tugas saat komponen dimuat
  authStore.reloadAuthState(); // Perbarui status autentikasi
});

onUpdated(() => {
  fetchTasks(); // Perbarui daftar tugas saat komponen diperbarui
});
</script>

<template>
  <!-- Tombol Filter -->
  <div class="mt-5 flex justify-between w-full gap-2 text-xs sm:text-md whitespace-nowrap">
    <button
      @click="setFilter('all')"
      :class="{ 'bg-cyan-700': activeFilter === 'all', 'bg-cyan-600': activeFilter !== 'all' }"
      class="flex-1 hover:bg-cyan-700 active:bg-cyan-900 py-1 sm:py-2 px-3 text-white font-semibold rounded-md"
    >
      Show all
    </button>
    <button
      @click="setFilter('done')"
      :class="{ 'bg-cyan-700': activeFilter === 'done', 'bg-cyan-600': activeFilter !== 'done' }"
      class="flex-1 hover:bg-cyan-700 active:bg-cyan-900 py-1 sm:py-2 px-3 text-white font-bold rounded-md"
    >
      Done only
    </button>
    <button
      @click="setFilter('undone')"
      :class="{ 'bg-cyan-700': activeFilter === 'undone', 'bg-cyan-600': activeFilter !== 'undone' }"
      class="flex-1 hover:bg-cyan-700 active:bg-cyan-900 py-1 sm:py-2 px-3 text-white font-bold rounded-md"
    >
      Undone only
    </button>
  </div>

  <div class="container w-full mx-auto py-4 overflow-x-auto lg:overflow-visible">
    <!-- Daftar Tugas -->
    <table class="w-full table-auto">
      <thead>
        <tr class="bg-cyan-600 text-white">
          <th class="py-2 px-4 text-md md:text-lg text-center font-bold w-7/12 sm:w-12">Task Name</th>
          <th class="py-2 px-4 text-md md:text-lg text-center font-bold w-5/12 sm:w-12">Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- Show "Maaf belum ada data" if no tasks in the "done" filter -->
        <tr v-if="filteredTasks.length === 0 && activeFilter === 'done'">
          <td
            colspan="2"
            class="py-3 px-4 text-center text-gray-500 font-bold"
          >
            Maaf belum ada data
          </td>
        </tr>

        <tr v-else-if="filteredTasks.length === 0 && activeFilter === 'undone'">
          <td
            colspan="2"
            class="py-3 px-4 text-center text-gray-500 font-bold"
          >
            Maaf belum ada data
          </td>
        </tr>

        <tr v-else-if="filteredTasks.length === 0 && activeFilter === 'all'">
          <td
            colspan="2"
            class="py-3 px-4 text-center text-gray-500 font-bold"
          >
            Maaf belum ada data
          </td>
        </tr>

        <!-- Daftar tugas yang difilter -->
        <tr
          v-else
          v-for="item in filteredTasks"
          :key="item.id"
          class="border-b-2 border-gray-300"
        >
          <td class="py-3 ps-4 pe-10 whitespace-nowrap">
            <p
              v-if="item.status"
              class="font-bold text-xs md:text-xl"
            >
              <span class="line-through decoration-4 decoration-red-600"> {{ item.name }} </span>

              <span
                v-if="item.priority === 'High'"
                class="rounded-md ms-2 me-1 bg-red-500 py-0.5 px-1 border border-transparent text-xs text-white transition-all shadow-sm"
                >{{ item.priority }}</span
              >
              <span
                v-else-if="item.priority === 'Medium'"
                class="rounded-md ms-2 me-1 bg-yellow-500 py-0.5 px-1 border border-transparent text-xs text-white transition-all shadow-sm"
                >{{ item.priority }}</span
              >
              <span
                v-else
                class="rounded-md ms-2 me-1 bg-green-500 py-0.5 px-1 border border-transparent text-xs text-white transition-all shadow-sm"
                >{{ item.priority }}
              </span>
            </p>
            <p
              v-else
              class="font-bold text-xs md:text-xl"
            >
              <span> {{ item.name }} </span>

              <span
                v-if="item.priority === 'High'"
                class="rounded-md ms-2 me-1 bg-red-500 py-0.5 px-1 border border-transparent text-xs text-white transition-all shadow-sm"
                >{{ item.priority }}</span
              >
              <span
                v-else-if="item.priority === 'Medium'"
                class="rounded-md ms-2 me-1 bg-yellow-500 py-0.5 px-1 border border-transparent text-xs text-white transition-all shadow-sm"
                >{{ item.priority }}</span
              >
              <span
                v-else
                class="rounded-md ms-2 me-1 bg-green-500 py-0.5 px-1 border border-transparent text-xs text-white transition-all shadow-sm"
                >{{ item.priority }}</span
              >
            </p>
          </td>
          <td class="py-3 px-4 flex justify-end gap-1 md:gap-3">
            <buttonEdit @click="openModalUpdate(item)" />
            <buttonDelete @click="openModalDelete(item)" />
            <buttonSetasdone
              v-if="!item.status"
              @click="handleStatusToggle(item)"
            />
            <buttonSetasundone
              v-else
              @click="handleStatusToggle(item)"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Update Task -->
    <modalUpdateTask
      v-if="isModalUpdateVisible"
      :task="selectedTask"
      @closeModalUpdate="closeModalUpdate"
      @updateTask="handleTaskUpdate"
    />

    <!-- Modal Delete Task -->
    <modalDeleteTask
      v-if="isModalDeleteVisible"
      :task="selectedTask"
      @closeModalDelete="closeModalDelete"
      @deleteTask="deleteTask(selectedTask.id)"
    />
  </div>
</template>
