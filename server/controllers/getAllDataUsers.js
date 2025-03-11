// import prisma client
// Mengimpor PrismaClient untuk berinteraksi dengan database.
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient(); // Membuat instance PrismaClient untuk operasi database.

// function findUsers
// Fungsi untuk mengambil semua data pengguna dari database.
const getAllDataUsers = async (req, res) => {
  try {
    // Get all users from database
    // Mengambil semua data pengguna dari tabel "user".
    const users = await prisma.user.findMany({
      select: {
        id: true, // Mengambil ID pengguna.
        username: true, // Mengambil nama pengguna.
        email: true, // Mengambil email pengguna.
        role: true, // Mengambil peran pengguna.
        createdAt: true, //mengambil tanggal pembuatan user
        updatedAt: true, //mengambil tanggal pengubahan user
      },
      orderBy: {
        id: "desc", // Mengurutkan pengguna berdasarkan ID secara menurun.
      },
    });

    // send response
    // Mengembalikan respons sukses dengan data semua pengguna.
    res.status(200).send({
      success: true, // Status sukses.
      message: "Get all users successfully", // Pesan sukses.
      data: users, // Data pengguna yang diambil.
    });
  } catch (error) {
    // Jika terjadi error, mengembalikan respons dengan status 500 (Internal Server Error).
    res.status(500).send({
      success: false, // Status gagal.
      message: "Internal server error", // Pesan error internal server.
    });
  }
};

// Function untuk menghitung jumlah pengguna
const getUsersCount = async (req, res) => {
  // Mendeklarasikan fungsi asinkron getUsersCount yang menerima request dan response
  try {
    // Menghitung jumlah pengguna
    const usersCount = await prisma.user.count(); // Menggunakan Prisma ORM untuk menghitung jumlah user dalam database
    console.log("Users count fetched:", usersCount); // Menampilkan jumlah pengguna yang berhasil diambil ke konsol

    // Mengembalikan respons sukses dengan jumlah pengguna
    res.status(200).send({
      // Mengirimkan response dengan status 200 (OK)
      success: true, // Menandakan bahwa permintaan berhasil
      message: "Get user count successfully", // Pesan sukses
      data: usersCount, // Mengirimkan data jumlah pengguna yang dihitung
    });
  } catch (error) {
    // Mengembalikan respons jika terjadi error
    console.error("Error fetching user count:", error); // Menampilkan error yang terjadi ke konsol untuk analisis lebih lanjut
    res.status(500).send({
      // Mengirimkan response dengan status 500 (Internal Server Error)
      success: false, // Menandakan bahwa terjadi kesalahan
      message: "Internal server error", // Pesan error yang dikirimkan
    });
  }
};

// Export default
// Mengekspor fungsi getAllDataUsers untuk digunakan di bagian lain aplikasi.
export default { getAllDataUsers, getUsersCount };
