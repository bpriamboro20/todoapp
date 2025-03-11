// import express
// Mengimpor modul Express untuk membuat server web.
import express from "express";

// import prisma client
// Mengimpor PrismaClient untuk berinteraksi dengan database.
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient(); // Membuat instance PrismaClient untuk operasi database.

// function findUserById
// Fungsi untuk mendapatkan data pengguna berdasarkan ID.
export const getDataUserById = async (req, res) => {
  // Get Id Form params
  // Mendapatkan ID pengguna dari parameter URL.
  const { id } = req.params;

  try {
    // Get user by Id
    // Mencari data pengguna berdasarkan ID di database.
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id), // Menentukan pengguna berdasarkan ID.
      },
      select: {
        id: true, // Mengambil ID pengguna.
        username: true, // Mengambil username pengguna.
        email: true, // Mengambil email pengguna.
      },
    });

    // Check if user exists
    // Memeriksa apakah pengguna dengan ID tersebut ada.
    if (!user) {
      // Jika pengguna tidak ditemukan, mengembalikan respons dengan status 404 (Not Found).
      return res.status(404).send({
        success: false, // Status gagal.
        message: `User with ID ${id} not found`, // Pesan kesalahan jika pengguna tidak ditemukan.
      });
    }

    // send response
    // Mengembalikan respons sukses dengan data pengguna.
    res.status(200).send({
      success: true, // Status sukses.
      message: `Get user by ID : ${id}`, // Pesan sukses dengan ID pengguna.
      data: user, // Data pengguna yang ditemukan.
    });
  } catch (error) {
    // Jika terjadi error lainnya, mengembalikan respons dengan status 500 (Internal Server Error).
    res.status(500).send({
      success: false, // Status gagal.
      message: "Internal server error", // Pesan error internal server.
    });
  }
};

// Export default
// Mengekspor fungsi getDataUserById untuk digunakan di bagian lain aplikasi.
export default { getDataUserById };
