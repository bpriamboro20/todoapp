<template>
  <div>
    <h1 class="text-center text-2xl font-bold text-cyan-700">Diagram Pie Status</h1>
    <canvas
      id="myChart2"
      class="chart-size w-5/6 mx-auto flex justify-center items-center"
    ></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"; // Mengimpor Vue hooks
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, Title, PieController } from "chart.js"; // Mengimpor komponen Chart.js
import Api from "@/services/api.js"; // Mengimpor instance Axios untuk request API

const chartData = ref([]); // Menyimpan data yang diterima dari API

// Fungsi untuk mengambil data dari backend
const fetchData = async () => {
  try {
    // Mengambil data dari API menggunakan Axios
    const response = await Api.get("api/admin/tasks/statsstatus"); // Pastikan endpoint API benar
    chartData.value = response.data.map((item) => {
      return {
        ...item,
        status: item.status ? "Done" : "Undone", // Mengubah status menjadi "Done" jika true, "Undone" jika false
      };
    }); // Menyimpan data yang telah diproses ke chartData

    // Setelah data diterima, menggambar chart
    renderChart();
  } catch (error) {
    console.error("Error fetching data:", error); // Menangani error jika request gagal
  }
};

// Fungsi untuk menggambar chart
const renderChart = () => {
  // Mendapatkan konteks dari elemen canvas
  const ctx = document.getElementById("myChart2").getContext("2d");

  // Mendaftarkan komponen yang dibutuhkan untuk chart
  Chart.register(ArcElement, Tooltip, Legend, CategoryScale, Title, PieController);

  // Menggambar chart dengan jenis Doughnut
  new Chart(ctx, {
    type: "doughnut", // Tipe chart yang digunakan (Doughnut)
    data: {
      labels: chartData.value.map((item) => item.status), // Labels berdasarkan status yang sudah diubah
      datasets: [
        {
          label: "Jumlah Task Berdasarkan Status", // Label dataset
          data: chartData.value.map((item) => item.taskCount), // Data untuk sumbu Y
          backgroundColor: ["rgba(153,0,0, 1)", "rgba(0, 153, 0, 1)"], // Warna untuk setiap bagian pie chart
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
          text: "Statistik Jumlah Task per Status (Doughnut)", // Judul chart
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
