import { PrismaClient } from "@prisma/client"; // Mengimpor PrismaClient dari paket @prisma/client untuk berinteraksi dengan database
import PDFDocument from "pdfkit"; // Mengimpor PDFDocument dari pdfkit untuk menghasilkan dokumen PDF

const prisma = new PrismaClient(); // Membuat instance PrismaClient untuk menghubungkan dengan database

const generateUsersPDF = async (req, res) => {
  // Fungsi asinkron untuk menghasilkan laporan PDF berdasarkan data pengguna
  try {
    console.log("Fetching users..."); // Menampilkan pesan di konsol untuk menunjukkan bahwa pengambilan data pengguna sedang dilakukan
    const users = await prisma.user.findMany(); // Mengambil semua data pengguna dari database menggunakan Prisma ORM
    console.log("Fetched users:", users); // Menampilkan data pengguna yang diambil ke konsol

    // Buat dokumen PDF baru
    const doc = new PDFDocument(); // Membuat instance baru dari PDFDocument untuk membangun dokumen PDF

    // Set header untuk response PDF
    res.setHeader("Content-Type", "application/pdf"); // Menetapkan header 'Content-Type' sebagai 'application/pdf' untuk memberitahu browser bahwa ini adalah file PDF
    res.setHeader("Content-Disposition", 'attachment; filename="users_report.pdf"'); // Menetapkan header 'Content-Disposition' agar file PDF diunduh dengan nama "users_report.pdf"

    // Pipe dokumen PDF ke response
    doc.pipe(res); // Meneruskan dokumen PDF ke response sehingga file PDF dapat dikirimkan ke client

    // Tambahkan judul ke PDF
    doc.fontSize(20).text("Users Report", { align: "center" }); // Menambahkan teks dengan ukuran font 20 dan rata tengah untuk judul "Users Report"
    doc.moveDown(); // Pindahkan posisi teks ke bawah

    // Loop untuk menambahkan data users ke dalam PDF
    users.forEach((user) => {
      // Mengiterasi setiap objek pengguna dalam array 'users'
      const username = user.username || "N/A"; // Mendapatkan username, jika tidak ada, gunakan "N/A"
      const email = user.email || "N/A"; // Mendapatkan email, jika tidak ada, gunakan "N/A"
      const role = user.role || "N/A"; // Mendapatkan role, jika tidak ada, gunakan "N/A"
      const createdAt = user.createdAt ? user.createdAt.toISOString() : "N/A"; // Mendapatkan tanggal dibuat, jika tidak ada, gunakan "N/A"

      doc.fontSize(14).text(`Username: ${username}`, { align: "left" }); // Menambahkan teks untuk username dengan ukuran font 14 dan rata kiri
      doc.text(`Email: ${email}`, { align: "left" }); // Menambahkan teks untuk email dengan rata kiri
      doc.text(`Role: ${role}`, { align: "left" }); // Menambahkan teks untuk role dengan rata kiri
      doc.text(`Created At: ${createdAt}`, { align: "left" }); // Menambahkan teks untuk tanggal dibuat dengan rata kiri
      doc.moveDown(); // Pindahkan posisi teks ke bawah untuk setiap pengguna
    });

    // Menyelesaikan pembuatan dokumen PDF
    doc.end(); // Menandakan bahwa dokumen PDF selesai dibuat
    console.log("PDF successfully generated and sent."); // Menampilkan pesan bahwa PDF telah berhasil dibuat dan dikirim
  } catch (error) {
    console.error("Error in generateUsersPDF:", error); // Menangkap dan menampilkan error jika terjadi kesalahan saat membuat PDF
    res.status(500).send("Error generating PDF"); // Mengirimkan response dengan status 500 dan pesan error jika terjadi kesalahan
  }
};

export default { generateUsersPDF }; // Mengekspor fungsi generateUsersPDF sebagai bagian dari objek default
