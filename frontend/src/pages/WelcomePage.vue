<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 relative overflow-hidden"
  >
    <!-- Background decorative elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-[#14b1a1]/10 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-200/20 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute top-1/4 left-1/4 w-32 h-32 bg-teal-200/15 rounded-full blur-2xl"
      ></div>
    </div>

    <!-- Main content container -->
    <div class="relative z-10 w-full max-w-md mx-auto px-6">
      <!-- Logo/Brand section -->
      <div class="text-center mb-12">
        <div
          class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#14b1a1] to-teal-600 rounded-2xl mb-6 shadow-lg shadow-teal-500/25"
        >
          <svg
            class="w-10 h-10 text-white"
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
        <h1
          class="text-4xl font-bold bg-gradient-to-r from-[#14b1a1] to-teal-700 bg-clip-text text-transparent mb-2"
        >
          AIDCARE
        </h1>
        <p class="text-gray-600 text-lg font-medium">
          AI Destekli Diyabet Yönetimi
        </p>
        <p class="text-gray-500 mt-2">Devam etmek için giriş yapınız</p>
      </div>

      <!-- Login buttons -->
      <div class="space-y-4 mb-8">
        <button
          class="w-full bg-gradient-to-r from-[#14b1a1] to-teal-600 text-white px-8 py-4 rounded-2xl hover:from-teal-600 hover:to-[#14b1a1] transition-all duration-300 shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30 transform hover:-translate-y-0.5 font-semibold text-lg flex items-center justify-center group"
          @click="openModal('doctor')"
        >
          <svg
            class="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-200"
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
          Doktor Girişi
        </button>

        <button
          class="w-full bg-white text-[#14b1a1] border-2 border-[#14b1a1] px-8 py-4 rounded-2xl hover:bg-[#14b1a1] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold text-lg flex items-center justify-center group"
          @click="openModal('patient')"
        >
          <svg
            class="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
          Hasta Girişi
        </button>
      </div>

      <!-- Footer links -->
      <div class="text-center text-sm text-gray-500 space-y-2">
        <div class="flex justify-center space-x-4">
          <a
            href="#"
            class="hover:text-[#14b1a1] transition-colors duration-200"
            >Yardım</a
          >
          <span>•</span>
          <a
            href="#"
            class="hover:text-[#14b1a1] transition-colors duration-200"
            >Gizlilik</a
          >
          <span>•</span>
          <a
            href="#"
            class="hover:text-[#14b1a1] transition-colors duration-200"
            >İletişim</a
          >
        </div>
        <p>© 2024 AIDCARE - Tüm hakları saklıdır</p>
      </div>
    </div>

    <!-- Enhanced Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-secondary/10 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click="closeModal"
    >
      <div class="w-full max-w-md h-[90%] overflow-y-auto bg-secondary/10">
        <div
          class="bg-white rounded-3xl p-8 w-full shadow-2xl transform transition-all duration-300 scale-100"
          @click.stop
        >
          <!-- Modal header -->
          <div class="text-center mb-8">
            <div
              class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#14b1a1] to-teal-600 rounded-2xl mb-4 shadow-lg shadow-teal-500/25"
            >
              <svg
                v-if="role === 'doctor'"
                class="w-8 h-8 text-white"
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
              <svg
                v-else
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">
              {{ role === "doctor" ? "Doktor Girişi" : "Hasta Girişi" }}
            </h2>
            <p class="text-gray-500">Hesabınıza güvenli giriş yapın</p>
          </div>

          <!-- Login form -->
          <form @submit.prevent="login" class="space-y-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Email Adresiniz</label
              >
              <div class="relative">
                <input
                  type="email"
                  v-model="email"
                  class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pl-12 focus:outline-none focus:border-[#14b1a1] focus:ring-4 focus:ring-[#14b1a1]/10 transition-all duration-200"
                  placeholder="ornek@email.com"
                  required
                />
                <svg
                  class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  ></path>
                </svg>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Şifreniz</label
              >
              <div class="relative">
                <input
                  type="password"
                  v-model="password"
                  class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pl-12 focus:outline-none focus:border-[#14b1a1] focus:ring-4 focus:ring-[#14b1a1]/10 transition-all duration-200"
                  placeholder="••••••••"
                  required
                />
                <svg
                  class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  ></path>
                </svg>
              </div>
            </div>

            <div class="flex items-center justify-between text-sm">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="rounded border-gray-300 text-[#14b1a1] focus:ring-[#14b1a1] focus:ring-offset-0"
                />
                <span class="ml-2 text-gray-600">Beni hatırla</span>
              </label>
              <a href="#" class="text-[#14b1a1] hover:underline font-medium"
                >Şifremi unuttum</a
              >
            </div>

            <!-- Action buttons -->
            <div class="flex space-x-3 pt-4">
              <button
                type="button"
                class="flex-1 text-gray-600 hover:text-gray-800 py-3 px-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 font-semibold"
                @click="closeModal"
              >
                İptal
              </button>
              <button
                type="submit"
                class="flex-1 bg-gradient-to-r from-[#14b1a1] to-teal-600 text-white py-3 px-4 rounded-xl hover:from-teal-600 hover:to-[#14b1a1] transition-all duration-200 font-semibold shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30"
              >
                Giriş Yap
              </button>
            </div>
          </form>

          <!-- Modal footer -->
          <div class="mt-6 pt-6 border-t border-gray-100 text-center">
            <p class="text-sm text-gray-600">
              Hesabınız yok mu?
              <a href="#" class="text-[#14b1a1] hover:underline font-semibold"
                >Kayıt olun</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      role: "", // 'doctor' or 'patient'
      email: "",
      password: "",
    }
  },
  methods: {
    openModal(role) {
      this.role = role
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
      this.email = ""
      this.password = ""
      this.role = ""
    },
    login() {
      // Pseudo auth with enhanced feedback
      const roleText = this.role === "doctor" ? "Doktor" : "Hasta"
      alert(
        `✅ ${roleText} olarak başarıyla giriş yapıldı!\nEmail: ${this.email}`
      )
      // Redirect based on role
      if (this.role === "doctor") {
        this.$router.push("/doctor")
      } else if (this.role === "patient") {
        this.$router.push("/patient")
      }
      this.closeModal()
    },
  },
}
</script>

<style scoped>
/* Custom font for healthcare feel */
body {
  font-family: "Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

/* Smooth animations */
* {
  transition: all 0.2s ease-in-out;
}

/* Custom scrollbar for modal if needed */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #14b1a1;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #0f8b7d;
}
</style>
