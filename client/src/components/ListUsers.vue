<template>
  <div class="w-auto">
    <!-- Input untuk mencari user berdasarkan username atau email -->
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search by username or email"
      class="w-full mb-6 rounded-lg px-4 py-2 border border-gray-300"
    />
    <!-- Tabel untuk menampilkan daftar user -->
    <div class="w-full mx-auto overflow-x-auto">
      <table class="w-full table-auto border-collapse font-semibold mb-5">
        <thead>
          <tr class="bg-cyan-600 text-white">
            <th
              class="border font-bold border-black px-4 py-2 cursor-pointer whitespace-nowrap"
              @click="sortUsers('username')"
            >
              Username
              <span class="ms-2 inline-block"
                ><img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA1UlEQVR4nJ3QsWoCURCF4SUPIAhBQbBIkSJ1WqtUqdJoZbGks7PzYfJMKQSxSGGRIk+wl53/7JI4YlhhSa67qwOnu9/cmUmShnL3m+SaknQPbCQ9XATNbCzpU5JL+gLuOsEQwgD4qOApuzzPR40wy7JbYPsH/ubYMIQwjEJ37wHvMVhrsHb3fmzPVNJbW8ws/YePVy3L8rEtil0feAJoGbsAnqN7S3oByjPwW9Ks8eKSptXDOvwpimLeCGsrvAL7Cu6BRSdYm2BZ/by6CJ7KzCZXwS51AM17TnmSXJ79AAAAAElFTkSuQmCC"
                  alt="sort"
              /></span>
            </th>
            <th
              class="border font-bold border-black px-4 py-2 cursor-pointer whitespace-nowrap"
              @click="sortUsers('email')"
            >
              Email
              <span class="ms-2 inline-block"
                ><img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA1UlEQVR4nJ3QsWoCURCF4SUPIAhBQbBIkSJ1WqtUqdJoZbGks7PzYfJMKQSxSGGRIk+wl53/7JI4YlhhSa67qwOnu9/cmUmShnL3m+SaknQPbCQ9XATNbCzpU5JL+gLuOsEQwgD4qOApuzzPR40wy7JbYPsH/ubYMIQwjEJ37wHvMVhrsHb3fmzPVNJbW8ws/YePVy3L8rEtil0feAJoGbsAnqN7S3oByjPwW9Ks8eKSptXDOvwpimLeCGsrvAL7Cu6BRSdYm2BZ/by6CJ7KzCZXwS51AM17TnmSXJ79AAAAAElFTkSuQmCC"
                  alt="sort"
              /></span>
            </th>

            <th
              class="border font-bold border-black px-4 py-2 cursor-pointer whitespace-nowrap"
              @click="sortUsers('role')"
            >
              Role
              <span class="ms-2 inline-block"
                ><img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA1UlEQVR4nJ3QsWoCURCF4SUPIAhBQbBIkSJ1WqtUqdJoZbGks7PzYfJMKQSxSGGRIk+wl53/7JI4YlhhSa67qwOnu9/cmUmShnL3m+SaknQPbCQ9XATNbCzpU5JL+gLuOsEQwgD4qOApuzzPR40wy7JbYPsH/ubYMIQwjEJ37wHvMVhrsHb3fmzPVNJbW8ws/YePVy3L8rEtil0feAJoGbsAnqN7S3oByjPwW9Ks8eKSptXDOvwpimLeCGsrvAL7Cu6BRSdYm2BZ/by6CJ7KzCZXwS51AM17TnmSXJ79AAAAAElFTkSuQmCC"
                  alt="sort"
              /></span>
            </th>
            <th
              class="border font-bold border-black px-4 py-2 cursor-pointer whitespace-nowrap"
              @click="sortUsers('createdAt')"
            >
              Created At
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
          <!-- Menampilkan pesan jika tidak ada data yang cocok dengan filter pencarian -->
          <tr v-if="filteredUsers.length === 0">
            <td
              class="text-center py-4"
              colspan="3"
            >
              Data tidak tersedia
            </td>
          </tr>
          <!-- Menampilkan data user yang sudah difilter -->
          <tr
            v-else
            v-for="user in paginatedUsers"
            :key="user.id"
          >
            <td class="border border-black px-4 py-2 whitespace-nowrap">
              {{ user.username }}
            </td>
            <td class="border border-black px-4 py-2 whitespace-nowrap">
              {{ user.email }}
            </td>
            <td class="border border-black px-4 py-2 whitespace-nowrap">
              {{ user.role }}
            </td>
            <td class="border border-black px-4 py-2 whitespace-nowrap">
              {{ formatDate(user.createdAt) }}
            </td>
            <td class="border border-black px-4 py-2 whitespace-nowrap">
              <!-- Tombol untuk Edit dan Delete -->
              <div class="flex justify-between gap-2">
                <!-- Tombol Edit untuk membuka modal update -->
                <ButtonEdit @click="openModalUpdate(user)" />
                <!-- Tombol Delete untuk membuka modal delete -->
                <ButtonDelete @click="openModalDelete(user)" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-start mb-3">
      <ButtonPrint @click="generatePDF" />
    </div>

    <!-- Pagination -->
    <nav
      aria-label="Page navigation example "
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

  <!-- Modal Dialog -->
  <modalUpdateUser
    v-if="isModalUpdateVisible"
    :user="selectedUser"
    @closeModalUpdate="closeModalUpdate"
    @updateUser="updateUser"
  />
  <modalDeleteUser
    v-if="isModalDeleteVisible"
    :user="selectedUser"
    @closeModalDelete="closeModalDelete"
    @deleteUser="deleteUser"
  />
