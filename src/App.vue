<!-- App.vue -->
<template>
  <div class="min-h-screen bg-[#081028] " style="font-family: 'Mona Sans', sans-serif;">
    <SideBar @toggle="handleSidebarToggle" @tab-change="handleTabChange" :collapsed="sidebarCollapsed" />
    <div :class="['transition-all duration-300 ease-in-out p-4 md:p-6 lg:p-8 min-h-screen', sidebarCollapsed ? 'ml-[60px]' : 'ml-[60px] md:ml-[20%]']">
      <!-- Main content area -->
      <h1 class="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 text-white">Welcome back, Admin!</h1>

      <!-- Conditional rendering of components based on active tab -->
      <RevenueAnalysis v-if="activeTab === 0" />
      <InventoryManagement v-else-if="activeTab === 1" />

      <div v-else-if="activeTab === 2" class="bg-white/5 rounded-lg p-4 md:p-8 text-white">
        <h2 class="text-2xl font-semibold mb-4">{{ currentTabContent }}</h2>
        <p class="text-white/80">Product Registration content will go here</p>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from './components/SideBar.vue'
import RevenueAnalysis from './components/Revenue.vue'
import InventoryManagement from './components/Inventory.vue'

export default {
  name: 'App',
  components: {
    SideBar,
    RevenueAnalysis,
    InventoryManagement
  },
  data() {
    return {
      sidebarCollapsed: false,
      activeTab: 0,
      tabContents: [
        'Revenue Analysis Dashboard',
        'Inventory Management System',
        'Product Registration Portal'
      ]
    }
  },
  computed: {
    currentTabContent() {
      return this.tabContents[this.activeTab];
    }
  },
  methods: {
    handleSidebarToggle(collapsed) {
      this.sidebarCollapsed = collapsed;
    },
    handleTabChange(index) {
      this.activeTab = index;
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Mona+Sans:ital,wght@0,200..900;1,200..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

body {
  margin: 0;
  font-family: "Mona Sans", sans-serif;
  overflow-y: auto;
}

/* Media query for mobile devices */
@media (max-width: 768px) {
  .sidebar-container:not(.collapsed) {
    width: 100%;
    z-index: 50;
  }
}
</style>