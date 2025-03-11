<template>
  <div class="w-auto">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search by task or author"
      class="w-full mb-6 rounded-lg px-4 py-2 border border-gray-300"
    />
    <div class="w-full mx-auto overflow-x-auto">
      <table class="w-full table-auto border-collapse font-semibold mb-5">
        <thead>
          <tr class="bg-cyan-600 text-white">
            <th
              class="border font-bold border-black px-4 py-2 cursor-pointer whitespace-nowrap"
              @click="sortTasks('name')"
            >
              Task
              <span class="ms-2 inline-block"
                ><img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA1UlEQVR4nJ3QsWoCURCF4SUPIAhBQbBIkSJ1WqtUqdJoZbGks7PzYfJMKQSxSGGRIk+wl53/7JI4YlhhSa67qwOnu9/cmUmShnL3m+SaknQPbCQ9XATNbCzpU5JL+gLuOsEQwgD4qOApuzzPR40wy7JbYPsH/ubYMIQwjEJ37wHvMVhrsHb3fmzPVNJbW8ws/YePVy3L8rEtil0feAJoGbsAnqN7S3oByjPwW9Ks8eKSptXDOvwpimLeCGsrvAL7Cu6BRSdYm2BZ/by6CJ7KzCZXwS51AM17TnmSXJ79AAAAAElFTkSuQmCC"
                  alt="sort"
              /></span>
            </th>
            <th
              class="border font-bold border-black px-4 py-2 cursor-pointer whitespace-nowrap"
              @click="sortTasks('authorUsername')"
            >
              Author
              <span class="ms-2 inline-block"
                ><img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA1UlEQVR4nJ3QsWoCURCF4SUPIAhBQbBIkSJ1WqtUqdJoZbGks7PzYfJMKQSxSGGRIk+wl53/7JI4YlhhSa67qwOnu9/cmUmShnL3m+SaknQPbCQ9XATNbCzpU5JL+gLuOsEQwgD4qOApuzzPR40wy7JbYPsH/ubYMIQwjEJ37wHvMVhrsHb3fmzPVNJbW8ws/YePVy3L8rEtil0feAJoGbsAnqN7S3oByjPwW9Ks8eKSptXDOvwpimLeCGsrvAL7Cu6BRSdYm2BZ/by6CJ7KzCZXwS51AM17TnmSXJ79AAAAAElFTkSuQmCC"
                  alt="sort"
              /></span>
            </th>
            <th
              class="border font-bold border-black px-4 py-2 cursor-pointer whitespace-nowrap"
              @click="sortTasks('priority')"
            >
              Priority
              <span class="ms-2 inline-block"
                ><img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA1UlEQVR4nJ3QsWoCURCF4SUPIAhBQbBIkSJ1WqtUqdJoZbGks7PzYfJMKQSxSGGRIk+wl53/7JI4YlhhSa67qwOnu9/cmUmShnL3m+SaknQPbCQ9XATNbCzpU5JL+gLuOsEQwgD4qOApuzzPR40wy7JbYPsH/ubYMIQwjEJ37wHvMVhrsHb3fmzPVNJbW8ws/YePVy3L8rEtil0feAJoGbsAnqN7S3oByjPwW9Ks8eKSptXDOvwpimLeCGsrvAL7Cu6BRSdYm2BZ/by6CJ7KzCZXwS51AM17TnmSXJ79AAAAAElFTkSuQmCC"
                  alt="sort"
              /></span>
            </th>
            <th
              class="border font-bold border-black px-4 py-2 cursor-pointer whitespace-nowrap"
              @click="sortTasks('createdAt')"
            >
              Created At
              <span class="ms-2 inline-block"
                ><img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA1UlEQVR4nJ3QsWoCURCF4SUPIAhBQbBIkSJ1WqtUqdJoZbGks7PzYfJMKQSxSGGRIk+wl53/7JI4YlhhSa67qwOnu9/cmUmShnL3m+SaknQPbCQ9XATNbCzpU5JL+gLuOsEQwgD4qOApuzzPR40wy7JbYPsH/ubYMIQwjEJ37wHvMVhrsHb3fmzPVNJbW8ws/YePVy3L8rEtil0feAJoGbsAnqN7S3oByjPwW9Ks8eKSptXDOvwpimLeCGsrvAL7Cu6BRSdYm2BZ/by6CJ7KzCZXwS51AM17TnmSXJ79AAAAAElFTkSuQmCC"
                  alt="sort"
              /></span>
            </th>
            <th
              class="border font-bold border-black px-4 py-2 cursor-pointer whitespace-nowrap"
              @click="sortTasks('status')"
            >
              Status
              <span class="ms-2 inline-block"
                ><img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA1UlEQVR4nJ3QsWoCURCF4SUPIAhBQbBIkSJ1WqtUqdJoZbGks7PzYfJMKQSxSGGRIk+wl53/7JI4YlhhSa67qwOnu9/cmUmShnL3m+SaknQPbCQ9XATNbCzpU5JL+gLuOsEQwgD4qOApuzzPR40wy7JbYPsH/ubYMIQwjEJ37wHvMVhrsHb3fmzPVNJbW8ws/YePVy3L8rEtil0feAJoGbsAnqN7S3oByjPwW9Ks8eKSptXDOvwpimLeCGsrvAL7Cu6BRSdYm2BZ/by6CJ7KzCZXwS51AM17TnmSXJ79AAAAAElFTkSuQmCC"
                  alt="sort"
              /></span>
            </th>
            <th class="border font-bold border-black px-4 py-2 whitespace-nowrap">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredTasks.length === 0">
            <td
              class="text-center py-4"
              colspan="6"
            >
              No tasks available
            </td>
          </tr>
          <tr
            v-else
            v-for="item in paginatedTasks"
            :key="item.id"
          >
            <td class="border border-black px-4 py-2 whitespace-nowrap sm:whitespace-normal">{{ item.name }}</td>
            <td class="border border-black px-4 py-2 whitespace-nowrap">{{ item.authorUsername }}</td>
            <td
              v-if="item.priority === 'Low'"
              class="border border-black px-4 py-2 text-green-500 whitespace-nowrap"
            >
              {{ item.priority }}
            </td>
            <td
              v-else-if="item.priority === 'Medium'"
              class="border border-black px-4 py-2 text-yellow-500 whitespace-nowrap"
            >
              {{ item.priority }}
            </td>
            <td
              v-else
              class="border border-black px-4 py-2 text-red-500 whitespace-nowrap"
            >
              {{ item.priority }}
            </td>
            <td class="border border-black px-4 py-2 whitespace-nowrap">{{ formatDate(item.createdAt) }} {{ console.log(item.createdAt) }}</td>
            <td
              class="border border-black px-4 py-2 whitespace-nowrap"
              :class="item.status ? 'text-green-600' : 'text-red-600'"
            >
              {{ item.status ? "Done" : "Undone" }}
            </td>
            <td class="border border-black px-4 py-2 whitespace-nowrap">
              <div class="flex justify-between gap-2">
                <ButtonEdit @click="openModalUpdate(item)" />
                <ButtonDelete @click="openModalDelete(item)" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-star mb-3">
      <ButtonPrint @click="generatePDF" />
    </div>

    <!-- Pagination -->
    <nav
      aria-label="Page navigation example px-2"
      class="flex justify-center"
    >
      <ul class="flex flex-wrap -space-x-px text-sm">
        <li>
          <a
            href="#"
            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
            @click="prevPage"
            >Previous</a
          >
        </li>
        <li
          v-for="page in totalPages"
          :key="page"
        >
          <a
            href="#"
            class="flex items-center justify-center px-3 h-8 leading-tight"
            :class="{
              'text-blue-600 bg-blue-50': currentPage === page,
              'text-gray-500': currentPage !== page,
            }"
            :aria-current="currentPage === page ? 'page' : null"
            @click="currentPage = page"
            >{{ page }}</a
          >
        </li>
        <li>
          <a
            href="#"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
            @click="nextPage"
            >Next</a
          >
        </li>
      </ul>
    </nav>
  </div>

  <modalUpdateTask
    v-if="isModalUpdateVisible"
    :task="selectedTask"
    @closeModalUpdate="closeModalUpdate"
    @updateTask="updateTask"
  />
  <modalDeleteTask
    v-if="isModalDeleteVisible"
    :task="selectedTask"
    @closeModalDelete="closeModalDelete"
    @deleteTask="deleteTask(selectedTask.id)"
  />
