// Import express validator
// Mengimpor fungsi 'body' dari express-validator untuk memvalidasi input.
import { body } from "express-validator";

// Import prisma client
// Mengimpor PrismaClient untuk berinteraksi dengan database.
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient(); // Membuat instance PrismaClient untuk digunakan pada validasi.

// Definisikan validasi untuk register
// Menyusun array middleware validasi untuk rute registrasi pengguna.
export const validateRegister = [
  // Validasi untuk username
  body("username")
    .notEmpty() // Memastikan username tidak kosong.
    .withMessage("Username is required") // Pesan error jika username kosong.
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/) // Memeriksa pola: harus ada huruf kecil, huruf besar, dan angka.
    .withMessage("Username must contain at least one lowercase, one uppercase letter, and one digit") // Pesan error jika pola tidak sesuai.
    .isLength({ min: 8 }) // Memastikan panjang username minimal 8 karakter.
    .withMessage("Username must be at least 8 characters long") // Pesan error jika panjang kurang dari 8 karakter.
    .isAlphanumeric() // Memastikan username hanya terdiri dari huruf dan angka.
    .withMessage("Username must be alphanumeric"), // Pesan error jika tidak alfanumerik.

  // Validasi untuk email
  body("email")
    .notEmpty() // Memastikan email tidak kosong.
    .withMessage("Email is required") // Pesan error jika email kosong.
    .isEmail() // Memeriksa apakah email memiliki format yang valid.
    .withMessage("Email is invalid") // Pesan error jika format email salah.
    .custom(async (value) => {
      // Memeriksa apakah email sudah ada di database.
      const user = await prisma.user.findUnique({
        where: { email: value },
      });
      if (user) {
        throw new Error("Email already exists"); // Pesan error jika email sudah digunakan.
      }
      return true; // Mengembalikan true jika email belum digunakan.
    }),

  // Validasi untuk password
  body("password")
    .notEmpty() // Memastikan password tidak kosong.
    .withMessage("Password is required") // Pesan error jika password kosong.
    .isLength({ min: 8 }) // Memastikan panjang password minimal 8 karakter.
    .withMessage("Password must be at least 8 characters long"), // Pesan error jika panjang kurang dari 8 karakter.
];

// Validasi untuk login
// Menyusun array middleware validasi untuk rute login pengguna.
export const validateLogin = [
  // Validasi untuk email
  body("email")
    .notEmpty() // Memastikan email tidak kosong.
    .withMessage("Email is required") // Pesan error jika email kosong.
    .isEmail() // Memeriksa apakah email memiliki format yang valid.
    .withMessage("Email is invalid"), // Pesan error jika format email salah.

  // Validasi untuk password
  body("password")
    .notEmpty() // Memastikan password tidak kosong.
    .withMessage("Password is required") // Pesan error jika password kosong.
    .isLength({ min: 8 }) // Memastikan panjang password minimal 8 karakter.
    .withMessage("Password must be at least 8 characters long"), // Pesan error jika panjang kurang dari 8 karakter.
];
