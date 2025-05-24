<template>
  <div class="bg-white/5 rounded-xl p-4 md:p-6 shadow-lg border border-purple-600/10">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <!-- Search Input -->
      <div class="md:col-span-2">
        <label class="block text-sm font-medium text-gray-300 mb-2">Search Products</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <input
            type="text"
            :value="search"
            @input="$emit('update:search', $event.target.value)"
            placeholder="Search by name or supplier..."
            class="w-full pl-10 pr-4 py-3 bg-[#081028] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      <!-- Category Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">Category</label>
        <select
          :value="category"
          @change="$emit('update:category', $event.target.value)"
          class="w-full px-4 py-3 bg-[#081028] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">All Categories</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <!-- Status Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">Stock Status</label>
        <select
          :value="status"
          @change="$emit('update:status', $event.target.value)"
          class="w-full px-4 py-3 bg-[#081028] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">All Status</option>
          <option value="in_stock">In Stock</option>
          <option value="low_stock">Low Stock</option>
          <option value="out_of_stock">Out of Stock</option>
        </select>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-between items-center mt-6 pt-4 border-t border-gray-700">
      <div class="text-sm text-gray-400">
        Use filters to find specific products quickly
      </div>
      <button
        @click="$emit('reset')"
        class="px-4 py-2 bg-gradient-to-r from-[#CB3CFF] to-[#7F25FB] hover:from-fuchsia-600 hover:to-[#7F25FB] text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
        <span>Reset Filters</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchFilters',
  props: {
    search: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: ''
    },
    categories: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:search', 'update:category', 'update:status', 'reset']
}
</script>