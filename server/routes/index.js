// Import express
import express from "express";

// Init express router
const router = express.Router();

// import verifyToken - Middleware untuk memverifikasi token JWT
import verifyToken from "../middlewares/auth.js";

// Import register controller - Berisi logika untuk registrasi pengguna baru
import registerControllers from "../controllers/RegisterControllers.js";

// import login controller - Berisi logika untuk login pengguna
import loginController from "../controllers/LoginController.js";

// import get all data users - Berisi logika untuk mengambil semua data pengguna
import getAllDataUsers from "../controllers/getAllDataUsers.js";

// import create data user - Berisi logika untuk membuat data pengguna baru
import createUser from "../controllers/createUser.js";

// import get data user by id - Berisi logika untuk mendapatkan data pengguna berdasarkan ID
import getDataUserById from "../controllers/getDataUserById.js";

// import update user - Berisi logika untuk memperbarui data pengguna berdasarkan ID
import updateUser from "../controllers/updateUser.js";

// import delete user - Berisi logika untuk menghapus data pengguna berdasarkan ID
import deleteUser from "../controllers/deleteUser.js";

// import get all data tasks - Berisi logika untuk mengambil semua data task by id users/ id authors
import getAllDataTasks from "../controllers/getAllDataTasks.js";

// import get all data tasks - Berisi logika untuk mengambil semua data task. Khusus admin yang bisa melihat semua data task
import getAllDataTasksAdmin from "../controllers/getAllDataTasksAdmin.js";

// import create data task - Berisi logika untuk membuat data task
import createTask from "../controllers/createTask.js";

// import update data task - Berisi logika untuk memperbarui data task berdasarkan ID
import updateTask from "../controllers/updateTask.js";

// import delete task - Berisi logika untuk menghapus data task berdasarkan ID
import deleteTask from "../controllers/deleteTask.js";

// import get data task by id - Berisi logika untuk mendapatkan data task berdasarkan ID
import getDataTaskById from "../controllers/getDataTaskById.js";

// Import validate register - Validasi input untuk registrasi
import { validateRegister, validateLogin } from "../utils/validators/auth.js";

// import validate user - Validasi input untuk operasi CRUD pada pengguna
import { validateUser } from "../utils/validators/user.js";

//import controllers untuk data diagram
import getStatsTask from "../controllers/getStatsTask.js";
import getStatsPriority from "../controllers/getStatsPriority.js";
import getStatsStatus from "../controllers/getStatsStatus.js";

//import middleware recaptcha
import verifyRecaptcha from "../middlewares/verifyRecaptcha.js";

// Define route for register - Rute untuk registrasi pengguna baru
router.post("/register", validateRegister, registerControllers.register);

// Define route for login - Rute untuk autentikasi pengguna
router.post("/login", validateLogin, verifyRecaptcha, loginController.login);

// Define route for user - Mengambil semua data pengguna, hanya dapat diakses oleh pengguna yang terverifikasi
router.get("/admin/users", verifyToken, getAllDataUsers.getAllDataUsers);

// Define route for user create - Menambahkan pengguna baru, dengan validasi input dan token
router.post("/admin/users", verifyToken, validateUser, createUser.createUser);

// Define route for user by ID - Mengambil data pengguna berdasarkan ID
router.get("/admin/users/:id", verifyToken, getDataUserById.getDataUserById);

// Define route for user update - Memperbarui data pengguna berdasarkan ID
router.put("/admin/users/:id", verifyToken, validateUser, updateUser.updateUser);

// Define route for user delete - Menghapus data pengguna berdasarkan ID
router.delete("/admin/users/:id", verifyToken, deleteUser.deleteUser);

// Define route for task - Mengambil semua data task sesuai dengan id authors, hanya dapat diakses oleh pengguna yang terverifikasi
router.get("/users/tasks", verifyToken, getAllDataTasks.getAllDataTasks);

// Define route for task - Mengambil semua data task secara global dan khusus admin yang bisa akses, hanya dapat diakses oleh pengguna yang terverifikasi
router.get("/users/tasks/admin", verifyToken, getAllDataTasksAdmin.getAllDataTasksAdmin);

// Define route for task create - Menambahkan task, dengan validasi input dan token
router.post("/users/tasks", verifyToken, createTask.createTask);

// Define route for task update - Memperbarui data task berdasarkan ID
router.put("/users/tasks/:id", verifyToken, updateTask.updateTask);

// Define route for task delete - Menghapus data task berdasarkan ID
router.delete("/users/tasks/:id", verifyToken, deleteTask.deleteTask);

//  route for task by ID - Mengambil data task berdasarkan ID
router.get("/users/tasks/:id", verifyToken, getDataTaskById.getDataTaskById);

// Define rute statistik diagram task
router.get("/admin/tasks/statstask", verifyToken, getStatsTask.getStatsTask);

// Define rute diagram task status priority
router.get("/admin/tasks/statspriority", verifyToken, getStatsPriority.getStatsPriority);

// Define rute diagram task status done nad undone
router.get("/admin/tasks/statsstatus", verifyToken, getStatsStatus.getStatsStatus);

// Define rute diagram menghitung jumlah seluruh users
router.get("/admin/count/users", verifyToken, getAllDataUsers.getUsersCount);
// Define rute diagram menghitung jumlah seluruh tasks
router.get("/admin/count/tasks", verifyToken, getAllDataTasks.getTasksCount);

// Export router - Menjadikan router tersedia untuk file lain
export default router;
