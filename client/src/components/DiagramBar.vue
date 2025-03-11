<template>
  <!-- Diagram Bar -->
  <div class="p-6 bg-white shadow-xl rounded-lg mx-auto border border-gray-100 b-2 mb-5">
    <h1 class="text-center text-2xl font-bold text-cyan-700 mb-4">Diagram Bar</h1>
    <div class="p-4 border-t-2 border-cyan-200">
      <canvas
        id="barChart"
        class="chart-size mx-auto"
      ></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"; // Mengimpor Vue hooks
import { Chart, BarController, BarElement, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, Title, PieController } from "chart.js"; // Mengimpor Chart.js dan komponen terkait
import Api from "@/services/api.js"; // Mengimpor instance Axios untuk API request

// State untuk menyimpan data yang diterima dari backend
const chartData = ref([]); // Menyimpan data tugas yang diterima dari API
let barChart = null; // Referensi untuk bar chart yang akan digambar

// Fungsi untuk mengambil data dari backend
const fetchData = async () => {
  try {
    const response = await Api.get("api/admin/tasks/statstask"); // Memanggil API untuk mendapatkan data statistik task

    if (Array.isArray(response.data)) {
      chartData.value = response.data; // Menyimpan data yang diterima dalam chartData
      renderCharts(); // Render diagram setelah data diterima
    } else {
      console.error("Unexpected API response format:", response.data);
    }
  } catch (error) {
    console.error("Error fetching data:", error); // Menangani error jika request gagal
  }
};

// Fungsi untuk menggambar diagram
const renderCharts = () => {
  // Mendaftarkan komponen yang digunakan oleh Chart.js
  Chart.register(BarController, BarElement, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, Title, PieController);

  const dpr = window.devicePixelRatio || 1; // Menyesuaikan resolusi layar (device pixel ratio)

  // Mengambil konteks untuk menggambar chart pada elemen dengan id "barChart"
  const barCtx = document.getElementById("barChart").getContext("2d");

  if (barChart) barChart.destroy(); // Menghancurkan chart sebelumnya jika ada

  // Membuat chart baru
  barChart = new Chart(barCtx, {
    type: "bar", // Menentukan tipe chart adalah Bar chart
    data: {
      labels: chartData.value.map((item) => item.authorUsername), // Label untuk sumbu X berdasarkan data author
      datasets: [
        {
          label: "Jumlah Task", // Label untuk dataset
          data: chartData.value.map((item) => item.taskCount), // Data jumlah task
          backgroundColor: "rgba(20, 140, 170, 1)", // Warna latar belakang bar
          borderColor: "rgba(54, 162, 235, 1)", // Warna border bar
          borderWidth: 1, // Ketebalan border
        },
      ],
    },
    options: {
      responsive: true, // Membuat chart responsif
      maintainAspectRatio: false, // Memungkinkan penyesuaian rasio aspek
      plugins: {
        legend: {
          position: "top", // Posisi legend di atas
          labels: { font: { size: 14, family: "Arial, sans-serif", weight: "bold" } }, // Styling font pada legend
        },
        title: {
          display: true, // Menampilkan judul chart
          text: "Statistik Jumlah Task per Author (Bar)", // Judul chart
          font: { size: 14, family: "Arial, sans-serif", weight: "bold" }, // Styling font pada judul
        },
      },
      scales: {
        x: { beginAtZero: true, title: { display: true, text: "Author" } }, // Pengaturan sumbu X
        y: { beginAtZero: true, title: { display: true, text: "Jumlah Task" } }, // Pengaturan sumbu Y
      },
    },
  });

  // Mengatur ukuran canvas sesuai dengan resolusi perangkat
  barChart.canvas.style.width = "375px";
  barChart.canvas.style.height = "375px";
  barChart.canvas.width = 375 * dpr;
  barChart.canvas.height = 375 * dpr;
};

// Panggil fetchData saat komponen dimuat
onMounted(fetchData); // Pastikan fetchData dijalankan ketika komponen pertama kali dimuat
</script>

<style scoped>
.chart-size {
  width: 100% !important;
  height: 275px !important;
  image-rendering: crisp-edges;
}
</style>
