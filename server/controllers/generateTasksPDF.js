// Mengimpor PrismaClient dari @prisma/client untuk berinteraksi dengan database
import { PrismaClient } from "@prisma/client";
// Mengimpor PDFDocument dari pdfkit untuk membuat file PDF
import PDFDocument from "pdfkit";

// Membuat instance PrismaClient untuk melakukan query ke database
const prisma = new PrismaClient();

// Fungsi untuk menghasilkan laporan PDF berisi data tasks\const generateTasksPDF = async (req, res) => {
try {
  // Mengambil semua data tasks dari database, termasuk data author (pengguna yang membuat task)
  const tasks = await prisma.task.findMany({
    include: {
      author: true, // Menyertakan data user yang terkait dengan setiap task
    },
  });

  // Membuat dokumen PDF baru
  const doc = new PDFDocument();

  // Mengatur header response agar browser mengenali ini sebagai file PDF yang bisa diunduh
  res.setHeader("Content-Type", "application/pdf"); // Menentukan tipe konten sebagai PDF
  res.setHeader("Content-Disposition", 'attachment; filename="tasks_report.pdf"'); // Menentukan nama file saat diunduh

  // Menghubungkan (pipe) dokumen PDF ke response, sehingga file langsung dikirim ke client
  doc.pipe(res);

  // Menambahkan judul "Tasks Report" di bagian atas PDF dengan ukuran font 20 dan rata tengah
  doc.fontSize(20).text("Tasks Report", { align: "center" });
  doc.moveDown(); // Memberi jarak (spasi) setelah judul

  // Melakukan perulangan untuk menampilkan setiap task ke dalam PDF
  tasks.forEach((task) => {
    doc.fontSize(14).text(`Task: ${task.name}`, { align: "left" }); // Menampilkan nama task
    doc.text(`Assigned to: ${task.author.username}`, { align: "left" }); // Menampilkan siapa yang membuat task
    doc.text(`Priority: ${task.priority}`, { align: "left" }); // Menampilkan prioritas task
    doc.text(`Status: ${task.status ? "Completed" : "Pending"}`, { align: "left" }); // Menampilkan status task (selesai/belum)
    doc.text(`Created At: ${task.createdAt}`, { align: "left" }); // Menampilkan tanggal pembuatan task
    doc.moveDown(); // Memberi jarak antar task
  });

  // Menyelesaikan proses pembuatan dokumen PDF
  doc.end();
} catch (error) {
  // Menangani error jika terjadi masalah saat mengambil data atau membuat PDF
  console.error(error); // Menampilkan error di console
  res.status(500).send("Error generating PDF"); // Mengirim respons error ke client
}
// Mengekspor fungsi generateTasksPDF agar bisa digunakan di file lain
export default { generateTasksPDF };
