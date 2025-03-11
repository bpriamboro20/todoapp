// Mengimpor fungsi defineStore dari Pinia untuk membuat store
import { defineStore } from "pinia";
// Mengimpor library js-cookie untuk mengelola cookie di browser
import Cookies from "js-cookie";

// Mendefinisikan store otentikasi dengan nama 'auth'
export const useAuthStore = defineStore("auth", {
  // State untuk menyimpan status login dan data pengguna
  state: () => ({
    isLoggedIn: !!Cookies.get("token"), // Mengecek apakah token ada di cookie untuk menentukan status login
    user: (() => {
      const userCookie = Cookies.get("user"); // Mengambil data user dari cookie
      if (userCookie) {
        try {
          return JSON.parse(userCookie); // Mengubah string JSON user menjadi objek JavaScript
        } catch (error) {
          console.error("Failed to parse user cookie:", error); // Menangani error jika parsing gagal
          return null; // Mengembalikan null jika gagal parsing
        }
      }
      return null; // Jika tidak ada cookie user, mengembalikan null
    })(),
  }),

  // Getter untuk mengambil data dari state
  getters: {
    isAuthenticated(state) {
      // Mengembalikan true jika isLoggedIn true dan token tersedia di cookie
      return state.isLoggedIn && !!Cookies.get("token");
    },
    token(state) {
      return Cookies.get("token"); // Mengambil token dari cookie
    },
  },

  // Action untuk mengubah state dan melakukan operasi logika
  actions: {
    login(token, user) {
      try {
        // Menyimpan token dan data user ke cookie dengan masa berlaku 7 hari
        Cookies.set("token", token, { path: "/", expires: 7 });
        Cookies.set("user", JSON.stringify(user), { path: "/", expires: 7 });
        this.isLoggedIn = true; // Mengubah status login menjadi true
        this.user = user; // Menyimpan data user ke state
        console.log("Login successful. Token and user saved to cookies.");
        console.log("Login successful. Token:", token);
        console.log("Username Login:", user.username);
      } catch (error) {
        console.error("Failed to save login data:", error); // Menangani error jika gagal menyimpan data login
      }
    },

    logout() {
      try {
        // Menghapus token dan user dari cookie
        Cookies.remove("token", { path: "/" });
        Cookies.remove("user", { path: "/" });
        this.isLoggedIn = false; // Mengubah status login menjadi false
        this.user = null; // Menghapus data user dari state
      } catch (error) {
        console.error("Failed to clear cookies during logout:", error); // Menangani error saat logout
      }
    },

    reloadAuthState() {
      try {
        const token = Cookies.get("token"); // Mengambil token dari cookie
        const userCookie = Cookies.get("user"); // Mengambil data user dari cookie

        if (token && userCookie) {
          this.isLoggedIn = true; // Jika token dan user tersedia, set status login menjadi true
          this.user = JSON.parse(userCookie); // Parsing data user dari cookie
          console.log("Auth state reloaded from cookies:", this.user); // Debugging: menampilkan data user
        } else {
          this.logout(); // Jika tidak ada token atau user, lakukan logout
        }
      } catch (error) {
        console.error("Failed to reload auth state:", error); // Menangani error saat reload state
        this.logout(); // Logout jika terjadi error
      }
    },
  },
});
