// import validationResult
// Mengimpor fungsi validationResult dari express-validator untuk memvalidasi data dari permintaan.
import { validationResult } from "express-validator";

// import bcrypt
// Mengimpor bcrypt untuk membandingkan password yang di-hash.
import bcrypt from "bcryptjs";

// import jsonwebtoken
// Mengimpor jsonwebtoken (JWT) untuk membuat dan memverifikasi token autentikasi.
import jwt from "jsonwebtoken";

// Import prisma client
// Mengimpor PrismaClient untuk berinteraksi dengan database.
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient(); // Membuat instance PrismaClient untuk operasi database.

// function login
// Fungsi untuk menangani proses login pengguna.
const login = async (req, res) => {
  // Periksa hasil validasi
  // Memeriksa apakah ada error validasi dalam permintaan.
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Jika ada error, kembalikan respons dengan status 422 (Unprocessable Entity).
    return res.status(422).json({
      success: false,
      message: "Validation Error", // Pesan kesalahan validasi.
      error: errors.array(), // Menyertakan daftar error validasi.
    });
  }
  try {
    // Find User
    // Mencari pengguna berdasarkan email yang diberikan dalam permintaan.
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email, // Menyesuaikan email dengan database.
      },
      select: {
        id: true, // Mengambil ID pengguna.
        username: true, // Mengambil nama pengguna.
        email: true, // Mengambil email pengguna.
        password: true, // Mengambil password yang di-hash.
        role: true, // Mengambil peran pengguna.
      },
    });

    // user not found
    // Jika pengguna tidak ditemukan, kembalikan respons dengan status 404 (Not Found).
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found", // Pesan jika pengguna tidak ditemukan.
      });

    // compare password
    // Membandingkan password yang diberikan dengan password yang di-hash di database.
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    // Password incorrect
    // Jika password salah, kembalikan respons dengan status 401 (Unauthorized).
    if (!validPassword)
      return res.status(401).json({
        success: false,
        message: "Invalid Password", // Pesan jika password salah.
      });

    // Generate Token JWT
    // Membuat token JWT dengan ID pengguna dan kunci rahasia dari environment variable.
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token berlaku selama 1 jam.
    });

    // destructuring to remove password from user object
    // Menghapus password dari objek user sebelum mengirimkan respons.
    const { password, ...userWithoutPassword } = user;

    // return response
    // Mengembalikan respons sukses dengan data pengguna (tanpa password) dan token autentikasi.
    res.status(200).send({
      success: true,
      message: "Login Successfulyy", // Pesan sukses login.
      data: {
        user: userWithoutPassword, // Data pengguna tanpa password.
        token: token, // Token autentikasi.
      },
    });
  } catch (error) {
    // Jika terjadi error, kembalikan respons dengan status 500 (Internal Server Error).
    res.status(500).send({
      success: false,
      message: "Internal server error", // Pesan error internal server.
    });
  }
};

// Export default
// Mengekspor fungsi login untuk digunakan di bagian lain aplikasi.
export default { login };
