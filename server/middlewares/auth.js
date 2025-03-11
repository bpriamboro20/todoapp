// // Import JWT untuk verifikasi token
// import jwt from "jsonwebtoken";

// // Middleware untuk memverifikasi token JWT
// const verifyToken = (req, res, next) => {
//   try {
//     const token = req.headers["authorization"]?.split(" ")[1]; // Ambil token dari header
//     if (!token) {
//       return res.status(401).json({ message: "Unauthenticated. No token provided." });
//     }

//     // Decode token untuk cek kedaluwarsa tanpa verifikasi
//     const decoded = jwt.decode(token);
//     if (decoded && decoded.exp * 1000 < Date.now()) {
//       return res.status(401).json({ message: "Token expired." });
//     }

//     // Verifikasi token dengan kunci rahasia
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         console.error("Token verification error:", err.message);
//         return res.status(401).json({ message: "Invalid token." });
//       }

//       req.userId = decoded.id; // Simpan userId ke request
//       next(); // Lanjutkan ke middleware berikutnya
//     });
//   } catch (error) {
//     console.error("Error in verifyToken middleware:", error);
//     res.status(500).json({ message: "Internal server error." });
//   }
// };

// // Ekspor middleware
// export default verifyToken;

import jwt from "jsonwebtoken"; // Import library jsonwebtoken untuk mengelola JWT (JSON Web Token)

// Middleware untuk memverifikasi token JWT
const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.headers["authorization"]; // Ambil header 'authorization' dari request
    if (!authorizationHeader) {
      // Cek apakah header authorization tersedia
      return res.status(401).json({ message: "Unauthenticated. No token provided." }); // Jika tidak ada, kirim respons 401 (unauthenticated)
    }

    // Cek apakah header authorization menggunakan format 'Bearer'
    const token = authorizationHeader.startsWith("Bearer ")
      ? authorizationHeader.split(" ")[1] // Jika iya, ambil token setelah kata 'Bearer'
      : authorizationHeader; // Jika tidak, gunakan langsung nilai header sebagai token

    if (!token) {
      // Cek apakah token tersedia setelah parsing
      return res.status(401).json({ message: "Unauthenticated. Invalid token format." }); // Jika tidak, kirim respons 401 (unauthenticated)
    }

    // Decode token untuk memeriksa apakah token sudah kedaluwarsa tanpa verifikasi tanda tangan
    const decoded = jwt.decode(token);
    if (decoded && decoded.exp * 1000 < Date.now()) {
      // Cek apakah waktu kedaluwarsa token sudah lewat
      return res.status(401).json({ message: "Token expired." }); // Jika token sudah kedaluwarsa, kirim respons 401
    }

    // Verifikasi token menggunakan secret key dari environment variable
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        // Jika terjadi error saat verifikasi (misalnya token tidak valid)
        console.error("Token verification error:", err.message); // Tampilkan pesan error di console
        return res.status(401).json({ message: "Invalid token." }); // Kirim respons 401 (token tidak valid)
      }

      req.userId = decoded.id; // Simpan userId yang didapat dari token ke objek request untuk digunakan di middleware berikutnya
      next(); // Lanjutkan ke middleware atau route handler berikutnya
    });
  } catch (error) {
    // Tangkap error yang tidak terduga
    console.error("Error in verifyToken middleware:", error); // Tampilkan pesan error di console
    res.status(500).json({ message: "Internal server error." }); // Kirim respons 500 (server error)
  }
};

export default verifyToken; // Export middleware verifyToken agar bisa digunakan di file lain