</template>

<script setup>
import { ref, computed, onMounted } from "vue"; // Mengimpor ref, computed, dan onMounted dari Vue
import ButtonEdit from "./CompInputanForm/buttonEdit.vue"; // Mengimpor komponen ButtonEdit
import ButtonDelete from "./CompInputanForm/buttonDelete.vue"; // Mengimpor komponen ButtonDelete
import ButtonPrint from "./CompInputanForm/buttonPrint.vue"; // Mengimpor komponen ButtonPrint
import modalUpdateUser from "./Modal/modalUpdateUser.vue"; // Mengimpor modal untuk update user
import modalDeleteUser from "./Modal/modalDeleteUser.vue"; // Mengimpor modal untuk delete user
import { useAuthStore } from "@/stores/authStore.js"; // Mengimpor useAuthStore untuk mengakses store autentikasi
import Api from "@/services/api"; // Mengimpor instance Api untuk membuat request HTTP
import { jsPDF } from "jspdf"; // Mengimpor jsPDF untuk membuat file PDF
import "jspdf-autotable"; // Mengimpor plugin autoTable dari jsPDF untuk membuat tabel di PDF

// Mendapatkan token dari authStore untuk otorisasi API
const authStore = useAuthStore(); // Mendapatkan instance dari store auth
const token = authStore.token; // Mendapatkan token otorisasi

// Menyimpan data user
const users = ref([]); // Menggunakan ref untuk menyimpan data user yang didapat dari API
const searchQuery = ref(""); // Menyimpan query pencarian untuk mencari user

const currentPage = ref(1); // Menyimpan halaman saat ini untuk pagination
const itemsPerPage = 5; // Menentukan jumlah item per halaman untuk pagination

// State untuk mengontrol visibilitas modal update
const isModalUpdateVisible = ref(false); // Menyimpan status visibilitas modal update user
// State untuk mengontrol visibilitas modal delete
const isModalDeleteVisible = ref(false); // Menyimpan status visibilitas modal delete user

// Menyimpan user yang sedang dipilih
const selectedUser = ref(null); // Menyimpan data user yang dipilih untuk update atau delete

// State untuk mengontrol urutan pengurutan
let sortOrder = ref({ field: "", direction: "asc" }); // Menyimpan urutan pengurutan berdasarkan field dan arah

