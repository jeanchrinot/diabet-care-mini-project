<template>
  <div class="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- Sidebar -->
    <aside
      class="w-72 bg-white border-r border-gray-200 flex flex-col relative overflow-hidden"
    >
      <!-- Background decoration -->
      <div
        class="absolute inset-0 bg-gradient-to-b from-[#14b1a1]/5 to-transparent"
      ></div>
      <div
        class="absolute -top-20 -right-20 w-40 h-40 bg-[#14b1a1]/10 rounded-full blur-3xl"
      ></div>

      <!-- Header -->
      <div class="relative z-10 p-6 border-b border-gray-100">
        <div class="flex items-center mb-4">
          <div
            class="w-12 h-12 bg-gradient-to-br from-[#14b1a1] to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/25 mr-3"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div>
            <h2
              class="text-xl font-bold bg-gradient-to-r from-[#14b1a1] to-teal-700 bg-clip-text text-transparent"
            >
              AIDCARE
            </h2>
            <p class="text-sm text-gray-600 font-medium">Doktor Paneli</p>
          </div>
        </div>

        <!-- Doctor info -->
        <div
          class="bg-gradient-to-r from-[#14b1a1]/10 to-teal-50 rounded-2xl p-4 border border-[#14b1a1]/20"
        >
          <div class="flex items-center">
            <div
              class="w-10 h-10 bg-gradient-to-br from-[#14b1a1] to-teal-600 rounded-full flex items-center justify-center mr-3"
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
            </div>
            <div>
              <p class="font-semibold text-gray-800 text-sm">
                Dr. Mehmet Yılmaz
              </p>
              <p class="text-xs text-gray-600">Uzman Doktor</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="relative z-10 flex-1 p-6 overflow-y-auto">
        <div class="space-y-2">
          <router-link
            to="/doctor/dashboard"
            class="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-[#14b1a1]/10 transition-all duration-200 group font-medium"
            active-class="bg-gradient-to-r from-[#14b1a1] to-teal-600 text-white shadow-lg shadow-teal-500/25"
          >
            <svg
              class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>
            Ana Panel
          </router-link>

          <router-link
            to="/doctor/patients"
            class="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-[#14b1a1]/10 hover:text-[#14b1a1] transition-all duration-200 group font-medium"
            active-class="bg-gradient-to-r from-[#14b1a1] to-teal-600 text-white hover:text-white shadow-lg shadow-teal-500/25"
          >
            <svg
              class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
            Hastalarım
            <span
              class="ml-auto bg-[#14b1a1]/20 text-[#14b1a1] text-xs px-2 py-1 rounded-full font-semibold"
              >24</span
            >
          </router-link>

          <router-link
            to="/doctor/appointments"
            class="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-[#14b1a1]/10 hover:text-[#14b1a1] transition-all duration-200 group font-medium"
            active-class="bg-gradient-to-r from-[#14b1a1] to-teal-600 text-white shadow-lg shadow-teal-500/25"
          >
            <svg
              class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            Randevular
            <span
              class="ml-auto bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full font-semibold"
              >12</span
            >
          </router-link>

          <router-link
            to="/doctor/reports"
            class="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-[#14b1a1]/10 hover:text-[#14b1a1] transition-all duration-200 group font-medium"
            active-class="bg-gradient-to-r from-[#14b1a1] to-teal-600 text-white shadow-lg shadow-teal-500/25"
          >
            <svg
              class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            Raporlar
          </router-link>

          <router-link
            to="/doctor/messages"
            class="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-[#14b1a1]/10 hover:text-[#14b1a1] transition-all duration-200 group font-medium"
            active-class="bg-gradient-to-r from-[#14b1a1] to-teal-600 text-white shadow-lg shadow-teal-500/25"
          >
            <svg
              class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
            Mesajlar
            <span
              class="ml-auto bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-semibold"
              >3</span
            >
          </router-link>
        </div>

        <!-- Divider -->
        <div class="border-t border-gray-200 my-6"></div>

        <!-- Secondary navigation -->
        <div class="space-y-2">
          <router-link
            to="/doctor/settings"
            class="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-[#14b1a1]/10 hover:text-[#14b1a1] transition-all duration-200 group font-medium"
            active-class="bg-gradient-to-r from-[#14b1a1] to-teal-600 text-white shadow-lg shadow-teal-500/25"
          >
            <svg
              class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            Ayarlar
          </router-link>

          <button
            class="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group font-medium w-full"
          >
            <svg
              class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>
            Çıkış Yap
          </button>
        </div>
      </nav>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col bg-gray-50 overflow-hidden">
      <!-- Top Header Bar -->
      <header
        class="bg-white shadow-sm border-b border-gray-200 px-8 py-4 flex items-center justify-between"
      >
        <div class="flex items-center">
          <h1 class="text-2xl font-bold text-gray-800">Ana Panel</h1>
          <div class="ml-4 flex items-center text-sm text-gray-500">
            <svg
              class="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            {{ currentDate }}
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <!-- Notifications -->
          <button
            class="relative p-2 text-gray-600 hover:text-[#14b1a1] hover:bg-[#14b1a1]/10 rounded-xl transition-all duration-200"
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
                d="M15 17h5l-5 5v-5zM10.07 4.93l3.99 3.99c.14.14.23.33.23.53v9.05a.5.5 0 01-.5.5h-5.38a.5.5 0 01-.5-.5V5.5c0-.28.22-.5.5-.5h1.13c.2 0 .39.09.53.23z"
              ></path>
            </svg>
            <span
              class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
              >3</span
            >
          </button>

          <!-- Search -->
          <div class="relative">
            <input
              type="text"
              placeholder="Hasta ara..."
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#14b1a1] focus:border-transparent"
            />
            <svg
              class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>
      </header>

      <!-- Content Area with padding and scroll -->
      <div class="flex-1 p-8 overflow-y-auto">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "DoctorLayout",
  data() {
    return {
      currentDate: this.formatDate(new Date()),
    }
  },
  methods: {
    formatDate(date) {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }
      return date.toLocaleDateString("tr-TR", options)
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
  background: #f1f1f1;
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

/* Active link styles */
.router-link-active {
  background: linear-gradient(135deg, #14b1a1, #0d9488) !important;
  color: white !important;
  box-shadow: 0 10px 25px -5px rgba(20, 177, 161, 0.25) !important;
}

.router-link-active svg {
  color: white;
}

.router-link-active .ml-auto {
  background: rgba(255, 255, 255, 0.2) !important;
  color: white !important;
}

/* Hover effects */
nav a:hover:not(.router-link-active) {
  transform: translateX(4px);
}
</style>
