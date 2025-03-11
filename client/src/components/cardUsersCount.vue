<script setup>
import { ref, onMounted } from "vue"; // Mengimpor ref dan onMounted dari Vue
import { useAuthStore } from "@/stores/authStore.js"; // Mengimpor Auth Store untuk token
import Api from "@/services/api"; // Mengimpor Axios instance untuk API request

// State untuk jumlah pengguna dan tugas
const userCount = ref(0); // Jumlah pengguna
const taskCount = ref(0); // Jumlah tugas

// Ambil data jumlah pengguna dan tugas
const fetchCounts = async () => {
  const authStore = useAuthStore(); // Mengambil store autentikasi
  const token = authStore.token; // Mengambil token dari store autentikasi

  if (!token) {
    console.error("No token available. User is not authenticated.");
    return; // Jika tidak ada token, hentikan proses
  }

  try {
    // Set header Authorization dengan token yang didapatkan
    Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Fetch jumlah pengguna
    const userResponse = await Api.get("api/admin/count/users"); // Request jumlah pengguna
    userCount.value = userResponse.data.data - 1; // Set jumlah pengguna (dikurangi 1, mungkin untuk pengecualian admin atau diri sendiri)
    console.log(userCount.value); // Log jumlah pengguna

    // Fetch jumlah tugas
    const taskResponse = await Api.get("api/admin/count/tasks"); // Request jumlah tugas
    taskCount.value = taskResponse.data.data; // Set jumlah tugas

    console.log("User Response:", userResponse.data); // Log response pengguna
    console.log("Task Response:", taskResponse.data); // Log response tugas
  } catch (error) {
    console.error("Error fetching data:", error); // Log jika terjadi error

    // Jika error 401 (Unauthorized), logout pengguna
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized access. Please log in again.");
      authStore.logout(); // Logout jika autentikasi gagal
    }
  }
};

// Panggil fetchCounts saat komponen dimuat
onMounted(fetchCounts); // Pastikan fetchCounts dipanggil ketika komponen pertama kali dimuat
</script>

<template>
  <div class="border border-gray-200 shadow-xl p-8 rounded-2xl mb-6 bg-white">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Card Jumlah Users -->
      <div class="p-3 bg-red-500 shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out rounded-2xl flex flex-col items-center">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAACeElEQVR4nO2Wy0tVURTGrwnaa1CDwoEGktBfUTgraBKkaA1qJpkJQaAOlYiCHpDStHDSoEsQWATVJOxBRZERFA16GmRGXoNboNUvduwri9XZ+551b5cIzgdncta3vvXtc/bae+VyGTJkyJChKgAbgTPAC6AIzAKXgE25fw1gB/CNZHwA+oB1tTaxAtgMbAea1ZcrUh7TQJPIa/ZaW5x2teZagdei2HkRGyM9joi8vHjvtFsrMbbM76uCKnRIcJ4bDD4VeQMqVvCLrbMY3B8otEdwvhoMzou8vQFOr8XgnYBIj+DMGAx+EXk9Ac4ti8FPAZFjgnPVYPC6yDsa4MxaDIa6c0BwJgwGJ0TeYIBTtBh8Um6fAO8NBqdFXm+AM2UxeCUgclpwThkMnhB5owHOZYvBjwGRd0Cj4N0w7r/lkS8/YzF4MVJwVPC2pTC4NeXhnrcYbATmImLtKbrSYUjw2gnjM9CQ2qAXPBkRHFbcRCjOMGEcN5kTQ8KDBLGHwCrBq48Urhe81cCjBM79iocGYERNJX36VwBDEYODitvgNWSjjFRqbi3wCvjhjgm9Sj/p5CmPC3piAVb6Y+on8BJYY51kuoG3fhjdqeJtwFlggfRY8DltSqvD13gDdLnaMWN1wG4xRrnVdak95Bpnkcqx6DXkHu72tRyeAbv+GL3879SH7jkRXx+5/irBlNMU+uMqfm3pt/sz754ifC+N9z7uBP82HpduJaDF15S4+7shgYMJyTfF6vqpHQ6IOpMJ8f6cd6qx1PpukKyhwUlR53BC/LYLzCcE9onE2JVXLebKjGGFUqt3qqdFHQWdNXo6RJ0NsXiGDBn+V/wCGpogACcBMlsAAAAASUVORK5CYII="
          alt="group"
          class="w-10 h-10 mb-4"
        />
        <p class="text-xl font-bold text-white text-center">Total Users</p>
        <p class="text-xl text-white font-semibold mt-2">{{ userCount }}</p>
      </div>

      <!-- Card Jumlah Tasks -->
      <div class="p-3 bg-green-500 shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out rounded-2xl flex flex-col items-center">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAABqElEQVR4nO3XQYuNURjA8XNNjEnGBguEBVL2mlKKMs1O5juYhQUrkmsp9kqymdItxSxYKXyBmbpJFlJWYiMprEbhpzdnmuPkNZvbPadx/3Xq1Ps89e+c5/Q8bwgjRvwGm0OtYB/eYS7UBibw3Cq3Q01g3p+cLy20DZ24P5fJ3ctie+gPePX+Jbc1XuddHMe3RO4ltmTxfYOn3ya3EU+TwB/J/jMO/iWnP0zBnfGUcn7idEvObPOyB7xm17riJ5ngtVATGMf9KPcMY6E2sAFXsb20y/rAam1OhdpABwuxJpdxIdQErmSv+lZpoU6yP4XvidwiNiXfu7gz4NVd6/U+wEXsxcdE7gP2FOskDbiZCa3QnOLJULjV7canlqRLLTndYV/xAbzJ5B6ldVkc7MKLKPcak6E2MImHOFLaZX2AMVxvZsZQI7gRa/I9joWawJk4Va/wONQCDuNLIvcWO4qN/A24jBNxxHqVyDWTzNFQuNWdjUHN7+ZSljhXQ6tbbkmab8npDfvHfRpfM7mmq0yEWsBUMmY1w8P+UBs4FIeGmVArGC/tMOK/4BeTN29Vw/baTwAAAABJRU5ErkJggg=="
          alt="todo-list"
          class="w-10 h-10 mb-4"
        />
        <p class="text-xl font-bold text-white text-center">Total Tasks</p>
        <p class="text-xl text-white font-semibold mt-2">{{ taskCount }}</p>
      </div>
    </div>
  </div>
</template>
