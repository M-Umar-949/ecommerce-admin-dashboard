<!-- Revenue.vue -->
<template>
  <div class="w-full space-y-6">
    <!-- KPI Cards Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Orders KPI Card -->
      <div class="bg-gradient-to-br from-purple-900/60 to-purple-700/60 rounded-xl p-6 shadow-lg border border-purple-600/20">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-purple-100/70 text-sm font-medium mb-1">Total Orders</p>
            <h3 class="text-3xl font-bold text-white">3,721</h3>
            <p class="text-green-400 text-sm font-medium mt-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              7.2% vs last month
            </p>
          </div>
          <div class="bg-purple-500/30 p-3 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Total Revenue KPI Card -->
      <div class="bg-gradient-to-br from-blue-900/60 to-blue-700/60 rounded-xl p-6 shadow-lg border border-blue-600/20">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-blue-100/70 text-sm font-medium mb-1">Total Revenue</p>
            <h3 class="text-3xl font-bold text-white">$256,489</h3>
            <p class="text-green-400 text-sm font-medium mt-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              12.3% vs last month
            </p>
          </div>
          <div class="bg-blue-500/30 p-3 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Average Order Value KPI Card -->
      <div class="bg-gradient-to-br from-green-900/60 to-green-700/60 rounded-xl p-6 shadow-lg border border-green-600/20">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-green-100/70 text-sm font-medium mb-1">Avg Order Value</p>
            <h3 class="text-3xl font-bold text-white">$68.95</h3>
            <p class="text-green-400 text-sm font-medium mt-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              4.8% vs last month
            </p>
          </div>
          <div class="bg-green-500/30 p-3 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Customer Conversion Rate KPI Card -->
      <div class="bg-gradient-to-br from-amber-900/60 to-amber-700/60 rounded-xl p-6 shadow-lg border border-amber-600/20">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-amber-100/70 text-sm font-medium mb-1">Conversion Rate</p>
            <h3 class="text-3xl font-bold text-white">24.8%</h3>
            <p class="text-red-400 text-sm font-medium mt-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              2.1% vs last month
            </p>
          </div>
          <div class="bg-amber-500/30 p-3 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-amber-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Visualization Card -->
    <div class="bg-white/5 rounded-xl p-6 shadow-lg border border-purple-600/10 min-h-[570px]">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold text-white">Revenue Analytics</h2>
        
        <!-- Filter Controls -->
        <div class="flex space-x-2">
          <select class="bg-[#081028] border border-purple-600/20 text-white rounded-lg px-3 py-2 text-sm">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Home Goods</option>
            <option>Accessories</option>
          </select>
          
          <select class="bg-[#081028] border border-purple-600/20 text-white rounded-lg px-3 py-2 text-sm">
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Annually</option>
          </select>
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Chart Area -->
        <div class="lg:col-span-2 bg-[#0a1535] rounded-lg p-4 h-[470px] flex items-center justify-center">
          <p class="text-white/50 text-center">Revenue Trend Chart<br>(Visualization will be implemented here)</p>
        </div>
        
        <!-- Secondary Charts -->
        <div class="space-y-4">
          <div class="bg-[#0a1535] rounded-lg p-4 h-[226px] flex items-center justify-center">
            <p class="text-white/50 text-center">Product Categories<br>(Pie chart will be here)</p>
          </div>
          <div class="bg-[#0a1535] rounded-lg p-4 h-[226px] flex items-center justify-center">
            <p class="text-white/50 text-center">Sales by Platform<br>(Bar chart will be here)</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RevenueAnalysis',
  data() {
    return {
      // Data will be added when implementing actual functionality
    }
  }
}
</script>

