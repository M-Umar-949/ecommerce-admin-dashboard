<!-- SideBar.vue -->
<template>
  <div :class="['fixed left-0 top-0 bottom-0 bg-[#081028] text-white transition-all duration-300 ease-in-out flex flex-col z-10', 
              isCollapsed ? 'w-[60px]' : 'w-full md:w-[20%]']" 
       style="box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);">
    <!-- Mobile header with menu toggle for small screens -->
    <div class="md:hidden flex justify-between items-center p-4 bg-[#0a1535]">
      <h1 v-if="!isCollapsed" class="font-semibold text-xl m-0 whitespace-nowrap" style="font-family: 'Montserrat', sans-serif;">
        Forsit <span style="color: #CB3CFF; text-shadow: 0 0 8px #CB3CFF;">X</span>
      </h1>
      <button @click="toggleSidebar" class="bg-transparent border-none text-white cursor-pointer p-2 rounded-md transition-colors duration-200 hover:bg-white/10">
        <svg v-if="isCollapsed" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Desktop header -->
    <div class="hidden md:flex justify-between items-center p-6">
      <h1 v-if="!isCollapsed" class="font-semibold text-2xl m-0 whitespace-nowrap" style="font-family: 'Montserrat', sans-serif;">
        Forsit <span style="color: #CB3CFF; text-shadow: 0 0 8px #CB3CFF;">X</span>
      </h1>
      <button @click="toggleSidebar" class="bg-transparent border-none text-white cursor-pointer p-2 rounded-md transition-colors duration-200 hover:bg-white/10">
        <svg v-if="isCollapsed" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
      </button>
    </div>
    
    <!-- Divider -->
    <div class="h-px bg-white/20 mx-4"></div>
    
    <!-- Navigation Menu -->
    <nav class="py-4 md:py-6 flex-grow">
      <ul class="list-none p-0 m-0">
        <li v-for="(item, index) in menuItems" :key="index" :class="{ 'active': activeTab === index }">
          <a href="#" @click.prevent="setActiveTab(index)" :class="['flex items-center px-4 md:px-6 py-3 text-white/70 no-underline transition-all duration-200 hover:bg-white/10 hover:text-white', activeTab === index ? 'bg-blue-500/20 text-white border-l-[3px] border-l-[#CB3CFF]' : '']">
            <span class="flex items-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="index === 0" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                <path v-else-if="index === 1" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
            </span>
            <span v-if="!isCollapsed" class="whitespace-nowrap font-medium" style="font-family: 'Montserrat', sans-serif;">
              {{ item }}
            </span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isCollapsed: this.collapsed,
      activeTab: 0,
      menuItems: [
        'Revenue Analysis',
        'Inventory Management',
        'Product Registration'
      ]
    }
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
      this.$emit('toggle', this.isCollapsed);
    },
    setActiveTab(index) {
      this.activeTab = index;
      this.$emit('tab-change', index);
    }
  }
}
</script>