// Import express
// Mengimpor modul Express untuk membuat server web.
import express from "express";

// Import cors
// Mengimpor modul CORS untuk menangani permintaan dari domain berbeda.
import cors from "cors";

// Import bodyParser
// Mengimpor body-parser untuk mem-parsing body dari permintaan HTTP.
import bodyParser from "body-parser";

// Import prisma helper
// Mengimpor PrismaClient untuk mengelola koneksi ke database.
import { PrismaClient } from "@prisma/client";

// Import router
// Mengimpor router dari file routes/index.js untuk mendefinisikan rute API.
import router from "./routes/index.js";
import dotenv from "dotenv";
dotenv.config(); // Memuat variabel lingkungan dari file .env

// Init app
// Membuat instance aplikasi Express.
const app = express();

// Init prisma client
// Membuat instance PrismaClient untuk berinteraksi dengan database.
const prisma = new PrismaClient();

// Use cors
// Menambahkan middleware CORS agar server dapat menerima permintaan dari domain berbeda.
app.use(cors());

// Use body parser
// Menambahkan middleware untuk mem-parsing data URL-encoded.
app.use(bodyParser.urlencoded({ extended: false }));

// Menambahkan middleware untuk mem-parsing data JSON.
app.use(bodyParser.json());

// Define port
// Mendefinisikan port tempat server akan berjalan (port 3000).
const port = 3000;

// Route
// Mendefinisikan rute GET pada path root (/) yang mengembalikan teks "Hello World".
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Define routes
// Menambahkan router untuk semua rute yang diawali dengan /api.
app.use("/api", router);

// Start server
// Menjalankan server pada port 3000 dan mencetak pesan ke konsol.
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Export prisma
// Mengekspor instance PrismaClient untuk digunakan di bagian lain aplikasi.
export default prisma;
