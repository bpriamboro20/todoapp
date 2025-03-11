// Mengimpor PrismaClient untuk berinteraksi dengan database.
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient(); // Membuat instance PrismaClient untuk operasi database.

// Fungsi untuk mengambil semua data tasks dari database.
const getAllDataTasks = async (req, res) => {
  try {
    // Mengambil semua data tasks dari tabel "task" dan memastikan hanya tugas terkait dengan pengguna yang terautentikasi yang diambil
    const tasks = await prisma.task.findMany({
      select: {
        id: true, // Mengambil ID task.
        name: true, // Mengambil nama task.
        status: true, // Mengambil status (done atau undone)
        createdAt: true, // Mengambil tanggal pembuatan
        updatedAt: true, // Mengambil tanggal pengubahan task
        authorId: true, // Mengambil id author
        authorUsername: true, // Mengambil authorUsername
        priority: true, // mengambil priority
      },
      where: {
        authorId: req.userId, // Hanya mengambil task yang dibuat oleh pengguna yang terautentikasi
      },
      orderBy: {
        id: "desc", // Mengurutkan tasks berdasarkan ID secara menurun.
      },
    });

    // Mengembalikan respons sukses dengan data semua tasks.
    res.status(200).send({
      success: true, // Status sukses.
      message: "Get all tasks successfully", // Pesan sukses.
      data: tasks, // Data tasks yang diambil.
    });
  } catch (error) {
    // Jika terjadi error, mengembalikan respons dengan status 500 (Internal Server Error).
    console.error("Error getting tasks:", error);
    res.status(500).send({
      success: false, // Status gagal.
      message: "Internal server error", // Pesan error internal server.
    });
  }
};

// Function untuk menghitung jumlah tugas
const getTasksCount = async (req, res) => {
  // Mendeklarasikan fungsi asinkron getTasksCount yang menerima request dan response
  try {
    // Menghitung jumlah pengguna
    const tasksCount = await prisma.task.count(); // Menggunakan Prisma ORM untuk menghitung jumlah task dalam database

    // Mengembalikan respons sukses dengan jumlah tugas
    res.status(200).send({
      // Mengirimkan response dengan status 200 (OK)
      success: true, // Menandakan bahwa permintaan berhasil
      message: "Get task count successfully", // Pesan sukses
      data: tasksCount, // Mengirimkan data jumlah task yang dihitung
    });
  } catch (error) {
    // Mengembalikan respons jika terjadi error
    res.status(500).send({
      // Mengirimkan response dengan status 500 (Internal Server Error)
      success: false, // Menandakan bahwa terjadi kesalahan
      message: "Internal server error", // Pesan error yang dikirimkan
    });
  }
};

// Mengekspor fungsi getAllDataTasks untuk digunakan di bagian lain aplikasi.
export default { getAllDataTasks, getTasksCount };