</template>

<script setup>
// Mengimpor fungsi dan komponen yang diperlukan dari Vue dan file lainnya
import { ref, computed, onMounted } from "vue";
import ButtonEdit from "./CompInputanForm/buttonEdit.vue";
import ButtonDelete from "./CompInputanForm/buttonDelete.vue";
import ButtonPrint from "./CompInputanForm/buttonPrint.vue";
import modalUpdateTask from "@/components/Modal/modalUpdateTask.vue";
import modalDeleteTask from "@/components/Modal/modalDeleteTask.vue";
import { useAuthStore } from "@/stores/authStore.js";
import Api from "@/services/api";

// Mengimpor pustaka jsPDF untuk membuat PDF
import { jsPDF } from "jspdf";
import "jspdf-autotable";

// Mendeklarasikan beberapa variabel reaktif menggunakan ref
const authStore = useAuthStore(); // Mengakses store autentikasi
const tasks = ref([]); // Menyimpan data task
const searchQuery = ref(""); // Query pencarian untuk filter task
const isModalUpdateVisible = ref(false); // Menyimpan status visibilitas modal update task
const isModalDeleteVisible = ref(false); // Menyimpan status visibilitas modal delete task
const selectedTask = ref(null); // Menyimpan task yang dipilih
const sortOrder = ref({ field: "", direction: "asc" }); // Menyimpan urutan sorting data
const currentPage = ref(1); // Menyimpan halaman yang sedang aktif
const itemsPerPage = 5; // Jumlah item yang ditampilkan per halaman

