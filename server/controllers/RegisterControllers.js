// Import validationResult from express-validator
// Mengimpor fungsi validationResult dari express-validator untuk memeriksa hasil validasi.
import { validationResult } from "express-validator";

// Import bcrypt
// Mengimpor bcrypt untuk melakukan hashing password.
import bcrypt from "bcryptjs";

// Import prisma client
// Mengimpor PrismaClient untuk berinteraksi dengan database.
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient(); // Membuat instance PrismaClient untuk digunakan dalam operasi database.

// Function register
// Fungsi untuk menangani proses registrasi pengguna.
const register = async (req, res) => {
  // Periksa hasil validasi
  // Memeriksa apakah ada error validasi pada permintaan yang masuk.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Jika ada error, kembalikan respons dengan status 422 (Unprocessable Entity).
    return res.status(422).json({
      success: false,
      message: "Validation Error", // Pesan error validasi.
      errors: errors.array(), // Menyertakan daftar error validasi.
    });
  }

  // Hash password
  // Meng-hash password yang diterima dari request body untuk keamanan.
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    // Hitung jumlah user yang ada di database
    // Menghitung jumlah pengguna yang sudah ada di database.
    const userCount = await prisma.user.count();

    // Tentukan role berdasarkan jumlah user
    // Menentukan role pengguna: ADMIN jika belum ada pengguna lain, USER jika sudah ada pengguna.
    const role = userCount === 0 ? "ADMIN" : "USER";

    // Insert data dengan role yang sesuai
    // Menyimpan data pengguna baru ke database dengan role yang telah ditentukan.
    const user = await prisma.user.create({
      data: {
        username: req.body.username, // Menyimpan username dari request body.
        email: req.body.email, // Menyimpan email dari request body.
        password: hashedPassword, // Menyimpan password yang sudah di-hash.
        role: role, // Menentukan role pengguna.
      },
    });

    // Return response json
    // Mengembalikan respons sukses dengan status 201 (Created) dan data pengguna yang baru dibuat.
    res.status(201).json({
      success: true,
      message: "Register Successfully", // Pesan sukses.
      data: user, // Data pengguna baru.
    });
  } catch (error) {
    // Tangani error
    console.error(error); // Mencetak error ke konsol untuk keperluan debugging.
    res.status(500).json({
      success: false,
      message: "Internal server error", // Pesan error jika terjadi masalah pada server.
    });
  }
};

// Export default
// Mengekspor fungsi register untuk digunakan di bagian lain aplikasi.
export default { register };
