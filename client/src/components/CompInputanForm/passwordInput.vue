<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";

// Mendefinisikan props untuk menerima modelValue dari komponen induk
const props = defineProps({
  modelValue: String, // Bind nilai password dari induk
});

// Mendefinisikan state untuk input password
const password = ref(props.modelValue);
const showPassword = ref(false); // State untuk mengatur visibilitas password
const passwordError = ref(false); // Status error jika password kurang dari 8 karakter

// Emit password yang diperbarui ke komponen induk ketika input berubah
const emit = defineEmits(["update:modelValue"]);

// Watcher untuk memantau perubahan password dan validasi panjang password
watch(password, (newValue) => {
  passwordError.value = newValue.length < 8; // Menampilkan error jika panjang password < 8
});

// Watcher untuk memantau perubahan pada modelValue agar sinkron dengan induk
watch(
  () => props.modelValue,
  (newValue) => {
    password.value = newValue;
  }
);

// Fungsi untuk toggle visibilitas password
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template>
  <div>
    <!-- Label untuk input password -->
    <label
      class="block text-black font-bold mb-2"
      for="password"
    >
      Password
      <span class="text-red-600 inline-block p-1 text-sm">*</span>
    </label>
    <!-- Input password yang terikat dengan v-model -->
    <div class="relative">
      <input
        class="w-full px-4 py-2 rounded-lg border border-gray-500 mb-2"
        :type="showPassword ? 'text' : 'password'"
        id="password"
        name="password"
        v-model="password"
        @input="$emit('update:modelValue', password)"
        required
      />
      <!-- Tombol untuk toggle visibilitas password -->
      <button
        type="button"
        @click="togglePasswordVisibility"
        class="absolute right-3 top-1/3 pt-2 transform -translate-y-1/2 text-gray-600"
      >
        <span v-if="showPassword">🚫</span>
        <span v-else>👁️</span>
      </button>
    </div>
    <!-- Pesan error jika panjang password kurang dari 8 karakter -->
    <label
      for="password"
      class="text-sm text-red-600 font-bold"
      v-if="passwordError"
    >
      Password must be at least 8 characters long.
    </label>
  </div>
</template>
