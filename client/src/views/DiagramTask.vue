<!-- Diagram Pie dimulai baris ke 4 -->
<!-- Diagram Batang dimulai dari baris ke 80 -->
<!-- Diagram Batang dan pie berdampingan dimulai dari baris ke 189 -->

<!-- <template>
  <div>
    <canvas
      id="myChart"
      class="chart-size w-5/6 mx-auto flex justify-center items-center"
    ></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, Title, PieController } from "chart.js"; // Import PieController
import Api from "@/services/api.js"; // Import instance axios

const chartData = ref([]);

// Mengambil data dari backend menggunakan axios
const fetchData = async () => {
  try {
    // Gunakan axios untuk mengambil data dari API
    const response = await Api.get("api/admin/tasks/stats"); // Pastikan endpoint API benar
    chartData.value = response.data; // Menyimpan data ke chartData

    // Setelah data diterima, render chart
    renderChart();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Fungsi untuk menggambar chart
const renderChart = () => {
  const ctx = document.getElementById("myChart").getContext("2d");

  // Registrasi controller pie chart
  Chart.register(ArcElement, Tooltip, Legend, CategoryScale, Title, PieController); // Tambahkan PieController

  // Inisialisasi chart.js untuk menggambar pie chart
  new Chart(ctx, {
    type: "pie", // Jenis chart (pie chart)
    data: {
      labels: chartData.value.map((item) => item.authorUsername), // Label sumbu X
      datasets: [
        {
          label: "Jumlah Task", // Label untuk dataset
          data: chartData.value.map((item) => item.taskCount), // Data untuk sumbu Y
          backgroundColor: ["rgba(75, 192, 192, 0.8)", "rgba(153, 102, 255, 0.8)", "rgba(255, 159, 64, 0.8)"], // Warna untuk setiap bagian pie chart
          borderColor: ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"], // Border untuk setiap bagian pie chart
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true, // Responsif untuk ukuran layar
      plugins: {
        legend: {
          position: "top", // Posisi legend
        },
        tooltip: {
          enabled: true, // Tooltip aktif
        },
      },
    },
  });
};

// Ambil data ketika komponen dimuat
onMounted(fetchData);
</script>

<style scoped>
.chart-size {
  width: 400px !important; /* Ukuran lebar canvas */
  height: 400px !important; /* Ukuran tinggi canvas */
}
</style> -->

<!-- Diagram Bar -->
<!-- <template>
  <div>
    <h1>Diagram bar</h1>
    <canvas
      id="myChart"
      class="chart-size w-5/6 mx-auto flex justify-center items-center"
    ></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Chart, BarElement, BarController, Tooltip, Legend, CategoryScale, LinearScale, Title } from "chart.js";
import Api from "@/services/api.js";

const chartData = ref([]);
let myChart = null; // Referensi chart

// Mengambil data dari backend
const fetchData = async () => {
  try {
    const response = await Api.get("api/admin/tasks/stats");

    if (Array.isArray(response.data)) {
      chartData.value = response.data;
      renderChart();
    } else {
      console.error("Unexpected API response format:", response.data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Fungsi untuk menggambar chart
const renderChart = () => {
  const ctx = document.getElementById("myChart").getContext("2d");

  if (myChart) {
    myChart.destroy();
  }

  // Registrasi elemen Chart.js
  Chart.register(BarElement, BarController, Tooltip, Legend, CategoryScale, LinearScale, Title);

  myChart = new Chart(ctx, {
    type: "bar", // Jenis diagram: bar chart
    data: {
      labels: chartData.value.map((item) => item.authorUsername), // Label sumbu X
      datasets: [
        {
          label: "Jumlah Task", // Label dataset
          data: chartData.value.map((item) => item.taskCount), // Data sumbu Y
          backgroundColor: "rgba(54, 162, 235, 0.7)", // Warna batang
          borderColor: "rgba(54, 162, 235, 1)", // Warna border batang
          borderWidth: 1, // Ketebalan border
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          enabled: true,
        },
        title: {
          display: true,
          text: "Statistik Jumlah Task per Author", // Judul chart
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Author",
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Jumlah Task",
          },
        },
      },
    },
  });
};

// Panggil data saat komponen dimuat
onMounted(fetchData);
</script>

<style scoped>
.chart-size {
  width: 400px !important;
  height: 400px !important;
}
</style> -->

<!-- Diagram Kanan Kiri -->

<template>
  <cardUsersCount />
  <div class="flex justify-center">
    <!-- Diagram Pie -->
    <div class="w-full py-8 bg-white shadow-xl border-gray-100 border b-2 rounded-2xl">
      <h1 class="text-center text-2xl font-bold text-cyan-700">Diagram Pie</h1>
      <canvas
        id="pieChart"
        class="chart-size mt-4 mx-auto"
      ></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"; // Mengimpor hook Vue 'onMounted' dan 'ref' untuk mengelola state reaktif
import { Chart, BarController, BarElement, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, Title, PieController } from "chart.js"; // Mengimpor komponen dari Chart.js untuk membuat grafik
import Api from "@/services/api.js"; // Mengimpor instance API untuk melakukan permintaan HTTP
import cardUsersCount from "@/components/cardUsersCount.vue"; // Mengimpor komponen cardUsersCount

const chartData = ref([]); // Data dari API yang akan digunakan untuk grafik, disimpan dalam ref agar reaktif
let pieChart = null; // Menyimpan referensi grafik pie chart

// Mengambil data dari backend
const fetchData = async () => {
  try {
    const response = await Api.get("api/admin/tasks/statstask"); // Mengambil data dari API endpoint 'statstask'

    if (Array.isArray(response.data)) {
      // Mengecek apakah data yang diterima dalam bentuk array
      chartData.value = response.data; // Menyimpan data yang diterima ke dalam chartData
      renderCharts(); // Memanggil fungsi renderCharts untuk menggambar grafik setelah data diterima
    } else {
      console.error("Unexpected API response format:", response.data); // Menangani jika format data tidak sesuai
    }
  } catch (error) {
    console.error("Error fetching data:", error); // Menangani jika ada kesalahan saat mengambil data
  }
};

// Fungsi untuk menghasilkan warna RGB acak
const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256); // Menghasilkan nilai acak untuk warna merah (0-255)
  const g = Math.floor(Math.random() * 256); // Menghasilkan nilai acak untuk warna hijau (0-255)
  const b = Math.floor(Math.random() * 256); // Menghasilkan nilai acak untuk warna biru (0-255)
  return `rgba(${r}, ${g}, ${b}, 0.8)`; // Mengembalikan warna dalam format rgba dengan alpha 0.8
};

// Fungsi untuk menggambar diagram
const renderCharts = () => {
  Chart.register(BarController, BarElement, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, Title, PieController); // Mendaftarkan elemen yang diperlukan untuk membuat grafik

  // Menghasilkan warna acak untuk setiap bagian pie chart
  const backgroundColors = chartData.value.map(() => getRandomColor()); // Menghasilkan warna acak untuk setiap elemen dalam data chart

  // Pie Chart
  const pieCtx = document.getElementById("pieChart").getContext("2d"); // Mendapatkan konteks canvas untuk grafik pie
  if (pieChart) pieChart.destroy(); // Menghancurkan grafik pie yang lama jika sudah ada
  pieChart = new Chart(pieCtx, {
    // Membuat grafik baru dengan konteks canvas
    type: "pie", // Jenis grafik adalah pie chart
    data: {
      labels: chartData.value.map((item) => item.authorUsername), // Label untuk pie chart berdasarkan username author
      datasets: [
        {
          label: "Jumlah Task", // Label dataset
          data: chartData.value.map((item) => item.taskCount), // Data untuk grafik, jumlah task per author
          backgroundColor: backgroundColors, // Warna latar belakang pie chart
          borderColor: ["rgba(255, 255, 255, 1)"], // Warna border pie chart
          borderWidth: 2, // Lebar border
        },
      ],
    },
    options: {
      responsive: true, // Membuat grafik responsif terhadap ukuran layar
      plugins: {
        legend: { position: "top" }, // Posisi legenda di atas grafik
        tooltip: { enabled: true }, // Mengaktifkan tooltip saat hover
        title: { display: true, text: "Statistik Jumlah Task per Author (Pie)" }, // Judul grafik
      },
    },
  });
};

// Panggil data saat komponen dimuat
onMounted(fetchData); // Mengambil data saat komponen pertama kali dimuat
</script>

<style scoped>
.chart-size {
  width: 85vw; /* Lebar 90% dari lebar viewport */
  max-width: 500px; /* Batas maksimum 500px */
  height: auto; /* Tinggi menyesuaikan lebar */
  aspect-ratio: 1 / 1; /* Menjaga rasio kotak (1:1) */
  image-rendering: crisp-edges;
}
</style>
