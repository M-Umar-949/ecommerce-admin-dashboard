<template>
  <div class="bg-[#081028] border border-purple-600/10 rounded-lg">
    <!-- Table Header -->
    <div class="px-6 py-4 border-b border-gray-700">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-white">Product Inventory</h3>
        <div class="flex items-center space-x-4">
          <span class="text-sm text-gray-400">{{ products.length }} items</span>
          <select 
            v-model="sortBy"
            @change="applySorting"
            class="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="name">Sort by Name</option>
            <option value="stock_asc">Stock (Low to High)</option>
            <option value="stock_desc">Stock (High to Low)</option>
            <option value="price_asc">Price (Low to High)</option>
            <option value="price_desc">Price (High to Low)</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Table Content -->
    <div class="overflow-x-auto overflow-y-visible">
      <table class="w-full min-w-full">
        <thead class="bg-gray-800/50 sticky top-0 z-10">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider whitespace-nowrap">Product</th>
            <th class="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider whitespace-nowrap">Category</th>
            <th class="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider whitespace-nowrap">Price</th>
            <th class="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider whitespace-nowrap">Stock</th>
            <th class="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider whitespace-nowrap">Status</th>
            <th class="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider whitespace-nowrap">Supplier</th>
            <th class="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-700">
          <tr v-for="product in sortedProducts" :key="product.id" class="hover:bg-gray-800/30 transition-colors">
            <!-- Product Info -->
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img
                    v-if="product.image_url"
                    :src="product.image_url"
                    @error="onImageError"
                    :alt="product.name"
                    class="w-10 h-10 rounded object-cover"
                  />
                  <svg v-else class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                  </svg>
                </div>
                <div class="min-w-0">
                  <div class="text-sm font-medium text-white">{{ product.name }}</div>
                  <div class="text-xs text-gray-400">ID: {{ product.id }}</div>
                </div>
              </div>
            </td>

            <!-- Category -->
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100/10 text-purple-300">
                {{ product.category }}
              </span>
            </td>

            <!-- Price -->
            <td class="px-6 py-4 text-sm text-white whitespace-nowrap">
              ${{ product.price.toFixed(2) }}
            </td>

            <!-- Stock with Update Input -->
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center space-x-2">
                <input
                  :id="`stock-${product.id}`"
                  type="number"
                  :value="product.current_stock"
                  @change="updateProductStock(product.id, $event.target.value)"
                  class="w-16 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                  min="0"
                />
                <span class="text-xs text-gray-400">/ {{ product.min_stock_level }} min</span>
              </div>
            </td>

            <!-- Status -->
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center space-x-2">
                <span 
                  :class="getStatusClasses(product)"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                >
                  {{ getStatusText(product) }}
                </span>
                <div v-if="product.forecast_days_until_restock <= 7" class="flex items-center">
                  <svg class="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                  </svg>
                  <span class="text-xs text-yellow-400 ml-1">{{ product.forecast_days_until_restock }}d</span>
                </div>
              </div>
            </td>

            <!-- Supplier -->
            <td class="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
              {{ product.supplier }}
            </td>

            <!-- Actions -->
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center space-x-2">
                <button
                  @click="$emit('restock', product.id)"
                  :disabled="product.current_stock > product.min_stock_level"
                  :class="[
                    'px-3 py-1 rounded-lg text-xs font-medium transition-colors whitespace-nowrap',
                    product.current_stock <= product.min_stock_level
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  ]"
                >
                  Restock (+{{ product.reorder_quantity }})
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div v-if="products.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-300">No products found</h3>
        <p class="mt-1 text-sm text-gray-400">Try adjusting your search or filter criteria.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InventoryTable',
  props: {
    products: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      sortBy: 'name',
      sortedProducts: []
    }
  },
  watch: {
    products: {
      immediate: true,
      handler() {
        this.applySorting()
      }
    }
  },
  methods: {
    onImageError(event) {
      event.target.src = 'products/1748172649761-377825293.png';
    },

    getStatusClasses(product) {
      const stock = product.current_stock
      const minStock = product.min_stock_level
      
      if (stock === 0) {
        return 'bg-red-100/10 text-red-400'
      } else if (stock <= minStock) {
        return 'bg-yellow-100/10 text-yellow-400'
      } else {
        return 'bg-green-100/10 text-green-400'
      }
    },
    getStatusText(product) {
      const stock = product.current_stock
      const minStock = product.min_stock_level
      
      if (stock === 0) {
        return 'Out of Stock'
      } else if (stock <= minStock) {
        return 'Low Stock'
      } else {
        return 'In Stock'
      }
    },
    updateProductStock(productId, newStock) {
      const stockValue = parseInt(newStock) || 0
      this.$emit('update-stock', productId, stockValue)
    },
    applySorting() {
      const sorted = [...this.products]
      
      switch (this.sortBy) {
        case 'name':
          sorted.sort((a, b) => a.name.localeCompare(b.name))
          break
        case 'stock_asc':
          sorted.sort((a, b) => a.current_stock - b.current_stock)
          break
        case 'stock_desc':
          sorted.sort((a, b) => b.current_stock - a.current_stock)
          break
        case 'price_asc':
          sorted.sort((a, b) => a.price - b.price)
          break
        case 'price_desc':
          sorted.sort((a, b) => b.price - a.price)
          break
      }
      
      this.sortedProducts = sorted
    }
  },
  emits: ['update-stock', 'restock']
}
</script>