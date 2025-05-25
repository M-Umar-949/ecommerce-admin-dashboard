<template>
  <div class="min-h-screen bg-[#0a1535] text-white">
    <!-- Header -->
    <div class="bg-white/5 rounded-xl p-4 md:p-6 shadow-lg border border-purple-600/10">
      <div class="flex items-center space-x-4">

        <h1 class="text-2xl font-bold">Product Registration</h1>
      </div>
    </div>

    <div class="p-6">
      <!-- Success Message -->
      <SuccessMessage 
        v-if="showSuccess" 
        :message="successMessage"
        @close="showSuccess = false"
      />

      <!-- Registration Form -->
      <div class="max-w-4xl mx-auto">
        <div class="bg-[#0a1535] rounded-lg border border-gray-700 overflow-hidden">
          <div class="p-6 border-b bg-[#0a1535]">
            <h2 class="text-xl font-semibold">Add New Product</h2>
            <p class="text-gray-400 mt-1">Fill in the details below to register a new product</p>
          </div>

          <ProductForm 
            @submit="handleProductSubmission"
            :is-submitting="isSubmitting"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProductForm from './ProductForm.vue'
import SuccessMessage from './SuccessMessage.vue'

// Reactive state
const showSuccess = ref(false)
const successMessage = ref('')
const isSubmitting = ref(false)

// Get next ID (auto-increment from 1020)
const getNextId = () => {
  // In a real app, this would come from your backend/database
  // For now, we'll use localStorage to track the last ID
  const lastId = localStorage.getItem('lastProductId') || '1020'
  const nextId = parseInt(lastId) + 1
  localStorage.setItem('lastProductId', nextId.toString())
  return nextId
}

// Handle form submission
const handleProductSubmission = async (productData) => {
  isSubmitting.value = true
  
  try {
    // Add auto-incremented ID
    const newProduct = {
      id: getNextId(),
      ...productData
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // In a real application, you would make an API call here
    // For demo purposes, we'll just save to localStorage
    const existingProducts = JSON.parse(localStorage.getItem('inventory') || '[]')
    existingProducts.push(newProduct)
    localStorage.setItem('inventory', JSON.stringify(existingProducts))

    // Show success message
    successMessage.value = `Product "${productData.name}" has been successfully registered!`
    showSuccess.value = true

    // Auto-hide success message after 5 seconds
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)

  } catch (error) {
    console.error('Error submitting product:', error)
    // Handle error (show error message)
  } finally {
    isSubmitting.value = false
  }
}

// Navigation
const goBack = () => {
  // Emit event to parent or use router
  // For demo, we'll just log
  console.log('Navigate back to dashboard')
}
</script>

<style scoped>
/* Custom scrollbar for dark theme */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #374151;
}

::-webkit-scrollbar-thumb {
  background: #6B7280;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9CA3AF;
}
</style>