// Fungsi untuk memformat tanggal
const formatDate = (dateString) => {
  const date = new Date(dateString); // Mengubah string tanggal menjadi objek Date
  const day = String(date.getDate()).padStart(2, "0"); // Menambahkan 0 jika hari kurang dari 10
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Menambahkan 0 jika bulan kurang dari 10
  const year = date.getFullYear(); // Mendapatkan tahun
  const hours = String(date.getHours()).padStart(2, "0"); // Menambahkan 0 jika jam kurang dari 10
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Menambahkan 0 jika menit kurang dari 10
  const seconds = String(date.getSeconds()).padStart(2, "0"); // Menambahkan 0 jika detik kurang dari 10

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`; // Mengembalikan tanggal dalam format DD-MM-YYYY HH:MM:SS
};

// Fungsi untuk mengambil data user dari API
const fetchDataUsers = async () => {
  if (!token) {
    console.error("Token is missing, please login.");
    return; // Jika token tidak ada, tampilkan pesan error
  }

  try {
    // Menambahkan token ke header Authorization untuk autentikasi
    Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await Api.get("api/admin/users"); // Mengambil data users dari API
    users.value = response.data.data; // Menyimpan data user ke dalam ref users
    console.log(users.value);
  } catch (error) {
    console.error("Error fetching users:", error); // Menampilkan error jika gagal mengambil data
    if (error.response && error.response.status === 401) {
      // Logout jika token tidak valid (status 401)
      authStore.logout();
    }
  }
};

// Fungsi untuk membuka modal update dengan data user yang dipilih
const openModalUpdate = (user) => {
  selectedUser.value = { ...user }; // Mengirim data user yang dipilih ke modal
  isModalUpdateVisible.value = true; // Menampilkan modal update
};

// Fungsi untuk menutup modal update
const closeModalUpdate = () => {
  isModalUpdateVisible.value = false; // Menyembunyikan modal update
  selectedUser.value = null; // Mengosongkan data user yang dipilih
};

// Fungsi untuk membuka modal delete dengan data user yang dipilih
const openModalDelete = (user) => {
  selectedUser.value = { ...user }; // Mengirim data user yang dipilih ke modal
  isModalDeleteVisible.value = true; // Menampilkan modal delete
};

// Fungsi untuk menutup modal delete
const closeModalDelete = () => {
  isModalDeleteVisible.value = false; // Menyembunyikan modal delete
  selectedUser.value = null; // Mengosongkan data user yang dipilih
};

// Fungsi untuk memperbarui data user
const updateUser = async (updatedUser) => {
  try {
    Api.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Menambahkan token ke header
    await Api.put(`/api/admin/users/${updatedUser.id}`, updatedUser); // Mengirim request untuk memperbarui user
    fetchDataUsers(); // Refresh data setelah update
    closeModalUpdate(); // Menutup modal update
  } catch (error) {
    console.error("Error updating user:", error); // Menampilkan error jika gagal update
  }
};

// Fungsi untuk menghapus user
const deleteUser = async (userId) => {
  try {
    Api.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Menambahkan token ke header
    await Api.delete(`/api/admin/users/${userId}`); // Mengirim request untuk menghapus user
    fetchDataUsers(); // Refresh data setelah penghapusan
    closeModalDelete(); // Menutup modal delete
  } catch (error) {
    console.error("Error deleting user:", error); // Menampilkan error jika gagal menghapus
  }
};

// Fungsi untuk mengurutkan data user berdasarkan field yang dipilih
const sortUsers = (field) => {
  if (sortOrder.value.field === field) {
    sortOrder.value.direction = sortOrder.value.direction === "asc" ? "desc" : "asc"; // Jika field yang sama, toggle arah urutan
  } else {
    sortOrder.value.field = field; // Menetapkan field untuk urutan
    sortOrder.value.direction = "asc"; // Mengatur urutan default menjadi ascending
  }

  // Mengurutkan users berdasarkan field dan arah urutan
  users.value.sort((a, b) => {
    if (a[field] < b[field]) return sortOrder.value.direction === "asc" ? -1 : 1;
    if (a[field] > b[field]) return sortOrder.value.direction === "asc" ? 1 : -1;
    return 0;
  });
};

// Fungsi untuk membuat print PDF
const generatePDF = () => {
  const doc = new jsPDF(); // Membuat objek jsPDF
  sortUsers("id"); // Mengurutkan data berdasarkan ID
  const currentDateTime = formatDate(new Date()); // Mendapatkan tanggal dan waktu saat ini dalam format yang sudah ditentukan

  // Menambahkan Judul
  doc.setFontSize(18); // Mengatur ukuran font
  doc.setFont("helvetica", "bold"); // Mengatur jenis dan gaya font
  doc.text("Laporan Daftar Users", 105, 20, { align: "center" }); // Menambahkan teks judul di tengah
  doc.setFontSize(10); // Mengatur ukuran font untuk teks lainnya
  doc.setFont("helvetica", "normal"); // Mengatur jenis font kembali ke normal
  doc.text(`Tanggal Cetak :  ${currentDateTime}`, 140, 27); // Menambahkan teks tanggal cetak

  // Menambahkan Garis Horizontal
  doc.setLineWidth(0.5); // Mengatur ketebalan garis
  doc.line(10, 30, 200, 30); // Menambahkan garis horizontal

  // Data untuk tabel
  const tableData = users.value.map((user, index) => [index + 1, user.username, user.email, user.role, formatDate(user.createdAt), formatDate(user.updatedAt)]); // Mengambil data user dan memformatnya

  // Konfigurasi tabel
  doc.autoTable({
    head: [["No", "Username", "Email", "Role", "Created At", "Updated At"]], // Header tabel
    body: tableData, // Isi tabel
    startY: 35, // Posisi mulai tabel
    margin: { left: 10, right: 10 }, // Margin tabel
    theme: "striped", // Tema tabel
    headStyles: { fillColor: [8, 145, 178] }, // Warna header tabel
    styles: { font: "helvetica" }, // Gaya font tabel
  });

  // Simpan PDF
  doc.save("Laporan_Daftar_Users.pdf"); // Menyimpan file PDF
};

// Fungsi untuk memfilter daftar user berdasarkan query pencarian
const filteredUsers = computed(() => {
  const searchTerm = searchQuery.value.toLowerCase(); // Mengubah query pencarian menjadi huruf kecil
  // Memfilter user berdasarkan username atau email
  return users.value.filter((user) => {
    return user.username.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm);
  });
});

const totalPages = computed(() => {
  return Math.ceil(filteredUsers.value.length / itemsPerPage); // Menghitung jumlah total halaman berdasarkan jumlah data dan items per page
});

const paginatedUsers = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage; // Menentukan indeks mulai untuk halaman saat ini
  const endIndex = startIndex + itemsPerPage; // Menentukan indeks akhir
  return filteredUsers.value.slice(startIndex, endIndex); // Mengambil data sesuai halaman
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++; // Menambahkan halaman jika belum mencapai halaman terakhir
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--; // Mengurangi halaman jika bukan halaman pertama
  }
};

// Memanggil fetchDataUsers ketika komponen pertama kali dimuat
onMounted(() => {
  if (!token) {
    console.error("Token is missing, please login.");
    return; // Jika token tidak ada, tampilkan pesan error
  }
  fetchDataUsers(); // Mengambil data user dari API
});
</script>

// // Tambahkan Judul // doc.setFontSize(18); // // Mengatur font terlebih dahulu untuk bold // doc.setFont("helvetica", "bold"); // doc.text("Laporan Daftar Users", 105, 20, { align: "center" }); // // Tambahkan Header Tabel Secara
Terpisah // doc.setFontSize(12); // const startY = 35; // Posisi awal Y untuk header // doc.text("No", 20, startY); // Kolom No // doc.text("Username", 45, startY); // Kolom Username // doc.text("Email", 90, startY); // Kolom Email //
doc.text("Role", 160, startY); // Kolom Role // sortUsers("id"); // // Tambahkan Data Tabel // // Set font normal untuk teks lainnya // doc.setFont("helvetica", "normal"); // users.value.forEach((user, index) => { // const y = startY +
(index + 1) * 10; // Geser posisi Y untuk setiap baris // doc.text(String(index + 1), 20, y); // Kolom No // doc.text(user.username, 45, y); // Kolom Username // doc.text(user.email, 90, y); // Kolom Email // doc.text(user.role, 160, y); //
Kolom Role // }); // // Simpan PDF // doc.save("Laporan_Daftar_Users.pdf");
