// Import express validator
import { body } from "express-validator";

// Import prisma client
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Definisikan validasi untuk create user
export const validateUser = [
  // Validasi username
  body("username")
    .notEmpty()
    .withMessage("Username is required") // Username tidak boleh kosong
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)
    .withMessage("Username must contain at least one lowercase, one uppercase letter, and one digit") // Harus ada huruf besar, kecil, dan angka
    .isLength({ min: 8 })
    .withMessage("Username must be at least 8 characters long") // Panjang minimal 8 karakter
    .isAlphanumeric()
    .withMessage("Username must be alphanumeric"), // Hanya huruf dan angka

  // Validasi email
  body("email")
    .notEmpty()
    .withMessage("Email is required") // Email tidak boleh kosong
    .isEmail()
    .withMessage("Email is invalid") // Format email harus valid
    .custom(async (value) => {
      // Cek apakah email sudah ada di database
      const user = await prisma.user.findUnique({
        where: { email: value },
      });
      if (user) {
        throw new Error("Email already exists"); // Email sudah terdaftar
      }
      return true;
    }),

  // Validasi password
  body("password")
    .notEmpty()
    .withMessage("Password is required") // Password tidak boleh kosong
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"), // Panjang minimal 8 karakter
];
