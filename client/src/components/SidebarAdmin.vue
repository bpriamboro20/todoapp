<script setup>
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { ref } from "vue";
import Swal from "sweetalert2";

const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
  Swal.fire({
    title: "Logged Out",
    text: "Anda berhasil logout",
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
  }).then(() => {
    window.location.href = "/login";
  });
};

const isSidebarOpen = ref(true);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<template>
  <!-- Tombol untuk membuka/tutup sidebar -->
  <button
    @click="toggleSidebar"
    class="fixed top-3 right-4 z-50 bg-cyan-600 text-white p-2 rounded-full"
  >
    <span v-if="isSidebarOpen">✖</span>
    <span v-else>☰</span>
  </button>

  <!-- Sidebar utama untuk Admin -->
  <transition
    name="sidebar-transition"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <div
      v-show="isSidebarOpen"
      class="sticky top-0 left-0 min-h-screen flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 md:w-[18rem] w-[16rem] p-5 shadow-xl shadow-blue-gray-900/5"
    >
      <!-- <div class="mb-2 p-4">
        <h5 class="block antialiased tracking-normal ms-4 text-xl md:text-2xl font-bold leading-snug text-cyan-700">Dashboard Admin</h5>
      </div> -->
      <nav class="flex flex-col gap-1 min-w-[200px] sm:min-w-[240px] p-2 font-sans text-base font-normal text-gray-700 overflow-y-auto">
        <!-- Link untuk menuju List Users -->
        <router-link
          to="/dashboardadmin/listusers"
          active-class="active"
          class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-cyan-600 hover:text-white font-semibold outline-none"
        >
          <div class="grid place-items-center mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          List Users
        </router-link>

        <!-- Link untuk menuju List Tasks -->
        <router-link
          to="/dashboardadmin/listtasks"
          active-class="active"
          class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-cyan-600 hover:text-white font-semibold outline-none"
        >
          <div class="grid place-items-center mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M4.75 3.75a.75.75 0 01.75-.75h14a.75.75 0 01.75.75v16.5a.75.75 0 01-.75.75H5.5a.75.75 0 01-.75-.75V3.75zM12 4.5v14.25a.75.75 0 00.75.75h6.5a.75.75 0 00.75-.75V4.5h-7.25a.75.75 0 00-.75.75zM5.5 4.5v14.25a.75.75 0 00.75.75h6.5a.75.75 0 00.75-.75V4.5H5.5zM7 7.75h10v1.5H7v-1.5zm0 3h10v1.5H7v-1.5zm0 3h10v1.5H7v-1.5z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          List Tasks
        </router-link>

        <!-- Link untuk menuju Diagram Task -->
        <router-link
          to="/dashboardadmin/diagramtask"
          active-class="active"
          class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-cyan-600 hover:text-white font-semibold outline-none"
        >
          <div class="grid place-items-center mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M0 5.783v-2.783l4 4 5-6 9 7.878 6-3.922v2.437l-6.176 3.989-8.6-7.528-5.09 6.108-4.134-4.179zm18.909 7.279l-1.267.818-1.135-.994-7.058-6.177-3.778 4.534-1.41 1.692-1.548-1.566-2.713-2.743v14.374h24v-13.226l-5.091 3.288z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          Diagram Task
        </router-link>

        <!-- Link untuk menuju Diagram Status -->
        <router-link
          to="/dashboardadmin/diagramstatus"
          active-class="active"
          class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-cyan-600 hover:text-white font-semibold outline-none"
        >
          <div class="grid place-items-center mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M13 12.414v-12.364c6.158.51 11 5.66 11 11.95 0 6.627-5.373 12-12 12-2.953 0-5.654-1.072-7.744-2.842l8.744-8.744zm-2-12.364c-6.158.51-11 5.66-11 11.95 0 2.954 1.072 5.654 2.842 7.745l1.42-1.42c-1.412-1.725-2.262-3.928-2.262-6.325 0-5.177 3.953-9.446 9-9.949v-2.001z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          Diagram Status
        </router-link>

        <!-- Link untuk menuju Report -->
        <router-link
          to="/dashboardadmin/otherfeatures"
          active-class="active"
          class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-cyan-600 hover:text-white font-semibold outline-none"
        >
          <div class="grid place-items-center mr-4">
            <svg
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.5 23l-8.5-4.535v-3.953l5.4 3.122 3.1-3.406v8.772zm1-.001v-8.806l3.162 3.343 5.338-2.958v3.887l-8.5 4.534zm-10.339-10.125l-2.161-1.244 3-3.302-3-2.823 8.718-4.505 3.215 2.385 3.325-2.385 8.742 4.561-2.995 2.771 2.995 3.443-2.242 1.241v-.001l-5.903 3.27-3.348-3.541 7.416-3.962-7.922-4.372-7.923 4.372 7.422 3.937v.024l-3.297 3.622-5.203-3.008-.16-.092-.679-.393v.002z"
              />
            </svg>
          </div>
          Other Features
        </router-link>

        <!-- Link untuk logout -->
        <router-link
          @click="logout"
          to="/login"
          class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-cyan-600 hover:text-white font-semibold outline-none"
        >
          <div class="grid place-items-center mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              class="h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          Logout
        </router-link>
      </nav>
    </div>
  </transition>
</template>

<style scoped>
.active {
  background-color: #0891b2;
  color: white;
}
</style>
