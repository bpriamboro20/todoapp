<template>
  <button class="w-full py-1 px-3 bg-gray-300 hover:bg-gray-400 text-black rounded-md flex items-center justify-center gap-2 border-2 border-transparent shadow-lg font-bold text-xs whitespace-nowrap">
    <span class="hidden xl:block">Set as undone</span>
    <svg
      class="h-5 w-5 text-red-600"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path
        stroke="none"
        d="M0 0h24v24H0z"
      />
      <line
        x1="18"
        y1="6"
        x2="6"
        y2="18"
      />
      <line
        x1="6"
        y1="6"
        x2="18"
        y2="18"
      />
    </svg>
  </button>
</template>
