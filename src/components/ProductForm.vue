<template>
  <form @submit.prevent="submitForm" class="p-6 space-y-6 bg-[#0a1535]">
    <!-- Basic Information -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="space-y-6">
        <h3 class="text-lg font-medium text-white border-b border-gray-600 pb-2">Basic Information</h3>
        
        <!-- Product Name -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-300 mb-2">
            Product Name *
          </label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            required
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter product name"
          />
        </div>

        <!-- Category -->
        <div>
          <label for="category" class="block text-sm font-medium text-gray-300 mb-2">
            Category *
          </label>
          <select
            id="category"
            v-model="formData.category"
            required
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Home Goods">Home Goods</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        <!-- Price -->
        <div>
          <label for="price" class="block text-sm font-medium text-gray-300 mb-2">
            Price ($) *
          </label>
          <input
            id="price"
            v-model.number="formData.price"
            type="number"
            step="0.01"
            min="0"
            required
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="0.00"
          />
        </div>

        <!-- Supplier -->
        <div>
          <label for="supplier" class="block text-sm font-medium text-gray-300 mb-2">
            Supplier *
          </label>
          <input
            id="supplier"
            v-model="formData.supplier"
            type="text"
            required
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter supplier name"
          />
        </div>
      </div>

      <!-- Inventory Information -->
      <div class="space-y-6">
        <h3 class="text-lg font-medium text-white border-b border-gray-600 pb-2">Inventory Details</h3>
        
        <!-- Current Stock -->
        <div>
          <label for="current_stock" class="block text-sm font-medium text-gray-300 mb-2">
            Initial Stock Level *
          </label>
          <input
            id="current_stock"
            v-model.number="formData.current_stock"
            type="number"
            min="0"
            required
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="0"
          />
        </div>

        <!-- Minimum Stock Level -->
        <div>
          <label for="min_stock_level" class="block text-sm font-medium text-gray-300 mb-2">
            Minimum Stock Level *
          </label>
          <input
            id="min_stock_level"
            v-model.number="formData.min_stock_level"
            type="number"
            min="0"
            required
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="0"
          />
        </div>

        <!-- Reorder Quantity -->
        <div>
          <label for="reorder_quantity" class="block text-sm font-medium text-gray-300 mb-2">
            Reorder Quantity *
          </label>
          <input
            id="reorder_quantity"
            v-model.number="formData.reorder_quantity"
            type="number"
            min="0"
            required
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="0"
          />
        </div>

        <!-- Sales Velocity -->
        <div>
          <label for="sales_velocity" class="block text-sm font-medium text-gray-300 mb-2">
            Expected Sales Velocity (per day)
          </label>
          <input
            id="sales_velocity"
            v-model.number="formData.sales_velocity"
            type="number"
            step="0.1"
            min="0"
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="1.0"
          />
        </div>
      </div>
    </div>

    <!-- Image Upload -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-white border-b border-gray-600 pb-2">Product Image</h3>
      
      <div class="flex items-center justify-center w-full">
        <label 
          for="dropzone-file" 
          class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors"
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6" v-if="!imagePreview">
            <svg class="w-8 h-8 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p class="mb-2 text-sm text-gray-400">
              <span class="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p class="text-xs text-gray-400">PNG, JPG or JPEG (MAX. 5MB)</p>
          </div>
          
          <!-- Image Preview -->
          <div v-else class="relative w-full h-full">
            <img 
              :src="imagePreview" 
              alt="Product preview" 
              class="w-full h-full object-contain rounded-lg"
            />
            <button
              type="button"
              @click.prevent="removeImage"
              class="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <input 
            id="dropzone-file" 
            type="file" 
            class="hidden" 
            @change="handleImageUpload"
            accept="image/png,image/jpeg,image/jpg"
          />
        </label>
      </div>
    </div>

    <!-- Form Actions -->
    <div class="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-6 border-t border-gray-700">
      <button
        type="button"
        @click="resetForm"
        class="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Reset Form
      </button>
      <button
        type="submit"
        :disabled="isSubmitting"
        class="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center space-x-2"
      >
        <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>{{ isSubmitting ? 'Registering...' : 'Register Product' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

// Props
const props = defineProps({
  isSubmitting: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['submit'])

// Form data
const formData = reactive({
  name: '',
  category: '',
  price: null,
  current_stock: null,
  min_stock_level: null,
  reorder_quantity: null,
  supplier: '',
  sales_velocity: 1.0,
  image_url: '',
  status: 'in_stock',
  last_restock_date: new Date().toISOString().split('T')[0],
  forecast_days_until_restock: null
})

// Image handling
const imagePreview = ref('')
const selectedFile = ref(null)

// Calculate forecast days until restock
const calculateForecastDays = () => {
  if (formData.current_stock && formData.min_stock_level && formData.sales_velocity) {
    const daysUntilMinStock = (formData.current_stock - formData.min_stock_level) / formData.sales_velocity
    return Math.max(0, Math.ceil(daysUntilMinStock))
  }
  return null
}

// Handle image upload
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']
    if (!allowedTypes.includes(file.type)) {
      alert('Please select a PNG, JPG, or JPEG image')
      return
    }

    selectedFile.value = file
    
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
      formData.image_url = `products/${Date.now()}_${file.name}` // Simulated upload path
    }
    reader.readAsDataURL(file)
  }
}

// Remove image
const removeImage = () => {
  imagePreview.value = ''
  selectedFile.value = null
  formData.image_url = ''
  document.getElementById('dropzone-file').value = ''
}

// Submit form
const submitForm = () => {
  // Calculate forecast days
  formData.forecast_days_until_restock = calculateForecastDays()
  
  // Emit form data to parent
  emit('submit', { ...formData })
}

// Reset form
const resetForm = () => {
  Object.keys(formData).forEach(key => {
    if (key === 'sales_velocity') {
      formData[key] = 1.0
    } else if (key === 'status') {
      formData[key] = 'in_stock'
    } else if (key === 'last_restock_date') {
      formData[key] = new Date().toISOString().split('T')[0]
    } else if (typeof formData[key] === 'number') {
      formData[key] = null
    } else {
      formData[key] = ''
    }
  })
  removeImage()
}
</script>