// Fungsi untuk memformat tanggal
const formatDate = (dateString) => {
  const date = new Date(dateString); // Membuat objek Date dari string
  const day = String(date.getDate()).padStart(2, "0"); // Mengambil hari dan menambahkan 0 jika kurang dari 10
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Mengambil bulan dan menambahkan 0 jika kurang dari 10
  const year = date.getFullYear(); // Mengambil tahun
  const hours = String(date.getHours()).padStart(2, "0"); // Mengambil jam dan menambahkan 0 jika kurang dari 10
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Mengambil menit dan menambahkan 0 jika kurang dari 10
  const seconds = String(date.getSeconds()).padStart(2, "0"); // Mengambil detik dan menambahkan 0 jika kurang dari 10

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`; // Mengembalikan tanggal dalam format yang diinginkan
};

// Fungsi untuk mengambil data task dari API
const fetchDataTask = async () => {
  const token = authStore.token; // Mengambil token dari store autentikasi

  if (!token) {
    // Jika token tidak ada, beri pesan error
    console.error("No token available. User is not authenticated.");
    return;
  }

  try {
    Api.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Menambahkan token ke header API
    const response = await Api.get("api/users/tasks/admin"); // Memanggil API untuk mendapatkan daftar task
    tasks.value = response.data.data; // Menyimpan data task ke dalam variabel tasks
    console.log(tasks.value); // Menampilkan data task di console
  } catch (error) {
    console.error("Error fetching tasks:", error); // Menangani error jika request gagal
    if (error.response && error.response.status === 401) {
      // Jika token tidak valid (unauthorized)
      console.log("Unauthorized access. Please log in again.");
      authStore.logout(); // Logout user jika tidak terautentikasi
    }
  }
};

// Fungsi untuk membuka modal update task
const openModalUpdate = (task) => {
  selectedTask.value = { ...task }; // Menyalin data task yang dipilih
  isModalUpdateVisible.value = true; // Menampilkan modal update task
};

// Fungsi untuk menutup modal update task
const closeModalUpdate = () => {
  isModalUpdateVisible.value = false; // Menyembunyikan modal update task
  selectedTask.value = null; // Menghapus data task yang dipilih
};

// Fungsi untuk membuka modal delete task
const openModalDelete = (task) => {
  selectedTask.value = { ...task }; // Menyalin data task yang dipilih
  isModalDeleteVisible.value = true; // Menampilkan modal delete task
};

// Fungsi untuk menutup modal delete task
const closeModalDelete = () => {
  isModalDeleteVisible.value = false; // Menyembunyikan modal delete task
  selectedTask.value = null; // Menghapus data task yang dipilih
};

// Fungsi untuk memperbarui task
const updateTask = async (updatedTask) => {
  const token = authStore.token; // Mengambil token dari store autentikasi

  if (!token) {
    // Jika token tidak ada, beri pesan error
    console.error("No token available. User is not authenticated.");
    return;
  }

  try {
    Api.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Menambahkan token ke header API
    const response = await Api.put(`/api/users/tasks/${updatedTask.id}`, {
      // Mengupdate task melalui API
      name: updatedTask.name,
      priority: updatedTask.priority,
      status: updatedTask.status,
    });

    if (response.data.success) {
      // Jika update berhasil
      await fetchDataTask(); // Ambil data terbaru
      showAlert("Task updated successfully!", "success"); // Tampilkan pesan sukses
    } else {
      throw new Error(response.data.message || "Failed to update task"); // Jika gagal, tampilkan error
    }
  } catch (error) {
    console.error("Error updating task:", error); // Menangani error
    showAlert(error.response?.data?.message || error.message || "Failed to update task"); // Tampilkan pesan error
  }
};

// Fungsi untuk menghapus task
const deleteTask = async (taskId) => {
  const token = authStore.token; // Mengambil token dari store autentikasi

  if (!token) {
    // Jika token tidak ada, beri pesan error
    console.error("No token available. User is not authenticated.");
    return;
  }

  try {
    Api.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Menambahkan token ke header API
    await Api.delete(`/api/users/tasks/${taskId}`); // Menghapus task melalui API

    await fetchDataTask(); // Ambil data terbaru setelah penghapusan
    closeModalDelete(); // Menutup modal delete
    showAlert("Task deleted successfully!", "success"); // Tampilkan pesan sukses
  } catch (error) {
    console.error("Error deleting task:", error); // Menangani error
    showAlert(error.response?.data?.message || error.message || "Failed to delete task"); // Tampilkan pesan error
  }
};

// Fungsi untuk memfilter task berdasarkan pencarian
const filteredTasks = computed(() => {
  return tasks.value.filter((task) => {
    // Memfilter tasks berdasarkan nama atau username author
    return task.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || task.authorUsername.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});

// Fungsi untuk mengurutkan task berdasarkan kolom
const sortTasks = (field) => {
  if (sortOrder.value.field === field) {
    // Jika sudah disort berdasarkan kolom yang sama, ubah arah urutannya
    sortOrder.value.direction = sortOrder.value.direction === "asc" ? "desc" : "asc";
  } else {
    sortOrder.value.field = field; // Jika belum, set kolom baru sebagai kolom sorting
    sortOrder.value.direction = "asc"; // Urutkan secara ascending
  }

  tasks.value.sort((a, b) => {
    // Sorting berdasarkan field yang dipilih
    if (a[field] < b[field]) return sortOrder.value.direction === "asc" ? -1 : 1;
    if (a[field] > b[field]) return sortOrder.value.direction === "asc" ? 1 : -1;
    return 0;
  });
};

// Fungsi untuk membuat PDF report
const generatePDF = () => {
  const doc = new jsPDF(); // Membuat dokumen PDF baru
  sortTasks("id"); // Mengurutkan task berdasarkan ID
  const currentDateTime = formatDate(new Date()); // Mendapatkan waktu saat ini

  // Menambahkan judul dan tanggal cetak ke PDF
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Laporan Daftar Tasks", 105, 20, { align: "center" });
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Tanggal Cetak :  ${currentDateTime}`, 140, 27);

  // Menambahkan garis horizontal
  doc.setLineWidth(0.5); // Ketebalan garis
  doc.line(10, 30, 200, 30); // Garis dari (10, 25) ke (200, 25)

  // Data untuk tabel
  const tableData = tasks.value.map((task, index) => [index + 1, task.name, task.authorUsername, task.priority, task.status ? "Done" : "Undone", formatDate(task.createdAt), formatDate(task.updatedAt)]);

  // Konfigurasi untuk menambahkan tabel
  doc.autoTable({
    head: [["No", "Name", "Author Username", "Priority", "Status", "Created At", "Updated At"]], // Header tabel
    body: tableData, // Data tabel
    startY: 35, // Posisi mulai tabel
    margin: { left: 10, right: 10 },
    theme: "striped", // Tema tabel
    headStyles: { fillColor: [8, 145, 178] }, // Warna header tabel
    styles: { font: "helvetica" }, // Gaya font tabel
  });

  // Menyimpan PDF yang sudah dibuat
  doc.save("Laporan_Daftar_Tasks.pdf");
};

