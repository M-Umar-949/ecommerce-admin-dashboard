<template>
  <div class="min-h-screen p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->


      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-gradient-to-br from-blue-900/60 to-blue-700/60 rounded-xl p-6 shadow-lg border border-blue-600/20">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm">Total Products</p>
              <p class="text-2xl font-bold text-blue-200">{{ products.length }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-red-900/60 to-red-700/60 rounded-xl p-6 shadow-lg border border-red-600/20">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm">Low Stock Items</p>
              <p class="text-2xl font-bold text-red-200">{{ lowStockCount }}</p>
            </div>
            <div class="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-green-900/60 to-green-700/60 rounded-xl p-6 shadow-lg border border-green-600/20">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm">Total Value</p>
              <p class="text-2xl font-bold text-green-400">${{ totalValue.toLocaleString() }}</p>
            </div>
            <div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-yellow-900/60 to-yellow-700/60 rounded-xl p-6 shadow-lg border border-yellow-600/20">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm">Restock Needed</p>
              <p class="text-2xl font-bold text-yellow-400">{{ restockNeededCount }}</p>
            </div>
            <div class="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Search and Filters Component -->
      <SearchFilters 
        v-model:search="searchQuery"
        v-model:category="selectedCategory"
        v-model:status="selectedStatus"
        :categories="categories"
        @reset="resetFilters"
      />

      <!-- Inventory Table Component -->
      <InventoryTable 
        :products="filteredProducts"
        @update-stock="updateStock"
        @restock="requestRestock"
      />
    </div>
  </div>
</template>

<script>
import SearchFilters from './SearchFilters.vue'
import InventoryTable from './InventoryTable.vue'

export default {
  name: 'InventoryManagement',
  components: {
    SearchFilters,
    InventoryTable
  },
  data() {
    return {
      products: [],
      searchQuery: '',
      selectedCategory: '',
      selectedStatus: ''
    }
  },
  computed: {
    categories() {
      return [...new Set(this.products.map(p => p.category))]
    },
    lowStockCount() {
      return this.products.filter(p => p.current_stock <= p.min_stock_level).length
    },
    restockNeededCount() {
      return this.products.filter(p => p.forecast_days_until_restock <= 7).length
    },
    totalValue() {
      return this.products.reduce((sum, p) => sum + (p.price * p.current_stock), 0)
    },
    filteredProducts() {
      return this.products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            product.supplier.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchesCategory = !this.selectedCategory || product.category === this.selectedCategory
        const matchesStatus = !this.selectedStatus || this.getStockStatus(product) === this.selectedStatus
        
        return matchesSearch && matchesCategory && matchesStatus
      })
    }
  },
  methods: {
    async loadInventoryData() {
      try {
        const response = await fetch('/data/inventory.json')
        const data = await response.json()
        this.products = data.products
      } catch (error) {
        console.error('Error loading inventory data:', error)
      }
    },
    getStockStatus(product) {
      if (product.current_stock === 0) return 'out_of_stock'
      if (product.current_stock <= product.min_stock_level) return 'low_stock'
      return 'in_stock'
    },
    updateStock(productId, newStock) {
      const product = this.products.find(p => p.id === productId)
      if (product) {
        product.current_stock = newStock
        product.status = this.getStockStatus(product)
      }
    },
    requestRestock(productId) {
      const product = this.products.find(p => p.id === productId)
      if (product) {
        product.current_stock += product.reorder_quantity
        product.status = this.getStockStatus(product)
        product.last_restock_date = new Date().toISOString().split('T')[0]
      }
    },
    resetFilters() {
      this.searchQuery = ''
      this.selectedCategory = ''
      this.selectedStatus = ''
    }
  },
  mounted() {
    this.loadInventoryData()
  }
}
</script>