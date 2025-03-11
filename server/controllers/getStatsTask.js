import { PrismaClient } from "@prisma/client"; // Mengimpor PrismaClient untuk berinteraksi dengan database
const prisma = new PrismaClient(); // Membuat instance PrismaClient untuk operasi database

// Fungsi untuk mendapatkan statistik berdasarkan username author dari task
const getStatsTask = async (req, res) => {
  // Mendeklarasikan fungsi asinkron getStatsTask untuk menangani request dan response
  try {
    // Mengelompokkan task berdasarkan username author dan menghitung jumlah task untuk setiap author
    const taskCounts = await prisma.task.groupBy({
      by: ["authorUsername"], // Mengelompokkan berdasarkan kolom 'authorUsername'
      _count: { id: true }, // Menghitung jumlah task berdasarkan ID
    });

    // Membentuk response yang berisi username author dan jumlah task untuk setiap author
    const response = taskCounts.map((item) => ({
      // Mengubah data yang diterima menjadi format yang diinginkan
      authorUsername: item.authorUsername, // Menyertakan username author dari item
      taskCount: item._count.id, // Menyertakan jumlah task berdasarkan author
    }));

    // Mengirimkan response berupa data statistik dalam format JSON
    res.json(response); // Mengirimkan response JSON yang berisi data statistik
  } catch (error) {
    // Jika terjadi error, log error dan mengembalikan response dengan status 500
    console.error(error); // Mencetak error ke konsol
    res.status(500).json({ error: "Internal Server Error" }); // Mengirimkan response error dengan status 500
  }
};

// Mengekspor fungsi getStatsTask untuk digunakan di bagian lain aplikasi
export default { getStatsTask }; // Mengekspor fungsi agar dapat diimport dan digunakan di tempat lain
