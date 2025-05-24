<template>
  <div class="revenue-trend-chart w-full h-full flex flex-col">
    <div v-if="loading" class="flex-1 flex items-center justify-center">
      <div class="text-white/50">Loading chart data...</div>
    </div>
    <div v-else-if="error" class="flex-1 flex items-center justify-center">
      <div class="text-red-400">{{ error }}</div>
    </div>
    <div v-else class="flex-1 relative">
      <LineChart
        :chart-data="chartData"
        :chart-options="chartOptions"
        :height="400"
        :width="null"
        css-classes="w-full h-full"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: 'RevenueTrendChart',
  components: {
    LineChart
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
      if (!timeSeriesData) return null;

      // Extract labels based on time frame
      const labels = timeSeriesData.map(item => {
        switch (props.selectedTimeFrame) {
          case 'daily':
            return new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          case 'weekly':
            return item.week;
          case 'monthly':
            return item.month;
          case 'annually':
            return item.year;
          default:
            return '';
        }
      });

      // Get data values based on category selection
      let values;
      if (props.selectedCategory === 'All Categories') {
        values = timeSeriesData.map(item => item.total);
      } else {
        values = timeSeriesData.map(item => item.categories[props.selectedCategory] || 0);
      }

      return {
        labels,
        values
      };
    });

    // Prepare chart data for Chart.js
    const chartData = computed(() => {
      if (!processedData.value) return { labels: [], datasets: [] };

      return {
        labels: processedData.value.labels,
        datasets: [
          {
            label: props.selectedCategory === 'All Categories' 
              ? 'Total Revenue' 
              : `${props.selectedCategory} Revenue`,
            data: processedData.value.values,
            fill: true,
            backgroundColor: 'rgba(124, 58, 237, 0.2)',
            borderColor: 'rgba(124, 58, 237, 1)',
            borderWidth: 2,
            tension: 0.4,
            pointBackgroundColor: 'rgba(124, 58, 237, 1)',
            pointBorderColor: '#fff',
            pointBorderWidth: 1,
            pointRadius: 4,
            pointHoverRadius: 6
          }
        ]
      };
    });

    // Chart.js options
    const chartOptions = computed(() => {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.05)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)'
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.05)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: 'rgba(255, 255, 255, 0.7)'
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
                if (context.parsed.y !== null) {
                  label += '$' + context.parsed.y.toLocaleString();
                }
                return label;
              }
            }
          }
        }
      };
    });

    // Watch for changes in filters and re-fetch/process data as needed
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

