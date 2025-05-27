<template>
  <form @submit.prevent="submitForm" class="p-8 space-y-8 bg-gradient-to-br from-[#0a1535] to-[#1a2744] relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 bg-gradient-to-br from-purple-800/5 to-purple-800/5 pointer-events-none"></div>
    <div class="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-xl"></div>
    <div class="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-full blur-xl"></div>
    
    <div class="relative z-10">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
          </svg>
        </div>
        <h2 class="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Register New Product
        </h2>
        <p class="text-gray-400">Add inventory items with comprehensive tracking details</p>
      </div>

      <!-- Form Grid -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        <!-- Left Column - Basic Information -->
        <div class="space-y-6">
          <div class="bg-gradient-to-r from-slate-800/50 to-slate-700/30 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-emerald-400">Basic Information</h3>
            </div>
            
            <!-- Product Name -->
            <div class="mb-6">
              <label for="name" class="block text-sm font-medium text-gray-300 mb-3">
                <span class="flex items-center space-x-2">
                  <span>Product Name</span>
                  <span class="text-red-400">*</span>
                </span>
              </label>
              <div class="relative">
                <input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
                  placeholder="Enter product name"
                />
                <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/0 to-emerald-500/0 focus-within:from-emerald-500/10 focus-within:to-teal-500/10 pointer-events-none transition-all duration-200"></div>
              </div>
            </div>
            
            <!-- Category -->
            <div class="mb-6">
              <label for="category" class="block text-sm font-medium text-gray-300 mb-3">
                <span class="flex items-center space-x-2">
                  <span>Category</span>
                  <span class="text-red-400">*</span>
                </span>
              </label>
              <div class="relative">
                <select
                  id="category"
                  v-model="formData.category"
                  required
                  class="w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200 appearance-none cursor-pointer"
                >
                  <option value="" class="bg-slate-800">Select category</option>
                  <option value="Electronics" class="bg-slate-800">📱 Electronics</option>
                  <option value="Clothing" class="bg-slate-800">👕 Clothing</option>
                  <option value="Home Goods" class="bg-slate-800">🏠 Home Goods</option>
                  <option value="Accessories" class="bg-slate-800">💎 Accessories</option>
                </select>
                <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <!-- Price -->
            <div class="mb-6">
              <label for="price" class="block text-sm font-medium text-gray-300 mb-3">
                <span class="flex items-center space-x-2">
                  <span>Price ($)</span>
                  <span class="text-red-400">*</span>
                </span>
              </label>
              <div class="relative">
                <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 font-semibold">$</div>
                <input
                  id="price"
                  v-model.number="formData.price"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  class="w-full pl-8 pr-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
                  placeholder="0.00"
                />
              </div>
            </div>
            
            <!-- Supplier -->
            <div>
              <label for="supplier" class="block text-sm font-medium text-gray-300 mb-3">
                <span class="flex items-center space-x-2">
                  <span>Supplier</span>
                  <span class="text-red-400">*</span>
                </span>
              </label>
              <input
                id="supplier"
                v-model="formData.supplier"
                type="text"
                required
                class="w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
                placeholder="Enter supplier name"
              />
            </div>
          </div>
        </div>
        
        <!-- Right Column - Inventory Information -->
        <div class="space-y-6">
          <div class="bg-gradient-to-r from-slate-800/50 to-slate-700/30 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-blue-400">Inventory Tracking</h3>
            </div>
            
            <!-- Current Stock -->
            <div class="mb-6">
              <label for="current_stock" class="block text-sm font-medium text-gray-300 mb-3">
                <span class="flex items-center space-x-2">
                  <span>Initial Stock Level</span>
                  <span class="text-red-400">*</span>
                </span>
              </label>
              <input
                id="current_stock"
                v-model.number="formData.current_stock"
                type="number"
                min="0"
                required
                class="w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                placeholder="0"
              />
            </div>
            
            <!-- Minimum Stock Level -->
            <div class="mb-6">
              <label for="min_stock_level" class="block text-sm font-medium text-gray-300 mb-3">
                <span class="flex items-center space-x-2">
                  <span>Minimum Stock Level</span>
                  <span class="text-red-400">*</span>
                  <span class="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full">Alert Threshold</span>
                </span>
              </label>
              <input
                id="min_stock_level"
                v-model.number="formData.min_stock_level"
                type="number"
                min="0"
                required
                class="w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-200"
                placeholder="0"
              />
            </div>
            
            <!-- Reorder Quantity -->
            <div class="mb-6">
              <label for="reorder_quantity" class="block text-sm font-medium text-gray-300 mb-3">
                <span class="flex items-center space-x-2">
                  <span>Reorder Quantity</span>
                  <span class="text-red-400">*</span>
                </span>
              </label>
              <input
                id="reorder_quantity"
                v-model.number="formData.reorder_quantity"
                type="number"
                min="0"
                required
                class="w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                placeholder="0"
              />
            </div>
            
            <!-- Sales Velocity -->
            <div>
              <label for="sales_velocity" class="block text-sm font-medium text-gray-300 mb-3">
                <span class="flex items-center space-x-2">
                  <span>Expected Sales Velocity</span>
                  <span class="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full">per day</span>
                </span>
              </label>
              <input
                id="sales_velocity"
                v-model.number="formData.sales_velocity"
                type="number"
                step="0.1"
                min="0"
                class="w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-200"
                placeholder="1.0"
              />
            </div>
          </div>
        </div>
      </div>
      
      <!-- Image Upload Section -->
      <div class="bg-gradient-to-r from-slate-800/50 to-slate-700/30 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6">
        <div class="flex items-center space-x-3 mb-6">
          <div class="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-pink-400">Product Image</h3>
          <span class="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full">Optional</span>
        </div>
        
        <div class="flex items-center justify-center w-full">
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-600 rounded-xl cursor-pointer bg-slate-800/30 hover:bg-slate-700/50 transition-all duration-300 group"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6" v-if="!imagePreview">
              <div class="w-16 h-16 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                <svg class="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
              </div>
              <p class="mb-2 text-sm text-gray-300 group-hover:text-pink-400 transition-colors">
                <span class="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p class="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
            </div>
            
            <!-- Image Preview -->
            <div v-else class="relative w-full h-full group">
              <img
                :src="imagePreview"
                alt="Product preview"
                class="w-full h-full object-contain rounded-xl"
              />
              <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl flex items-center justify-center">
                <button
                  type="button"
                  @click.prevent="removeImage"
                  class="bg-red-500 hover:bg-red-600 text-white rounded-full p-3 transition-all duration-200 transform hover:scale-110"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
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
      
      <!-- Success/Error Messages -->
      <div v-if="successMessage" class="p-4 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/50 rounded-xl backdrop-blur-sm">
        <div class="flex items-center space-x-3">
          <div class="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <p class="text-emerald-300 font-medium">{{ successMessage }}</p>
        </div>
      </div>
      
      <div v-if="errorMessage" class="p-4 bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-500/50 rounded-xl backdrop-blur-sm">
        <div class="flex items-center space-x-3">
          <div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <p class="text-red-300 font-medium">{{ errorMessage }}</p>
        </div>
      </div>
      
      <!-- Form Actions -->
      <div class="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-8">
        <button
          type="button"
          @click="resetForm"
          class="px-8 py-3 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 text-gray-300 rounded-xl transition-all duration-200 font-medium backdrop-blur-sm"
        >
          Reset Form
        </button>
        <button
          type="submit"
          :disabled="isSubmitting"
          class="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 font-medium flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/25"
        >
          <svg v-if="isSubmitting" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <span>{{ isSubmitting ? 'Registering Product...' : 'Register Product' }}</span>
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Props
const props = defineProps({
  apiUrl: {
    type: String,
    default: import.meta.env.VUE_APP_PROD_URL || 'http://localhost:5000'
  }
})

