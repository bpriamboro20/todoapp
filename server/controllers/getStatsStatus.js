import { PrismaClient } from "@prisma/client"; // Mengimpor PrismaClient untuk berinteraksi dengan database
const prisma = new PrismaClient(); // Membuat instance PrismaClient untuk operasi database

// Fungsi untuk mendapatkan statistik berdasarkan status task
const getStatsStatus = async (req, res) => {
  // Mendeklarasikan fungsi asinkron getStatsStatus untuk menangani request dan response
  try {
    // Mengelompokkan task berdasarkan status dan menghitung jumlah task untuk setiap status
    const taskCounts = await prisma.task.groupBy({
      by: ["status"], // Mengelompokkan berdasarkan kolom 'status'
      _count: { id: true }, // Menghitung jumlah task berdasarkan ID
    });

    // Membentuk response yang berisi status dan jumlah task untuk setiap status
    const response = taskCounts.map((item) => ({
      // Mengubah data yang diterima menjadi format yang diinginkan
      status: item.status, // Menyertakan status dari item
      taskCount: item._count.id, // Menyertakan jumlah task berdasarkan status
    }));

    // Mengirimkan response berupa data statistik dalam format JSON
    res.json(response); // Mengirimkan response JSON yang berisi data statistik
  } catch (error) {
    // Jika terjadi error, log error dan mengembalikan response dengan status 500
    console.error(error); // Mencetak error ke konsol
    res.status(500).json({ error: "Internal Server Error" }); // Mengirimkan response error dengan status 500
  }
};

// Mengekspor fungsi getStatsStatus untuk digunakan di bagian lain aplikasi
export default { getStatsStatus }; // Mengekspor fungsi agar dapat diimport dan digunakan di tempat lain
