// Import library `axios` untuk melakukan permintaan HTTP
import axios from "axios";
// Import library `js-cookie` untuk mengelola cookie di browser
import Cookies from "js-cookie";

// Membuat instance Axios dengan konfigurasi default
const Api = axios.create({
  // Mengatur endpoint default untuk semua permintaan yang menggunakan instance ini
  baseURL: "http://localhost:3000", // URL dasar API
});

// Mengambil token dari cookie
const token = Cookies.get("token");
if (token) {
  // Jika token tersedia, tambahkan Authorization header ke instance Axios
  Api.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Mengatur header Authorization dengan token Bearer
}

// Ekspor instance `Api` sehingga dapat digunakan di seluruh aplikasi
export default Api;
