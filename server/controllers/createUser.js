// import express
// Mengimpor modul Express untuk membuat server web.
import express from "express";

// import prisma client
// Mengimpor PrismaClient untuk berinteraksi dengan database.
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient(); // Membuat instance PrismaClient untuk operasi database.

// import validationResult
// Mengimpor fungsi validationResult dari express-validator untuk memvalidasi data permintaan.
import { validationResult } from "express-validator";

// import bcrypt
// Mengimpor bcrypt untuk mengenkripsi password sebelum menyimpannya di database.
import bcrypt from "bcryptjs";

// function create user
// Fungsi untuk membuat pengguna baru di database.
const createUser = async (req, res) => {
  // Periksa hasil validasi
  // Memeriksa apakah ada error validasi dalam permintaan.
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Jika ada error validasi, kembalikan respons dengan status 422 (Unprocessable Entity).
    return res.status(422).json({
      success: false, // Status gagal.
      message: "Validation Error", // Pesan kesalahan validasi.
      errors: errors.array(), // Daftar error validasi.
    });
  }

  // hashed password
  // Meng-hash password yang diberikan oleh pengguna sebelum menyimpannya di database.
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    // Insert data
    // Menyimpan data pengguna baru ke dalam database.
    const user = await prisma.user.create({
      data: {
        username: req.body.username, // Menyimpan nama pengguna.
        email: req.body.email, // Menyimpan email pengguna.
        password: hashedPassword, // Menyimpan password yang telah di-hash.
      },
    });

    // Mengembalikan respons sukses dengan data pengguna yang baru dibuat.
    res.status(201).send({
      success: true, // Status sukses.
      message: "User created successfully", // Pesan sukses pembuatan pengguna.
      data: user, // Data pengguna yang baru dibuat.
    });
  } catch (error) {
    // Jika terjadi error, kembalikan respons dengan status 500 (Internal Server Error).
    res.status(500).send({
      success: false, // Status gagal.
      message: "Internal server error", // Pesan error internal server.
    });
  }
};

// Export default
// Mengekspor fungsi createUser untuk digunakan di bagian lain aplikasi.
export default { createUser };