// Menghitung jumlah halaman berdasarkan jumlah task dan item per halaman
const totalPages = computed(() => {
  return Math.ceil(filteredTasks.value.length / itemsPerPage);
});

// Mengambil data task berdasarkan halaman yang aktif
const paginatedTasks = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredTasks.value.slice(startIndex, endIndex);
});

// Fungsi untuk berpindah ke halaman berikutnya
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    // Jika halaman saat ini belum halaman terakhir
    currentPage.value++; // Pindah ke halaman berikutnya
  }
};

// Fungsi untuk berpindah ke halaman sebelumnya
const prevPage = () => {
  if (currentPage.value > 1) {
    // Jika halaman saat ini lebih dari 1
    currentPage.value--; // Pindah ke halaman sebelumnya
  }
};

// Mengambil data task saat komponen di-mount
onMounted(() => {
  fetchDataTask(); // Memanggil fungsi untuk mengambil data task
  authStore.reloadAuthState(); // Memuat kembali status autentikasi
});
</script>

<!-- <script setup>
// // Tambahkan Judul // doc.setFontSize(18); // // Mengatur font terlebih dahulu untuk bold // doc.setFont("helvetica", "bold"); // doc.text("Laporan Daftar Users", 105, 20, { align: "center" }); // // Tambahkan Header Tabel Secara
Terpisah // doc.setFontSize(12); // const startY = 35; // Posisi awal Y untuk header // doc.text("No", 20, startY); // Kolom No // doc.text("Username", 45, startY); // Kolom Username // doc.text("Email", 90, startY); // Kolom Email //
doc.text("Role", 160, startY); // Kolom Role // sortUsers("id"); // // Tambahkan Data Tabel // // Set font normal untuk teks lainnya // doc.setFont("helvetica", "normal"); // users.value.forEach((user, index) => { // const y = startY +
(index + 1) * 10; // Geser posisi Y untuk setiap baris // doc.text(String(index + 1), 20, y); // Kolom No // doc.text(user.username, 45, y); // Kolom Username // doc.text(user.email, 90, y); // Kolom Email // doc.text(user.role, 160, y); //
Kolom Role // }); // // Simpan PDF // doc.save("Laporan_Daftar_Users.pdf");
</script> -->
