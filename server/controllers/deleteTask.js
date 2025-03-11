// Mengimpor PrismaClient untuk berinteraksi dengan database.
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient(); // Membuat instance PrismaClient untuk operasi database.

// Fungsi untuk menghapus task berdasarkan ID.
export const deleteTask = async (req, res) => {
  // Mendapatkan ID task dari parameter URL.
  const { id } = req.params;

  // Validasi jika ID bukan angka atau nilai negatif
  if (isNaN(Number(id)) || Number(id) <= 0) {
    return res.status(400).send({
      success: false,
      message: "Invalid task ID. It must be a positive number.", // Pesan validasi jika ID tidak valid.
    });
  }

  try {
    // Menghapus task yang ada berdasarkan ID.
    await prisma.task.delete({
      where: {
        id: Number(id), // Menentukan task berdasarkan ID.
      },
    });

    // Mengembalikan respons sukses setelah task dihapus.
    res.status(200).send({
      success: true,
      message: "Task deleted successfully.", // Pesan sukses penghapusan task.
    });
  } catch (error) {
    // Menangani kasus ketika task tidak ditemukan.
    if (error.code === "P2025") {
      return res.status(404).send({
        success: false,
        message: `Task with ID ${id} not found.`, // Pesan kesalahan jika task tidak ditemukan.
      });
    }

    // Logging error untuk debugging lebih lanjut
    console.error("Error deleting task:", error);

    // Jika terjadi error lainnya, mengembalikan respons dengan status 500 (Internal Server Error).
    res.status(500).send({
      success: false,
      message: "Internal server error.", // Pesan error internal server.
    });
  }
};

// Mengekspor fungsi deleteTask
export default { deleteTask };
