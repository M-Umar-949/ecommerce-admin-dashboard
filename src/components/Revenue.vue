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
    <div class="bg-white/5 rounded-xl p-4 md:p-6 shadow-lg border border-purple-600/10">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 class="text-xl font-semibold text-white">Revenue Analytics</h2>
        
        <!-- Filter Controls -->
        <div class="flex flex-wrap gap-2 w-full sm:w-auto">
          <select 
            v-model="selectedCategory"
            class="bg-[#081028] border border-purple-600/20 text-white rounded-lg px-3 py-2 text-sm flex-1 sm:flex-none"
          >
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Home Goods</option>
            <option>Accessories</option>
          </select>
          
          <select 
            v-model="selectedTimeFrame"
            class="bg-[#081028] border border-purple-600/20 text-white rounded-lg px-3 py-2 text-sm flex-1 sm:flex-none"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="annually">Annually</option>
          </select>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <!-- Main Chart Area -->
        <div class="md:col-span-2 bg-[#0a1535] rounded-lg p-3 md:p-4 h-[300px] sm:h-[350px] md:h-[400px] lg:h-[470px]">
          <RevenueTrendChart 
            :selected-time-frame="selectedTimeFrame"
            :selected-category="selectedCategory"
          />
        </div>
        
        <!-- Secondary Charts -->
        <div class="space-y-4">
            <div class="bg-[#0a1535] rounded-lg p-3 md:p-4 h-[180px] sm:h-[170px] md:h-[190px] lg:h-[226px] relative">
            <!-- Info Icon -->
            <div class="absolute top-3 right-3 group cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 16v-4m0-4h.01" />
              </svg>
              <div class="opacity-0 group-hover:opacity-100 transition bg-[#1a2240] text-white text-xs rounded px-2 py-1 absolute right-0 mt-1 z-10 whitespace-nowrap shadow-lg">
              Category Distribution
              </div>
            </div>
            <CategoryPieChart 
              :selected-time-frame="selectedTimeFrame"
            />
            </div>
            <div class="bg-[#0a1535] rounded-lg p-3 md:p-4 h-[180px] sm:h-[170px] md:h-[190px] lg:h-[226px] relative">
            <!-- Info Icon -->
            <div class="absolute top-3 right-3 group cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 16v-4m0-4h.01" />
              </svg>
              <div class="opacity-0 group-hover:opacity-100 transition bg-[#1a2240] text-white text-xs rounded px-2 py-1 absolute right-0 mt-1 z-10 whitespace-nowrap shadow-lg">
              Platform Revenue Comparison
              </div>
            </div>
            <PlatformBarChart 
              :selected-time-frame="selectedTimeFrame"
              :selected-category="selectedCategory"
            />
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RevenueTrendChart from './charts/RevenueTrendChart.vue';
import CategoryPieChart from './charts/CategoryPieChart.vue';
import PlatformBarChart from './charts/PlatformBarChart.vue';

export default {
  name: 'RevenueAnalysis',
  components: {
    RevenueTrendChart,
    CategoryPieChart,
    PlatformBarChart
  },
  data() {
    return {
      selectedCategory: 'All Categories',
      selectedTimeFrame: 'daily'
    }
  }
}
</script>

