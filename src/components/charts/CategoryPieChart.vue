<template>
  <div class="category-pie-chart w-full h-full flex flex-col">
    <div v-if="loading" class="flex-1 flex items-center justify-center">
      <div class="text-white/50">Loading chart data...</div>
    </div>
    <div v-else-if="error" class="flex-1 flex items-center justify-center">
      <div class="text-red-400">{{ error }}</div>
    </div>
    <div v-else class="flex-1 relative overflow-hidden">
      <div class="w-full h-full flex items-center justify-center">
        <div class="relative" style="width: 100%; height: 100%; max-width: 500px; max-height: 500px;">
          <DoughnutChart
            :chart-data="chartData"
            :options="chartOptions"
            :height="null"
            :width="null"
            css-classes="w-full h-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: 'CategoryPieChart',
  components: {
    DoughnutChart
  },
  props: {
    selectedTimeFrame: {
      type: String,
      default: 'daily',
      validator: (value) => ['daily', 'weekly', 'monthly', 'annually'].includes(value)
    }
  },
  setup(props) {
    const revenueData = ref(null);
    const loading = ref(true);
    const error = ref(null);

    // Category colors with consistent branding
    const categoryColors = {
      Electronics: 'rgba(124, 58, 237, 0.8)',     // Purple
      Clothing: 'rgba(59, 130, 246, 0.8)',        // Blue
      'Home Goods': 'rgba(16, 185, 129, 0.8)',    // Green
      Accessories: 'rgba(245, 158, 11, 0.8)'      // Amber
    };

    // Function to fetch data from our mock data file
    const fetchData = async () => {
      try {
        loading.value = true;
        error.value = null;
        
        const response = await fetch('/data/revenue.json');
        if (!response.ok) {
          throw new Error('Failed to load revenue data');
        }
        
        const data = await response.json();
        revenueData.value = data;
        loading.value = false;
      } catch (err) {
        console.error('Error loading revenue data:', err);
        error.value = 'Failed to load revenue data. Please try again.';
        loading.value = false;
      }
    };

    // Process data based on selected time frame
    const processedData = computed(() => {
      if (!revenueData.value) return null;

      // We need to calculate total revenue by category for the selected time period
      const timeSeriesData = revenueData.value.timeSeriesData[props.selectedTimeFrame];
      if (!timeSeriesData || !timeSeriesData.length) return null;

      // If we're looking at the most recent period, use that data
      const mostRecentData = timeSeriesData[timeSeriesData.length - 1];
      
      // Extract category data
      const categories = Object.keys(mostRecentData.categories);
      const values = categories.map(category => mostRecentData.categories[category]);
      
      return {
        categories,
        values
      };
    });

    // Prepare chart data for Chart.js
    const chartData = computed(() => {
      if (!processedData.value) return { labels: [], datasets: [] };

      const colors = processedData.value.categories.map(category => categoryColors[category] || 'rgba(156, 163, 175, 0.8)');
      
      return {
        labels: processedData.value.categories,
        datasets: [
          {
            data: processedData.value.values,
            backgroundColor: colors,
            borderColor: colors.map(color => color.replace('0.8', '1')),
            borderWidth: 1,
            hoverOffset: 4
          }
        ]
      };
    });

    // Chart.js options
    const chartOptions = computed(() => {
      return {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',

        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            align: 'left',
            labels: {
              boxWidth: 10,
              boxHeight: 14,
              color: 'rgba(255, 255, 255, 0.8)',
              padding: 6,
              usePointStyle: true,
              pointStyle: 'circle',
              font: {
                size: 10
              },
              generateLabels: function(chart) {
                const data = chart.data;
                if (data.labels.length && data.datasets.length) {
                  const dataset = data.datasets[0];
                  
                  return data.labels.map((label, i) => {
                    
                    return {
                      text: `${label}`,
                      fillStyle: dataset.backgroundColor[i],
                      strokeStyle: dataset.borderColor[i],
                      lineWidth: 1,
                      hidden: false,
                      index: i
                    };
                  });
                }
                return [];
              }
            },
            maxHeight: 40
          },
          tooltip: {
            backgroundColor: 'rgba(10, 21, 53, 0.9)',
            titleColor: 'rgba(255, 255, 255, 0.9)',
            bodyColor: 'rgba(255, 255, 255, 0.7)',
            borderColor: 'rgba(124, 58, 237, 0.5)',
            borderWidth: 1,
            callbacks: {
              label: function(context) {
                const value = context.raw;
                const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                return `${context.label}: $${value.toLocaleString()} (${percentage}%)`;
              }
            }
          }
        }
      };
    });

    // Add a key to force re-render when options change
    const chartKey = ref(0);

    // Force chart re-render when legend settings change
    const forceChartUpdate = () => {
      chartKey.value++;
    };

    // Watch for changes in time frame and update data
    watch(() => props.selectedTimeFrame, () => {
      // The data processing is handled by computed properties
      // We don't need to re-fetch data when filters change, just recompute
      forceChartUpdate();
    });

    // Fetch data on component mount
    onMounted(() => {
      fetchData();
    });

    return {
      loading,
      error,
      chartData,
      chartOptions,
      chartKey
    };
  }
};
</script>