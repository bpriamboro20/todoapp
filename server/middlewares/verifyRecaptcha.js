import axios from "axios"; // Import library axios untuk melakukan HTTP request
const { RECAPTCHA_SECRET_KEY } = process.env; // Ambil secret key reCAPTCHA dari environment variables

/**
 * Middleware untuk memverifikasi token reCAPTCHA yang dikirimkan oleh client.
 */
const verifyRecaptcha = async (req, res, next) => {
  const { captchaToken } = req.body; // Ambil token reCAPTCHA dari body request

  // Cek apakah RECAPTCHA_SECRET_KEY tersedia di environment variables
  if (!RECAPTCHA_SECRET_KEY) {
    console.error("RECAPTCHA_SECRET_KEY is not defined in environment variables."); // Tampilkan error di console jika tidak ada
    return res.status(500).json({ message: "Server configuration error" }); // Kirim respons 500 (konfigurasi server bermasalah)
  }

  // Mengecek apakah token reCAPTCHA ada di body request
  if (!captchaToken) {
    return res.status(400).json({ message: "reCAPTCHA token is missing" }); // Kirim respons 400 jika token tidak ditemukan
  }

  try {
    // Mengirimkan request POST ke Google reCAPTCHA API untuk memverifikasi token
    const response = await axios.post("https://www.google.com/recaptcha/api/siteverify", null, {
      params: {
        secret: RECAPTCHA_SECRET_KEY, // Secret key untuk autentikasi ke Google
        response: captchaToken, // Token reCAPTCHA yang dikirimkan client
      },
    });

    const { success, "error-codes": errorCodes } = response.data; // Destruktur respons dari Google untuk mendapatkan status dan error codes

    // Jika verifikasi gagal (success = false), kirimkan pesan error
    if (!success) {
      console.warn("Invalid reCAPTCHA token:", errorCodes); // Tampilkan peringatan di console untuk debugging
      return res.status(400).json({
        message: "Invalid reCAPTCHA token", // Pesan error untuk client
        errorCodes, // Sertakan kode error untuk membantu debugging
      });
    }

    // Jika verifikasi berhasil, lanjutkan ke middleware berikutnya
    next();
  } catch (error) {
    // Tangkap error jika terjadi masalah saat melakukan request ke Google
    console.error("reCAPTCHA verification error:", error.message || error); // Tampilkan error di console
    return res.status(500).json({ message: "Internal Server Error" }); // Kirim respons 500 (server error)
  }
};

export default verifyRecaptcha; // Export middleware verifyRecaptcha agar bisa digunakan di file lain
