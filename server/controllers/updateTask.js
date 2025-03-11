import { PrismaClient } from "@prisma/client"; // Mengimpor PrismaClient untuk berinteraksi dengan database
const prisma = new PrismaClient(); // Membuat instance PrismaClient untuk operasi database

// Fungsi untuk memperbarui data task berdasarkan ID
export const updateTask = async (req, res) => {
  // Fungsi updateTask menerima request dan response
  const { id } = req.params; // Mendapatkan ID task dari parameter URL
  const { name, status, priority } = req.body; // Mendapatkan nama, status, dan prioritas dari body request

  try {
    // Validasi ID task yang diterima
    const taskId = parseInt(id); // Mengubah ID menjadi integer
    if (isNaN(taskId) || taskId <= 0) {
      // Memeriksa apakah ID valid (angka positif)
      return res.status(400).json({
        success: false,
        message: "Invalid task ID", // Pesan jika ID tidak valid
      });
    }

    // Validasi nama task
    if (!name || name.trim() === "") {
      // Memeriksa apakah nama task ada dan tidak kosong
      return res.status(400).json({
        success: false,
        message: "Task name is required", // Pesan jika nama task kosong
      });
    }

    // Validasi status task
    const booleanStatus = status === true || status === "true"; // Mengonversi status menjadi boolean

    // Validasi prioritas task (opsional, jika prioritas diberikan)
    const validPriorities = ["Low", "Medium", "High"]; // Daftar prioritas yang valid
    if (priority && !validPriorities.includes(priority)) {
      // Memeriksa apakah prioritas valid
      return res.status(400).json({
        success: false,
        message: `Priority must be one of: ${validPriorities.join(", ")}`, // Pesan jika prioritas tidak valid
      });
    }

    // Memeriksa apakah sudah ada task dengan nama yang sama
    const existingTask = await prisma.task.findFirst({
      where: {
        name: name.trim(), // Mencari task berdasarkan nama yang sudah dipangkas
        NOT: { id: taskId }, // Memastikan tidak mencari task dengan ID yang sama
      },
    });

    // Jika task dengan nama yang sama ditemukan
    if (existingTask) {
      return res.status(409).json({
        success: false,
        message: "A task with this name already exists", // Pesan jika task dengan nama yang sama sudah ada
      });
    }

    // Melakukan update pada task berdasarkan ID
    const updatedTask = await prisma.task.update({
      where: { id: taskId }, // Mencari task berdasarkan ID
      data: {
        name: name.trim(), // Memperbarui nama task
        priority: priority, // Memperbarui prioritas task
        status: booleanStatus, // Memperbarui status task
      },
    });

    // Mengirimkan response jika task berhasil diperbarui
    return res.status(200).json({
      success: true,
      message: "Task updated successfully", // Pesan sukses jika task berhasil diperbarui
      data: updatedTask, // Data task yang diperbarui
    });
  } catch (error) {
    console.error("Error updating task:", error); // Mencetak error ke konsol

    // Menangani error jika task tidak ditemukan
    if (error.code === "P2025") {
      // Error code untuk task yang tidak ditemukan
      return res.status(404).json({
        success: false,
        message: "Task not found", // Pesan jika task tidak ditemukan
      });
    }

    // Menangani error lainnya dan mengirimkan response dengan status 500
    return res.status(500).json({
      success: false,
      message: "Internal server error", // Pesan error umum
      error: process.env.NODE_ENV === "development" ? error.message : undefined, // Menampilkan pesan error pada mode development
    });
  }
};

export default { updateTask }; // Mengekspor fungsi updateTask untuk digunakan di bagian lain aplikasi
