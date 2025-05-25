<template>
  <div class="fixed top-4 right-4 z-50 max-w-md w-full">
    <div class="bg-green-800 border border-green-700 rounded-lg p-4 shadow-lg">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <div class="ml-3 flex-1">
          <h3 class="text-sm font-medium text-green-200">
            Success!
          </h3>
          <div class="mt-1 text-sm text-green-300">
            {{ message }}
          </div>
        </div>
        <div class="ml-4 flex-shrink-0">
          <button
            @click="$emit('close')"
            class="inline-flex text-green-400 hover:text-green-300 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-800 rounded-md"
          >
            <span class="sr-only">Close</span>
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
defineProps({
  message: {
    type: String,
    required: true
  }
})

// Emits
defineEmits(['close'])
</script>