<script setup>
import { ref, watch, defineProps } from "vue";

// Mendefinisikan props untuk menerima modelValue dari komponen induk
const props = defineProps({
  modelValue: String,
});

// State lokal untuk menyimpan nilai email dan status error
const email = ref(props.modelValue);
const emailError = ref(false);

// Daftar domain email yang diperbolehkan
const allowedDomains = [
  "@gmail.com",
  "@gmail.co.id",
  "@yahoo.com",
  "@yahoo.co.id",
  "@ymail.com",
  "@outlook.com",
  "@hotmail.com",
  "@live.com",
  "@icloud.com",
  "@protonmail.com",
  "@zoho.com",
  "@aol.com",
  "@mail.com",
  "@yandex.com",
  "@yandex.ru",
  "@gmx.com",
  "@gmx.de",
];

// Watcher untuk memantau input email dan memvalidasi domain
watch(email, (value) => {
  // Memeriksa apakah email kosong atau memiliki domain yang valid
  if (value.length === 0 || allowedDomains.some((domain) => value.includes(domain))) {
    emailError.value = false; // Tidak ada error
  } else {
    emailError.value = true; // Ada error jika domain tidak valid
  }
});

// Watcher untuk sinkronisasi dengan modelValue dari induk
watch(
  () => props.modelValue,
  (newValue) => {
    email.value = newValue;
  }
);
</script>

<template>
  <div>
    <!-- Label untuk input email -->
    <label
      class="block text-black font-bold mb-2"
      for="email"
    >
      Email
      <span class="text-red-600 inline-block p-1 text-sm">*</span>
    </label>
    <!-- Input email yang terikat dengan v-model -->
    <input
      class="w-full px-4 py-2 rounded-lg border border-gray-500 mb-2"
      id="email"
      name="email"
      type="email"
      v-model="email"
      required
      @input="$emit('update:modelValue', email)"
    />
    <!-- Pesan error jika domain email tidak valid -->
    <label
      for="email"
      class="text-sm text-red-600 font-bold"
      v-if="emailError"
    >
      Email input must be in email format.
    </label>
  </div>
</template>
