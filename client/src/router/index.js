// import { createRouter, createWebHistory } from "vue-router";
// import Cookie from "js-cookie";

// const HomeView = () => import("@/views/HomeView.vue");
// const FormUserLogin = () => import("@/views/FormUserLogin.vue");
// const FormUserRegist = () => import("@/views/FormUserRegist.vue");
// const HomeLoginUser = () => import("@/views/HomeLoginUser.vue");
// const DashboardAdmin = () => import("@/views/DashboardAdmin.vue");
// const ListTasks = () => import("@/components/ListTasks.vue");
// const ListUsers = () => import("@/components/ListUsers.vue");
// const NotFound404 = () => import("@/views/notFound404.vue");

// const getToken = () => Cookie.get("token");

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: "/",
//       name: "home",
//       component: HomeView,
//     },
//     { path: "/login", name: "login", component: FormUserLogin },
//     { path: "/register", name: "register", component: FormUserRegist },
//     {
//       path: "/dashboarduser",
//       name: "dashboarduser",
//       component: HomeLoginUser,
//       meta: { requiresAuth: true },
//     },
//     {
//       path: "/dashboardadmin",
//       name: "dashboardadmin",
//       component: DashboardAdmin,
//       meta: { requiresAuth: true },
//       children: [
//         { path: "listusers", component: ListUsers },
//         { path: "listtasks", component: ListTasks },
//       ],
//     },
//     { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound404 },
//   ],
// });

// router.beforeEach((to, from, next) => {
//   const token = getToken();
//   if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
//     next({ name: "login" });
//   } else if ((to.name === "login" || to.name === "register") && token) {
//     next({ name: "dashboarduser" }); // Bisa juga 'dashboardadmin' tergantung logika
//   } else {
//     next();
//   }
// });

// export default router;

// *****************************************************************************

// Import router dan komponen yang diperlukan dari Vue
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import FormUserLogin from "@/views/FormUserLogin.vue";
import FormUserRegist from "@/views/FormUserRegist.vue";
import HomeLoginUser from "@/views/HomeLoginUser.vue";
import DashboardAdmin from "@/views/DashboardAdmin.vue";
import ListTasks from "@/components/ListTasks.vue";
import ListUsers from "@/components/ListUsers.vue";
import DiagramTask from "@/views/DiagramTask.vue";
import DiagramStatus from "@/views/DiagramStatus.vue";
import notFound404 from "@/views/NotFound404.vue";
import UnderConstructionVue from "@/views/UnderConstruction.vue";
import Swal from "sweetalert2";
import ParticlesJsVue from "@/views/ParticlesJs.vue";

// Import js-cookie untuk mengakses cookies
import Cookie from "js-cookie";

// Utility untuk mendapatkan token dari cookies
const getToken = () => Cookie.get("token");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Menggunakan sejarah web HTML5
  routes: [
    // Halaman utama
    {
      path: "/",
      name: "home",
      component: HomeView, // Mengarahkan ke komponen HomeView
    },
    {
      path: "/particlesjs",
      name: "particlesjs",
      component: ParticlesJsVue, // Mengarahkan ke komponen HomeView
    },
    // Halaman login
    {
      path: "/login",
      name: "login",
      component: FormUserLogin, // Mengarahkan ke komponen FormUserLogin
    },
    // Halaman register
    {
      path: "/register",
      name: "register",
      component: FormUserRegist, // Mengarahkan ke komponen FormUserRegist
    },
    // Halaman dashboard user, membutuhkan otentikasi
    {
      path: "/dashboarduser",
      name: "dashboarduser",
      component: HomeLoginUser,
      meta: { requiresAuth: true }, // Menandakan rute ini memerlukan otentikasi
    },
    // Halaman dashboard admin dengan children (sub-routes)
    {
      path: "/dashboardadmin",
      name: "dashboardadmin",
      component: DashboardAdmin,
      meta: { requiresAuth: true }, // Menandakan rute ini memerlukan otentikasi
      children: [
        {
          path: "listusers",
          component: ListUsers, // Mengarahkan ke komponen ListUsers untuk melihat daftar pengguna
        },
        {
          path: "listtasks",
          component: ListTasks, // Mengarahkan ke komponen ListTasks untuk melihat daftar tugas
        },
        {
          path: "diagramtask",
          component: DiagramTask, // Mengarahkan ke komponen analysis namun masih dalam tahap pembanginan
        },
        {
          path: "diagramstatus",
          component: DiagramStatus, // Mengarahkan ke komponen analysis namun masih dalam tahap pembanginan
        },
        {
          path: "otherfeatures",
          component: UnderConstructionVue, // Mengarahkan ke komponen analysis namun masih dalam tahap pembanginan
        },
      ],
    },
    // Halaman not found jika rute tidak cocok
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: notFound404, // Mengarahkan ke komponen notFound404 untuk menampilkan halaman tidak ditemukan
    },
  ],
});

// Global navigation guard untuk pemeriksaan otentikasi
router.beforeEach((to, from, next) => {
  const token = getToken(); // Ambil token dari cookies

  // Jika rute tujuan memerlukan otentikasi dan tidak ada token
  if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
    // Menampilkan SweetAlert untuk peringatan akses
    Swal.fire({
      icon: "warning",
      title: "Akses Ditolak",
      text: "Anda harus login terlebih dahulu untuk mengakses halaman ini.",
      timer: 3500,
      showConfirmButton: false,
    }).then(() => {
      // Setelah SweetAlert ditutup, alihkan ke halaman login
      next({ name: "login" });
    });
  }
  // Jika pengguna sudah login dan mencoba mengakses halaman login atau register
  else if ((to.name === "login" || to.name === "register") && token) {
    // Alihkan pengguna ke dashboard user jika sudah login
    next({ name: "dashboarduser" });
  }
  // Jika tidak ada kondisi khusus, lanjutkan navigasi ke halaman tujuan
  else {
    next();
  }
});

// Ekspor router untuk digunakan dalam aplikasi Vue
export default router;
