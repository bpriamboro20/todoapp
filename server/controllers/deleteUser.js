// import express
// Mengimpor modul Express untuk membuat server web.
import express from "express";

// import prisma client
// Mengimpor PrismaClient untuk berinteraksi dengan database.
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient(); // Membuat instance PrismaClient untuk operasi database.

// function deleteUser
// Fungsi untuk menghapus pengguna berdasarkan ID.
export const deleteUser = async (req, res) => {
  // get id from params
  // Mendapatkan ID pengguna dari parameter URL.
  const { id } = req.params;

  try {
    // delete user
    // Menghapus pengguna yang ada berdasarkan ID.
    await prisma.user.delete({
      where: {
        id: Number(id), // Menentukan pengguna berdasarkan ID.
      },
    });

    // Mengembalikan respons sukses setelah pengguna dihapus.
    res.status(200).send({
      success: true, // Status sukses.
      message: "User deleted successfully", // Pesan sukses penghapusan pengguna.
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
// Mengekspor fungsi deleteUser untuk digunakan di bagian lain aplikasi.
export default { deleteUser };
