<template>
  <div>
    <h1 class="text-center text-2xl font-bold text-cyan-700">Diagram Pie Priority</h1>
    <canvas
      id="myChart"
      class="chart-size w-5/6 mx-auto flex justify-center items-center"
    ></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"; // Mengimpor Vue hooks
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, Title, PieController, PolarAreaController, RadialLinearScale } from "chart.js"; // Mengimpor komponen Chart.js
import Api from "@/services/api.js"; // Mengimpor instance Axios untuk request API

const chartData = ref([]); // Menyimpan data yang diterima dari API

// Fungsi untuk mengambil data dari backend
const fetchData = async () => {
  try {
    // Mengambil data dari API menggunakan Axios
    const response = await Api.get("api/admin/tasks/statspriority"); // Pastikan endpoint API benar
    chartData.value = response.data; // Menyimpan data ke chartData

    // Setelah data diterima, menggambar chart
    renderChart();
  } catch (error) {
    console.error("Error fetching data:", error); // Menangani error jika request gagal
  }
};

// Fungsi untuk menggambar chart
const renderChart = () => {
  // Mendapatkan konteks dari elemen canvas
  const ctx = document.getElementById("myChart").getContext("2d");

  // Mendaftarkan komponen yang dibutuhkan untuk chart
  Chart.register(ArcElement, Tooltip, Legend, CategoryScale, Title, PieController, PolarAreaController, RadialLinearScale);

  // Menggambar chart dengan jenis Polar Area
  new Chart(ctx, {
    type: "polarArea", // Tipe chart yang digunakan (Polar Area)
    data: {
      labels: chartData.value.map((item) => item.priority), // Labels berdasarkan prioritas
      datasets: [
        {
          label: "Jumlah Task Berdasarkan Prioritas", // Label dataset
          data: chartData.value.map((item) => item.taskCount), // Data jumlah task per prioritas
          backgroundColor: [
            "rgba(51, 255, 51, 1)", // Warna untuk setiap bagian pie chart
            "rgba(255, 255, 51, 1)",
            "rgba(255, 51, 51, 1)",
          ],
          borderColor: ["rgba(255, 255, 255, 1)"], // Warna border
          borderWidth: 2, // Ketebalan border
        },
      ],
    },
    options: {
      responsive: true, // Chart responsif
      plugins: {
        legend: {
          position: "top", // Posisi legend di atas chart
          labels: { font: { size: 14, family: "Arial, sans-serif", weight: "bold" } }, // Styling font legend
        },
        title: {
          display: true, // Menampilkan judul chart
          text: "Statistik Jumlah Task per Priority (Pie)", // Judul chart
          font: { size: 14, family: "Arial, sans-serif", weight: "bold" }, // Styling font judul
        },
      },
    },
  });
};

// Mengambil data saat komponen dimuat
onMounted(fetchData); // Pastikan fetchData dipanggil saat komponen pertama kali dimuat
</script>

<style scoped>
.chart-size {
  width: 400px !important; /* Ukuran lebar canvas */
  height: 400px !important; /* Ukuran tinggi canvas */
}
/* Media Query untuk Layar HP */
@media (max-width: 640px) {
  .chart-size {
    width: 320px !important;
    height: 320px !important;
  }
}
</style>
