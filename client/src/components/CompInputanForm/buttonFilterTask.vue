<script setup>
const buttons = [
  { label: "Show all", action: showAll },
  { label: "Done only", action: showDoneOnly },
  { label: "Undone only", action: showUndoneOnly },
];

function showAll() {
  console.log("Show all tasks");
}

function showDoneOnly() {
  console.log("Show only done tasks");
}

function showUndoneOnly() {
  console.log("Show only undone tasks");
}
</script>

<template>
  <div class="mt-5 flex justify-between w-full gap-2">
    <button
      v-for="(button, index) in buttons"
      :key="index"
      @click="button.action"
      class="flex-1 bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 py-2 px-5 text-white font-bold rounded-md"
    >
      {{ button.label }}
    </button>
  </div>
</template>
