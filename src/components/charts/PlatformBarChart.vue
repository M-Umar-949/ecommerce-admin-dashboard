<template>
  <div class="platform-bar-chart w-full h-full flex flex-col">
    <div v-if="loading" class="flex-1 flex items-center justify-center">
      <div class="text-white/50">Loading chart data...</div>
    </div>
    <div v-else-if="error" class="flex-1 flex items-center justify-center">
      <div class="text-red-400">{{ error }}</div>
    </div>
    
    <div v-else class="flex-1 relative">
          <!-- Chart title with selected category -->
        <div class="absolute w-full  items-center z-10">
            <p class="text-white text-sm text-center">
            {{ selectedCategory }}
            </p>
        </div>
      <BarChart
        :chart-data="chartData"
        :options="chartOptions"
        :height="200"
        :width="null"
        css-classes="w-full h-full"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: 'PlatformBarChart',
  components: {
    BarChart
  },
  props: {
    selectedTimeFrame: {
      type: String,
      default: 'daily',
      validator: (value) => ['daily', 'weekly', 'monthly', 'annually'].includes(value)
    },
    selectedCategory: {
      type: String,
      default: 'All Categories'
    }
  },
  setup(props) {
    const revenueData = ref(null);
    const loading = ref(true);
    const error = ref(null);

    // Platform colors with consistent branding
    const platformColors = {
      Website: 'rgba(124, 58, 237, 0.8)',      // Purple
      'Mobile App': 'rgba(16, 185, 129, 0.8)', // Green
      Marketplace: 'rgba(245, 158, 11, 0.8)'   // Amber
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

    // Process data based on selected filters
    const processedData = computed(() => {
      if (!revenueData.value) return null;

      const timeSeriesData = revenueData.value.timeSeriesData[props.selectedTimeFrame];
      if (!timeSeriesData || !timeSeriesData.length) return null;

      // Get the most recent data point for the selected time period
      const mostRecentData = timeSeriesData[timeSeriesData.length - 1];
      
      // Get platforms and their values
      const platforms = Object.keys(mostRecentData.platforms);
      
      // If no specific category is selected, use the total platform data
      if (props.selectedCategory === 'All Categories') {
        const values = platforms.map(platform => mostRecentData.platforms[platform]);
        return {
          platforms,
          values
        };
      } 
      
      // If a specific category is selected, we need to estimate platform distribution
      // Note: Our mock data doesn't have platform breakdown by category,
      // so we'll estimate based on the overall distribution
      else {
        const categoryValue = mostRecentData.categories[props.selectedCategory] || 0;
        const totalValue = mostRecentData.total;
        const ratio = categoryValue / totalValue;
        
        // Distribute the category value across platforms proportionally
        const values = platforms.map(platform => {
          const platformPct = mostRecentData.platforms[platform] / totalValue;
          return Math.round(categoryValue * platformPct / ratio);
        });
        
        return {
          platforms,
          values
        };
      }
    });

    // Prepare chart data for Chart.js
    const chartData = computed(() => {
      if (!processedData.value) return { labels: [], datasets: [] };
      
      const colors = processedData.value.platforms.map(platform => 
        platformColors[platform] || 'rgba(156, 163, 175, 0.8)'
      );
      
      return {
        labels: processedData.value.platforms,
        datasets: [
          {
            label: props.selectedCategory === 'All Categories' 
              ? 'All Categories' 
              : props.selectedCategory,
            data: processedData.value.values,
            backgroundColor: colors,
            // borderColor: colors.map(color => color.replace('0.8', '1')),
            borderWidth: 1,
            borderRadius: 4,
            maxBarThickness: 30,
            barPercentage: 0.8,
            categoryPercentage: 0.9
          }
        ]
      };
    });

    // Chart.js options
    const chartOptions = computed(() => {
      return {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',  // Horizontal bar chart
        layout: {
          padding: {
            left: 5,
            right: 10,
            top: 0,
            bottom: 0
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.05)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
              font: {
                size: 9
              },
              maxRotation: 0,
              callback: function(value) {
                if (value >= 1000) {
                  return '$' + (value / 1000) + 'k';
                }
                return '$' + value;
              }
            }
          },
          y: {
            grid: {
              display: false
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
              font: {
                size: 10
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false,
            labels: {
              color: 'rgba(255, 255, 255, 0.7)',
              boxWidth: 18,
              boxHeight: 8,
              font: {
                size: 15
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(10, 21, 53, 0.9)',
            titleColor: 'rgba(255, 255, 255, 0.9)',
            bodyColor: 'rgba(255, 255, 255, 0.7)',
            borderColor: 'rgba(124, 58, 237, 0.5)',
            borderWidth: 1,
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.x !== null) {
                  label += '$' + context.parsed.x.toLocaleString();
                }
                return label;
              }
            }
          }
        }
      };
    });

    // Watch for changes in filters
    watch([() => props.selectedTimeFrame, () => props.selectedCategory], () => {
      // The data processing is handled by computed properties
      // We don't need to re-fetch data when filters change, just recompute
    });

    // Fetch data on component mount
    onMounted(() => {
      fetchData();
    });

    return {
      loading,
      error,
      chartData,
      chartOptions
    };
  }
};
</script>