// Emits
const emit = defineEmits(['productAdded'])

// State
const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

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
      errorMessage.value = 'File size must be less than 5MB'
      setTimeout(() => errorMessage.value = '', 5000)
      return
    }
    
    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']
    if (!allowedTypes.includes(file.type)) {
      errorMessage.value = 'Please select a PNG, JPG, or JPEG image'
      setTimeout(() => errorMessage.value = '', 5000)
      return
    }
    
    selectedFile.value = file
    
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
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
const submitForm = async () => {
  if (isSubmitting.value) return
  
  try {
    isSubmitting.value = true
    errorMessage.value = ''
    successMessage.value = ''
    
    // Calculate forecast days
    formData.forecast_days_until_restock = calculateForecastDays()
    
    // Create FormData for multipart/form-data
    const formDataToSend = new FormData()
    
    // Add the product data as JSON string
    formDataToSend.append('productData', JSON.stringify(formData))
    
    // Add the image file if it exists
    if (selectedFile.value) {
      formDataToSend.append('image', selectedFile.value)
    }
    
    // Make API call
    const response = await fetch(`${props.apiUrl}/inventory`, {
      method: 'POST',
      body: formDataToSend
    })
    
    const result = await response.json()
    
    if (response.ok) {
      successMessage.value = 'Product registered successfully!'
      emit('productAdded', result.product)
      resetForm()
    } else {
      errorMessage.value = result.error || 'Failed to register product'
    }
    
  } catch (error) {
    console.error('Error submitting form:', error)
    errorMessage.value = 'Network error. Please check if the server is running.'
  } finally {
    isSubmitting.value = false
    setTimeout(() => {
      successMessage.value = ''
      errorMessage.value = ''
    }, 5000)
  }
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