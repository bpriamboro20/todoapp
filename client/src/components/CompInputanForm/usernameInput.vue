<script setup>
import { ref, watch, defineProps } from "vue";

// Mendefinisikan props untuk menerima modelValue dari komponen induk
const props = defineProps({
  modelValue: String, // Bind nilai username dari induk
});

// Mendefinisikan state untuk input username
const username = ref(props.modelValue); // Inisialisasi nilai username dengan modelValue dari induk
const usernameError = ref(false); // Status error jika username tidak valid

// Watcher untuk memeriksa validasi username
watch(username, (value) => {
  // Pola reguler untuk memvalidasi username (harus ada huruf kecil, huruf besar, dan angka)
  const usernamePattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/;

  // Validasi untuk memastikan username memenuhi pola yang ditentukan dan panjangnya minimal 8 karakter
  if (value.length === 0 || (usernamePattern.test(value) && value.length >= 8)) {
    usernameError.value = false; // Tidak ada error jika username valid
  } else {
    usernameError.value = true; // Menampilkan error jika username tidak valid
  }
});

// Watcher untuk sinkronisasi dengan modelValue dari induk
watch(
  () => props.modelValue, // Menonton perubahan pada modelValue dari induk
  (newValue) => {
    username.value = newValue; // Menyinkronkan nilai dari induk ke username
  }
);
</script>

<template>
  <div>
    <!-- Label untuk input username -->
    <label
      class="block text-black font-bold mb-2"
      for="username"
    >
      Username
      <span class="text-red-600 inline-block p-1 text-sm">*</span>
    </label>
    <!-- Input username yang terikat dengan v-model -->
    <input
      class="w-full px-4 py-2 rounded-lg border border-gray-500 mb-2"
      id="username"
      name="username"
      type="text"
      v-model="username"
      required
      @input="$emit('update:modelValue', username)"
    />
    <!-- Pesan error jika username tidak valid -->
    <label
      for="username"
      class="username text-sm text-red-600 font-bold"
      v-if="usernameError"
    >
      Username must include uppercase letters, lowercase letters, numbers, and be at least 8 characters.
    </label>
  </div>
</template>
