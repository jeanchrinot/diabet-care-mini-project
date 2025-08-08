<template>
  <div
    class="p-6 bg-gradient-to-br from-teal-50/50 via-cyan-50/50 to-blue-50/50 min-h-full"
  >
    <!-- Header Section -->
    <div class="mb-8">
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <div class="flex items-center space-x-3 mb-2">
            <button
              @click="goBack"
              class="p-2 text-gray-600 hover:text-[#14b1a1] hover:bg-teal-50 rounded-lg transition-all duration-200"
              title="Geri Dön"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
            </button>
            <h1
              class="text-3xl font-bold bg-gradient-to-r from-[#14b1a1] to-teal-700 bg-clip-text text-transparent"
            >
              Hasta Detayları
            </h1>
          </div>
          <p class="text-gray-600 ml-12">
            {{ patient ? patient.name : "Hasta bilgileri yükleniyor..." }}
          </p>
        </div>
        <div class="flex space-x-3">
          <button
            @click="addMeasurement"
            class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#14b1a1] to-teal-600 text-white rounded-xl hover:from-teal-600 hover:to-[#14b1a1] transition-all duration-300 shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30 transform hover:-translate-y-0.5 font-semibold"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            Yeni Ölçüm Ekle
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#14b1a1] mx-auto"
      ></div>
      <p class="mt-4 text-gray-600">Hasta bilgileri yükleniyor...</p>
    </div>

    <!-- Patient Information -->
    <div v-else-if="patient" class="space-y-8">
      <!-- Sugar Levels Chart -->
      <div
        class="bg-white rounded-2xl shadow-lg shadow-gray-200/50 overflow-hidden"
      >
        <div
          class="bg-gradient-to-r from-[#14b1a1]/10 to-teal-600/10 px-6 py-4 border-b border-gray-200"
        >
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <h2 class="text-xl font-semibold text-gray-800 flex items-center">
              <div
                class="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/25 mr-3"
              >
                <svg
                  class="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  ></path>
                </svg>
              </div>
              Kan Şekeri Seviyesi Takibi
            </h2>

            <!-- Date Range Selector -->
            <div
              class="flex flex-col sm:flex-row items-start sm:items-center gap-3"
            >
              <div
                class="flex items-center space-x-2 bg-white rounded-lg border border-gray-200 px-3 py-2 shadow-sm hover:border-[#14b1a1] transition-colors"
              >
                <input
                  type="date"
                  v-model="dateRange.start"
                  class="text-sm text-gray-600 bg-transparent border-none outline-none cursor-pointer"
                  :max="dateRange.end"
                />
                <span class="text-gray-400">-</span>
                <input
                  type="date"
                  v-model="dateRange.end"
                  class="text-sm text-gray-600 bg-transparent border-none outline-none cursor-pointer"
                  :min="dateRange.start"
                />
                <button
                  class="ml-2 p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <svg
                    class="w-4 h-4 text-[#14b1a1]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Stats Row -->
          <div class="mt-4 pt-4 border-t border-gray-100">
            <div class="flex flex-wrap items-center gap-6">
              <div
                v-if="sugarLevels.length > 0"
                class="flex items-center space-x-4 text-sm"
              >
                <div class="flex items-center">
                  <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span class="text-gray-600"
                    >Son Ölçüm: {{ latestSugarLevel }} mg/dL</span
                  >
                </div>
                <div class="flex items-center">
                  <div class="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span class="text-gray-600"
                    >Ortalama: {{ averageSugarLevel }} mg/dL</span
                  >
                </div>
                <div class="flex items-center">
                  <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span class="text-gray-600"
                    >Seçili Dönem:
                    {{ formatDateRange(dateRange.start, dateRange.end) }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6">
          <div v-if="chartLoading" class="text-center py-12">
            <div
              class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#14b1a1] mx-auto"
            ></div>
            <p class="mt-4 text-gray-600">Kan şekeri verileri yükleniyor...</p>
          </div>
          <div v-else-if="sugarLevels.length === 0" class="text-center py-12">
            <svg
              class="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              ></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">
              Veri bulunamadı
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              Bu hasta için kan şekeri ölçümü bulunmuyor.
            </p>
          </div>
          <div v-else class="relative" style="height: 400px">
            <SugarLevelChart
              :chart-data="chartData"
              :chart-options="chartOptions"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else class="text-center py-12">
      <svg
        class="mx-auto h-12 w-12 text-red-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">Hasta bulunamadı</h3>
      <p class="mt-1 text-sm text-gray-500">
        Hasta bilgileri yüklenemedi. Lütfen tekrar deneyin.
      </p>
    </div>
  </div>
</template>

<script>
import SugarLevelChart from "@/pages/doctor/chart/SugarLevelChart.vue"

export default {
  name: "PatientDetails",
  components: {
    SugarLevelChart,
  },
  data() {
    return {
      loading: true,
      chartLoading: true,
      patient: null,
      sugarLevels: [],
      patientId: this.$route.params.id, // This would come from route params in a real app
      dateRange: {
        start: "2025-08-07",
        end: "2025-08-15",
      },
      selectedQuickFilter: "30d",
      quickFilters: [
        { label: "7G", value: "7d" },
        { label: "30G", value: "30d" },
        { label: "3A", value: "3m" },
        { label: "1Y", value: "1y" },
      ],
    }
  },
  // created() {
  //   this.patientId = this.$route.params.id
  //   console.log("Patient ID:", this.patientId)
  //   // You can now use this.patientId in your fetch logic
  // },
  computed: {
    latestSugarLevel() {
      if (this.sugarLevels.length === 0) return 0
      return this.sugarLevels[0].sugar_value
    },
    averageSugarLevel() {
      if (this.sugarLevels.length === 0) return 0
      const sum = this.sugarLevels.reduce(
        (acc, level) => acc + level.sugar_value,
        0
      )
      return Math.round(sum / this.sugarLevels.length)
    },
    chartData() {
      if (this.sugarLevels.length === 0) return { labels: [], datasets: [] }

      // Sort data chronologically for the chart (oldest first)
      const sortedData = [...this.sugarLevels].reverse()

      const labels = sortedData.map((level) => {
        const date = new Date(level.measured_at)
        return date.toLocaleDateString("tr-TR", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      })

      const data = sortedData.map((level) => level.sugar_value)

      return {
        labels: labels,
        datasets: [
          {
            label: "Kan Şekeri (mg/dL)",
            data: data,
            borderColor: "#14b1a1",
            backgroundColor: "rgba(20, 177, 161, 0.1)",
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "#14b1a1",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8,
          },
        ],
      }
    },
    chartOptions() {
      if (this.sugarLevels.length === 0) return {}

      const data = [...this.sugarLevels]
        .reverse()
        .map((level) => level.sugar_value)

      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleColor: "#ffffff",
            bodyColor: "#ffffff",
            borderColor: "#14b1a1",
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: false,
            callbacks: {
              title: function (context) {
                return "Ölçüm Zamanı: " + context[0].label
              },
              label: function (context) {
                return "Kan Şekeri: " + context.parsed.y + " mg/dL"
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            min: Math.min(...data) - 10,
            max: Math.max(...data) + 10,
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
            },
            ticks: {
              color: "#666666",
              callback: function (value) {
                return value + " mg/dL"
              },
            },
          },
          x: {
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
            },
            ticks: {
              color: "#666666",
              maxRotation: 45,
            },
          },
        },
        elements: {
          point: {
            hoverBorderWidth: 3,
          },
        },
      }
    },
  },
  async mounted() {
    await this.fetchPatient()
    await this.fetchSugarLevels()
  },
  methods: {
    async fetchPatient() {
      try {
        const res = await fetch(`/api/patients/${this.patientId}`)
        if (!res.ok) throw new Error("Hasta bulunamadı")
        this.patient = await res.json()
      } catch (error) {
        console.error("Hasta bilgileri alınamadı:", error)
        alert("❌ Hasta bilgileri alınamadı.")
      } finally {
        this.loading = false
      }
    },
    async fetchSugarLevels() {
      try {
        const res = await fetch(`/api/patients/${this.patientId}/sugar-levels`)
        if (!res.ok) throw new Error("Kan şekeri verileri bulunamadı")
        const data = await res.json()
        // Sort by date (newest first for display, but we'll reverse for chart)
        this.sugarLevels = data.sort(
          (a, b) => new Date(b.measured_at) - new Date(a.measured_at)
        )
      } catch (error) {
        console.error("Kan şekeri verileri alınamadı:", error)
        // Don't show alert for missing sugar levels, just show empty state
      } finally {
        this.chartLoading = false
      }
    },
    calculateAge(birthDate) {
      const today = new Date()
      const birth = new Date(birthDate)
      let age = today.getFullYear() - birth.getFullYear()
      const monthDiff = today.getMonth() - birth.getMonth()

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birth.getDate())
      ) {
        age--
      }

      return age
    },
    formatDate(dateString) {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
      return new Date(dateString).toLocaleDateString("tr-TR", options)
    },
    formatDateRange(startDate, endDate) {
      if (!startDate || !endDate) return ""

      const start = new Date(startDate).toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })

      const end = new Date(endDate).toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })

      return `${start} - ${end}`
    },
    goBack() {
      // In a real app, this would use Vue Router
      console.log("Navigate back to patients list")
      alert("Bu demo sürümde geri dönüş özelliği mevcut değil.")
    },
    addMeasurement() {
      console.log("Add Measurement:", this.patient)
      alert("Bu demo sürümde ölçüm ekleme özelliği mevcut değil.")
    },
  },
}
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #14b1a1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #0f8b7d;
}

/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}

/* Form focus states */
input:focus,
select:focus,
textarea:focus {
  transform: translateY(-1px);
  box-shadow: 0 10px 25px -5px rgba(20, 177, 161, 0.1),
    0 10px 10px -5px rgba(20, 177, 161, 0.04);
}

/* Button hover animations */
button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
