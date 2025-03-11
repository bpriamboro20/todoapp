<script setup>
import { ref, watch, defineProps } from "vue";

// Mendefinisikan props untuk menerima modelValue dan password dari komponen parent
const props = defineProps({
  modelValue: String,
  password: String,
});

// State lokal untuk menampung konfirmasi password dan kontrol visibilitasnya
const confirmPassword = ref(props.modelValue);
const showConfirmPassword = ref(false);
const confirmPasswordError = ref(false);

// Watcher untuk validasi apakah konfirmasi password sesuai dengan password asli
watch(confirmPassword, (value) => {
  confirmPasswordError.value = value !== props.password && value.length > 0;
});

// Sinkronisasi konfirmasi password dengan modelValue dari induk
watch(
  () => props.modelValue,
  (newValue) => {
    confirmPassword.value = newValue;
  }
);

// Fungsi untuk toggle visibilitas confirm password
const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};
</script>

<template>
  <div>
    <!-- Label untuk konfirmasi password -->
    <label
      class="block text-black font-bold mb-2"
      for="confirmPassword"
    >
      Confirm Password <span class="text-red-600 inline-block p-1 text-sm">*</span>
    </label>
    <div class="relative">
      <!-- Input untuk konfirmasi password, tipe input bergantung pada showConfirmPassword -->
      <input
        class="w-full px-4 py-2 rounded-lg border border-gray-500 mb-2"
        :type="showConfirmPassword ? 'text' : 'password'"
        id="confirmPassword"
        name="confirmPassword"
        v-model="confirmPassword"
        required
        @input="$emit('update:modelValue', confirmPassword)"
      />
      <!-- Tombol untuk menampilkan atau menyembunyikan password -->
      <button
        type="button"
        @click="toggleConfirmPasswordVisibility"
        class="absolute right-3 top-1/2 transform pb-2 -translate-y-1/2 text-gray-600"
      >
        <span v-if="showConfirmPassword">🚫</span>
        <span v-else>👁️</span>
      </button>
    </div>
    <!-- Pesan error jika password tidak cocok -->
    <label
      for="confirmPassword"
      class="text-sm text-red-600 font-bold"
      v-if="confirmPasswordError"
    >
      Your password does not match!
    </label>
  </div>
</template>
