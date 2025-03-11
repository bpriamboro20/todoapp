// Mengimpor PrismaClient untuk berinteraksi dengan database.
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient(); // Membuat instance PrismaClient untuk operasi database.

// Fungsi untuk mendapatkan data task berdasarkan ID.
export const getDataTaskById = async (req, res) => {
  // Mendeklarasikan fungsi asinkron untuk mendapatkan data task berdasarkan ID
  // Mendapatkan ID task dari parameter URL.
  const { id } = req.params; // Mengambil ID task dari parameter URL (misalnya /tasks/:id)

  // Validasi jika ID bukan angka
  if (isNaN(Number(id))) {
    // Mengecek jika ID bukan angka menggunakan isNaN dan Number()
    return res.status(400).send({
      // Mengirimkan response dengan status 400 jika ID tidak valid
      success: false,
      message: "Invalid task ID", // Pesan validasi jika ID tidak valid.
    });
  }

  try {
    // Mencari data task berdasarkan ID di database.
    const task = await prisma.task.findUnique({
      // Menggunakan Prisma untuk mencari task berdasarkan ID
      where: {
        id: Number(id), // Menentukan task berdasarkan ID yang diterima dari parameter URL.
      },
      select: {
        id: true, // Mengambil ID task
        name: true, // Mengambil nama task
        status: true, // Mengambil status task (done/undone)
        createdAt: true, // Mengambil tanggal pembuatan
        updatedAt: true, // Mengambil tanggal pengubahan task
        authorId: true, // Mengambil ID author task
      },
    });

    // Memeriksa apakah task dengan ID tersebut ada.
    if (!task) {
      // Jika task tidak ditemukan
      // Jika task tidak ditemukan, mengembalikan respons dengan status 404 (Not Found).
      return res.status(404).send({
        success: false,
        message: `Task with ID ${id} not found`, // Pesan kesalahan jika task tidak ditemukan.
      });
    }

    // Mengembalikan respons sukses dengan data task
    res.status(200).send({
      // Mengirimkan response dengan status 200 (OK) dan data task
      success: true,
      message: `Task with ID: ${id} retrieved successfully`, // Pesan sukses dengan ID task
      data: task, // Mengirimkan data task yang ditemukan.
    });
  } catch (error) {
    // Jika terjadi error lainnya, mengembalikan respons dengan status 500 (Internal Server Error).
    console.error("Error fetching task by ID:", error); // Logging error untuk debugging.
    res.status(500).send({
      // Mengirimkan response dengan status 500 jika terjadi kesalahan server
      success: false,
      message: "Internal server error", // Pesan error internal server.
    });
  }
};

// Mengekspor fungsi getDataTaskById untuk digunakan di bagian lain aplikasi.
export default { getDataTaskById }; // Mengekspor fungsi agar dapat digunakan di tempat lain dalam aplikasi
