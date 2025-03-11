import { PrismaClient } from "@prisma/client"; // Mengimpor PrismaClient untuk berinteraksi dengan database
const prisma = new PrismaClient(); // Membuat instance PrismaClient untuk operasi database

// Fungsi untuk mendapatkan statistik berdasarkan prioritas task
const getStatsPriority = async (req, res) => {
  // Mendeklarasikan fungsi asinkron getStatsPriority untuk menangani request dan response
  try {
    // Mengelompokkan task berdasarkan prioritas dan menghitung jumlah task untuk setiap prioritas
    const taskCounts = await prisma.task.groupBy({
      by: ["priority"], // Mengelompokkan berdasarkan kolom 'priority'
      _count: { id: true }, // Menghitung jumlah task berdasarkan ID
    });

    // Membentuk response yang berisi prioritas dan jumlah task untuk setiap prioritas
    const response = taskCounts.map((item) => ({
      // Mengubah data yang diterima menjadi format yang diinginkan
      priority: item.priority, // Menyertakan prioritas dari item
      taskCount: item._count.id, // Menyertakan jumlah task berdasarkan prioritas
    }));

    // Mengirimkan response berupa data statistik dalam format JSON
    res.json(response); // Mengirimkan response JSON yang berisi data statistik
  } catch (error) {
    // Jika terjadi error, log error dan mengembalikan response dengan status 500
    console.error(error); // Mencetak error ke konsol
    res.status(500).json({ error: "Internal Server Error" }); // Mengirimkan response error dengan status 500
  }
};

// Mengekspor fungsi getStatsPriority untuk digunakan di bagian lain aplikasi
export default { getStatsPriority }; // Mengekspor fungsi agar dapat diimport dan digunakan di tempat lain
