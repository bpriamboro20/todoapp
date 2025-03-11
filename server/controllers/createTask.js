import { PrismaClient } from "@prisma/client"; // Import PrismaClient untuk berinteraksi dengan database
const prisma = new PrismaClient(); // Inisialisasi instance PrismaClient

// Fungsi untuk membuat task baru
const createTask = async (req, res) => {
  try {
    // Validasi input: cek apakah 'name' ada dan tidak kosong
    if (!req.body.name || req.body.name.trim() === "") {
      return res.status(400).send({
        // Kirim respons 400 jika validasi gagal
        success: false,
        message: "Task name is required and cannot be empty", // Pesan error untuk client
      });
    }

    // Ambil data user berdasarkan userId yang sudah diverifikasi (biasanya dari token JWT)
    const user = await prisma.user.findUnique({
      where: { id: req.userId }, // Cari user berdasarkan ID
      select: { username: true }, // Ambil hanya field 'username' dari user
    });

    // Jika user tidak ditemukan di database
    if (!user) {
      return res.status(404).send({
        // Kirim respons 404 jika user tidak ada
        success: false,
        message: "Author not found", // Pesan error untuk client
      });
    }

    // Simpan task baru ke database
    const task = await prisma.task.create({
      data: {
        name: req.body.name, // Nama task yang dikirim dari client
        authorId: req.userId, // ID user sebagai author task
        authorUsername: user.username, // Username author untuk referensi
      },
    });

    // Mengembalikan respons sukses dengan data task yang baru dibuat
    return res.status(201).send({
      // Status 201 menunjukkan data berhasil dibuat
      success: true,
      message: "Task created successfully", // Pesan sukses untuk client
      data: {
        id: task.id, // ID task yang baru dibuat
        name: task.name, // Nama task
        status: task.status, // Status task, biasanya default belum selesai
      },
    });
  } catch (error) {
    // Tangkap error jika terjadi kesalahan saat proses
    console.error("Error creating task:", error); // Tampilkan error di console untuk debugging
    return res.status(500).send({
      // Kirim respons 500 jika ada error di server
      success: false,
      message: "Internal server error", // Pesan error untuk client
    });
  }
};

export default { createTask }; // Export fungsi createTask agar bisa digunakan di file lain
