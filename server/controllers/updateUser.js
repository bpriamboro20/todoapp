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

// function update user
// Fungsi untuk memperbarui data pengguna berdasarkan ID.
export const updateUser = async (req, res) => {
  // get Id from params
  // Mendapatkan ID pengguna dari parameter URL.
  const { id } = req.params;

  // periksa hasil validasi
  // Memeriksa apakah ada error validasi dalam permintaan.
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Jika ada error validasi, kembalikan respons dengan status 422 (Unprocessable Entity).
    return res.status(422).json({
      success: false, // Status gagal.
      message: "Validation error", // Pesan kesalahan validasi.
      errors: errors.array(), // Daftar error validasi.
    });
  }

  // hashed password
  // Meng-hash password yang diberikan oleh pengguna sebelum menyimpannya di database.
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    // update user
    // Memperbarui data pengguna yang ada berdasarkan ID.
    const user = await prisma.user.update({
      where: {
        id: Number(id), // Menentukan pengguna berdasarkan ID.
      },
      data: {
        username: req.body.username, // Memperbarui nama pengguna.
        email: req.body.email, // Memperbarui email pengguna.
        password: hashedPassword, // Memperbarui password yang telah di-hash.
      },
    });

    // Mengembalikan respons sukses dengan data pengguna yang telah diperbarui.
    res.status(200).send({
      success: true, // Status sukses.
      message: "User updated successfully", // Pesan sukses pembaruan pengguna.
      data: user, // Data pengguna yang telah diperbarui.
    });
  } catch (error) {
    // Handle case when user ID is not found
    // Menangani kasus ketika ID pengguna tidak ditemukan di database.
    if (error.code === "P2025") {
      return res.status(404).send({
        success: false, // Status gagal.
        message: `User with ID ${id} not found`, // Pesan kesalahan jika pengguna tidak ditemukan.
      });
    }

    // Jika terjadi error lainnya, mengembalikan respons dengan status 500 (Internal Server Error).
    res.status(500).send({
      success: false, // Status gagal.
      message: "Internal server error", // Pesan error internal server.
    });
  }
};

// Export default
// Mengekspor fungsi updateUser untuk digunakan di bagian lain aplikasi.
export default { updateUser };
