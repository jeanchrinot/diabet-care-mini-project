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
          <h1
            class="text-3xl font-bold bg-gradient-to-r from-[#14b1a1] to-teal-700 bg-clip-text text-transparent"
          >
            Hasta Yönetimi
          </h1>
          <p class="text-gray-600 mt-1">
            Hasta kayıtlarını görüntüleyin ve yönetin
          </p>
        </div>
        <button
          @click="openModal('add')"
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
          Yeni Hasta Ekle
        </button>
      </div>
    </div>

    <!-- Search and Filter Section -->
    <div class="mb-6 bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1 relative">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Hasta adı veya email ile ara..."
            class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pl-12 focus:outline-none focus:border-[#14b1a1] focus:ring-4 focus:ring-[#14b1a1]/10 transition-all duration-200"
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <select
          v-model="genderFilter"
          class="border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#14b1a1] focus:ring-4 focus:ring-[#14b1a1]/10 transition-all duration-200"
        >
          <option value="">Tüm Cinsiyetler</option>
          <option value="Male">Erkek</option>
          <option value="Female">Kadın</option>
        </select>
      </div>
    </div>

    <!-- Patients List -->
    <div
      class="bg-white rounded-2xl shadow-lg shadow-gray-200/50 overflow-hidden"
    >
      <!-- Table Header -->
      <div
        class="bg-gradient-to-r from-[#14b1a1]/10 to-teal-600/10 px-6 py-4 border-b border-gray-200"
      >
        <div class="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
          <div class="md:col-span-2 font-semibold text-gray-700">
            Hasta Bilgileri
          </div>
          <div class="font-semibold text-gray-700 text-center">Yaş</div>
          <div class="font-semibold text-gray-700 text-center">Cinsiyet</div>
          <div class="font-semibold text-gray-700 text-center">
            Kayıt Tarihi
          </div>
          <div class="font-semibold text-gray-700 text-center">İşlemler</div>
        </div>
      </div>

      <!-- Table Body -->
      <div class="divide-y divide-gray-100">
        <div
          v-for="patient in filteredPatients"
          :key="patient.id"
          class="px-6 py-4 hover:bg-gradient-to-r hover:from-teal-50/50 hover:to-cyan-50/50 transition-all duration-200"
        >
          <div class="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
            <!-- Patient Info -->
            <div class="md:col-span-2 flex items-center space-x-3">
              <div
                class="w-12 h-12 bg-gradient-to-br from-[#14b1a1] to-teal-600 rounded-full flex items-center justify-center shadow-lg shadow-teal-500/25"
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-800">{{ patient.name }}</h3>
                <p class="text-sm text-gray-500">{{ patient.email }}</p>
              </div>
            </div>

            <!-- Age -->
            <div class="text-center">
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {{ calculateAge(patient.birth_date) }} yaş
              </span>
            </div>

            <!-- Gender -->
            <div class="text-center">
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                :class="
                  patient.gender === 'Female'
                    ? 'bg-orange-100 text-orange-800'
                    : 'bg-cyan-100 text-cyan-800'
                "
              >
                {{ patient.gender === "Female" ? "Kadın" : "Erkek" }}
              </span>
            </div>

            <!-- Registration Date -->
            <div class="text-center text-sm text-gray-600">
              {{ formatDate(patient.created_at) }}
            </div>

            <!-- Actions -->
            <div class="flex justify-center space-x-2">
              <router-link
                :to="`/doctor/patients/${patient.id}`"
                class="p-2 text-orange-600 hover:text-orange-800 hover:bg-orange-50 rounded-lg transition-all duration-200"
                title="Ölçümler"
              >
                <svg
                  class="w-5 h-5"
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
              </router-link>

              <button
                @click="viewPatient(patient)"
                class="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                title="Görüntüle"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
              </button>
              <button
                @click="editPatient(patient)"
                class="p-2 text-[#14b1a1] hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-all duration-200"
                title="Düzenle"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  ></path>
                </svg>
              </button>
              <button
                @click="confirmDelete(patient)"
                class="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200"
                title="Sil"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredPatients.length === 0" class="text-center py-12">
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
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          ></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Hasta bulunamadı</h3>
        <p class="mt-1 text-sm text-gray-500">
          Arama kriterlerinizi değiştirip tekrar deneyin.
        </p>
      </div>
    </div>

    <!-- Patient Form Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click="closeModal"
    >
      <div class="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div
          class="bg-white rounded-3xl p-8 shadow-2xl transform transition-all duration-300 scale-100"
          @click.stop
        >
          <!-- Modal Header -->
          <div class="text-center mb-8">
            <div
              class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#14b1a1] to-teal-600 rounded-2xl mb-4 shadow-lg shadow-teal-500/25"
            >
              <svg
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
            </div>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">
              {{
                modalMode === "add"
                  ? "Yeni Hasta Ekle"
                  : modalMode === "edit"
                  ? "Hasta Bilgilerini Düzenle"
                  : "Hasta Detayları"
              }}
            </h2>
            <p class="text-gray-500">
              {{
                modalMode === "view"
                  ? "Hasta bilgilerini görüntüleyin"
                  : "Hasta bilgilerini girin"
              }}
            </p>
          </div>

          <!-- Patient Form -->
          <form
            v-if="modalMode !== 'view'"
            @submit.prevent="savePatient"
            class="space-y-6"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Name -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2"
                  >Ad Soyad *</label
                >
                <input
                  type="text"
                  v-model="currentPatient.name"
                  :disabled="modalMode === 'view'"
                  class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#14b1a1] focus:ring-4 focus:ring-[#14b1a1]/10 transition-all duration-200 disabled:bg-gray-50"
                  placeholder="Hasta adı soyadı"
                  required
                />
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2"
                  >Email *</label
                >
                <input
                  type="email"
                  v-model="currentPatient.email"
                  :disabled="modalMode === 'view'"
                  class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#14b1a1] focus:ring-4 focus:ring-[#14b1a1]/10 transition-all duration-200 disabled:bg-gray-50"
                  placeholder="ornek@email.com"
                  required
                />
              </div>

              <!-- Phone -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2"
                  >Telefon</label
                >
                <input
                  type="tel"
                  v-model="currentPatient.phone"
                  :disabled="modalMode === 'view'"
                  class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#14b1a1] focus:ring-4 focus:ring-[#14b1a1]/10 transition-all duration-200 disabled:bg-gray-50"
                  placeholder="0532 123 45 67"
                />
              </div>

              <!-- Birth Date -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2"
                  >Doğum Tarihi *</label
                >
                <input
                  type="date"
                  v-model="formattedBirthDate"
                  :disabled="modalMode === 'view'"
                  class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#14b1a1] focus:ring-4 focus:ring-[#14b1a1]/10 transition-all duration-200 disabled:bg-gray-50"
                  required
                />
              </div>

              <!-- Gender -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2"
                  >Cinsiyet *</label
                >
                <select
                  v-model="currentPatient.gender"
                  :disabled="modalMode === 'view'"
                  class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#14b1a1] focus:ring-4 focus:ring-[#14b1a1]/10 transition-all duration-200 disabled:bg-gray-50"
                  required
                >
                  <option value="">Seçiniz</option>
                  <option value="Erkek">Erkek</option>
                  <option value="Kadın">Kadın</option>
                </select>
              </div>

              <!-- TC Number -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2"
                  >TC Kimlik No</label
                >
                <input
                  type="text"
                  v-model="currentPatient.tc_number"
                  :disabled="modalMode === 'view'"
                  class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#14b1a1] focus:ring-4 focus:ring-[#14b1a1]/10 transition-all duration-200 disabled:bg-gray-50"
                  placeholder="12345678901"
                  maxlength="11"
                />
              </div>
            </div>

            <!-- Address -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Adres</label
              >
              <textarea
                v-model="currentPatient.address"
                :disabled="modalMode === 'view'"
                rows="3"
                class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#14b1a1] focus:ring-4 focus:ring-[#14b1a1]/10 transition-all duration-200 disabled:bg-gray-50 resize-none"
                placeholder="Hasta adresi..."
              ></textarea>
            </div>

            <!-- Medical Notes -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Tıbbi Notlar</label
              >
              <textarea
                v-model="currentPatient.medical_notes"
                :disabled="modalMode === 'view'"
                rows="3"
                class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#14b1a1] focus:ring-4 focus:ring-[#14b1a1]/10 transition-all duration-200 disabled:bg-gray-50 resize-none"
                placeholder="Diyabet tipi, ilaçlar, özel durumlar..."
              ></textarea>
            </div>

            <!-- Action Buttons -->
            <div class="flex space-x-3 pt-6">
              <button
                type="button"
                class="flex-1 text-gray-600 hover:text-gray-800 py-3 px-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 font-semibold"
                @click="closeModal"
              >
                {{ modalMode === "view" ? "Kapat" : "İptal" }}
              </button>
              <button
                v-if="modalMode !== 'view'"
                type="submit"
                class="flex-1 bg-gradient-to-r from-[#14b1a1] to-teal-600 text-white py-3 px-4 rounded-xl hover:from-teal-600 hover:to-[#14b1a1] transition-all duration-200 font-semibold shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30"
              >
                {{ modalMode === "add" ? "Hasta Ekle" : "Güncelle" }}
              </button>
            </div>
          </form>

          <div v-if="modalMode === 'view'" class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-500"
                  >Ad Soyad</label
                >
                <p class="text-lg font-semibold text-gray-800">
                  {{ currentPatient.name }}
                </p>
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-500">E-posta</label>
                <p class="text-gray-700">{{ currentPatient.email }}</p>
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-500">Telefon</label>
                <p class="text-gray-700">{{ currentPatient.phone }}</p>
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-500"
                  >TC Kimlik No</label
                >
                <p class="text-gray-700">{{ currentPatient.tc_number }}</p>
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-500"
                  >Doğum Tarihi</label
                >
                <p class="text-gray-700">
                  {{ formatDate(currentPatient.birth_date) }}
                </p>
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-500 mr-3"
                  >Yaş</label
                >
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {{ calculateAge(currentPatient.birth_date) }} yaş
                </span>
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-500 mr-3"
                  >Cinsiyet</label
                >
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                  :class="
                    currentPatient.gender === 'Female'
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-cyan-100 text-cyan-800'
                  "
                >
                  {{ currentPatient.gender === "Female" ? "Kadın" : "Erkek" }}
                </span>
              </div>
              <div class="space-y-2 md:col-span-2">
                <label class="text-sm font-medium text-gray-500">Adres</label>
                <p class="text-gray-700">{{ currentPatient.address }}</p>
              </div>
              <div class="space-y-2 md:col-span-3">
                <label class="text-sm font-medium text-gray-500"
                  >Tıbbi Notlar</label
                >
                <p class="text-gray-700">
                  {{ currentPatient.medical_notes || "Tıbbi not bulunmuyor." }}
                </p>
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-500"
                  >Kayıt Tarihi</label
                >
                <p class="text-gray-700">
                  {{ formatDate(currentPatient.created_at) }}
                </p>
              </div>
            </div>
            <div class="flex space-x-3 pt-6">
              <button
                type="button"
                class="flex-1 text-gray-600 hover:text-gray-800 py-3 px-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 font-semibold"
                @click="closeModal"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click="closeDeleteModal"
    >
      <div
        class="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
        @click.stop
      >
        <div class="text-center">
          <div
            class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4"
          >
            <svg
              class="h-6 w-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              ></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Hastayı Sil</h3>
          <p class="text-sm text-gray-500 mb-6">
            <strong>{{ patientToDelete?.name }}</strong> adlı hastayı silmek
            istediğinizden emin misiniz? Bu işlem geri alınamaz.
          </p>
          <div class="flex space-x-3">
            <button
              @click="closeDeleteModal"
              class="flex-1 text-gray-600 hover:text-gray-800 py-3 px-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 font-semibold"
            >
              İptal
            </button>
            <button
              @click="deletePatient"
              class="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-xl transition-all duration-200 font-semibold"
            >
              Sil
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PatientManagement",
  data() {
    return {
      showModal: false,
      showDeleteModal: false,
      modalMode: "add", // 'add', 'edit', 'view'
      searchQuery: "",
      genderFilter: "",
      currentPatient: this.getEmptyPatient(),
      patientToDelete: null,
      patients: [],
    }
  },
  computed: {
    formattedBirthDate: {
      get() {
        return this.currentPatient.birth_date
          ? this.currentPatient.birth_date.split("T")[0]
          : ""
      },
      set(value) {
        this.currentPatient.birth_date = value
      },
    },
    filteredPatients() {
      let filtered = this.patients

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(
          (patient) =>
            patient.name.toLowerCase().includes(query) ||
            patient.email.toLowerCase().includes(query)
        )
      }

      if (this.genderFilter) {
        filtered = filtered.filter(
          (patient) => patient.gender === this.genderFilter
        )
      }

      return filtered
    },
  },
  mounted() {
    this.fetchPatients()
  },
  methods: {
    async fetchPatients() {
      try {
        const res = await fetch("/api/patients")
        const data = await res.json()
        console.log("data", data)
        this.patients = data
      } catch (error) {
        console.error("Hasta listesi alınamadı:", error)
        alert("❌ Hasta listesi alınamadı.")
      }
    },
    getEmptyPatient() {
      return {
        id: null,
        name: "",
        email: "",
        phone: "",
        birth_date: "",
        gender: "",
        tc_number: "",
        address: "",
        medical_notes: "",
        created_at: new Date().toISOString().split("T")[0],
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
      const options = { year: "numeric", month: "short", day: "numeric" }
      return new Date(dateString).toLocaleDateString("tr-TR", options)
    },
    openModal(mode, patient = null) {
      this.modalMode = mode
      this.showModal = true

      if (patient) {
        this.currentPatient = { ...patient }
      } else {
        this.currentPatient = this.getEmptyPatient()
      }
    },
    closeModal() {
      this.showModal = false
      this.currentPatient = this.getEmptyPatient()
    },
    viewPatient(patient) {
      this.openModal("view", patient)
    },
    editPatient(patient) {
      this.openModal("edit", patient)
    },
    confirmDelete(patient) {
      this.patientToDelete = patient
      this.showDeleteModal = true
    },
    closeDeleteModal() {
      this.showDeleteModal = false
      this.patientToDelete = null
    },
    async savePatient() {
      if (this.modalMode === "add") {
        try {
          const res = await fetch("/api/patients", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.currentPatient),
          })

          if (!res.ok) throw new Error("API error")
          const newPatient = await res.json()
          this.patients.push(newPatient)
          alert("✅ Yeni hasta başarıyla eklendi!")
        } catch (err) {
          alert("❌ Hasta eklenemedi.")
        }
      } else if (this.modalMode === "edit") {
        try {
          const res = await fetch(`/api/patients/${this.currentPatient.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.currentPatient),
          })

          if (!res.ok) throw new Error("API error")
          const updatedPatient = await res.json()

          const index = this.patients.findIndex(
            (p) => p.id === updatedPatient.id
          )
          if (index !== -1) this.patients[index] = updatedPatient

          alert("✅ Hasta bilgileri güncellendi!")
        } catch (err) {
          alert("❌ Hasta güncellenemedi.", err)
        }
      }

      this.closeModal()
    },
    async deletePatient() {
      if (!this.patientToDelete) return

      try {
        const res = await fetch(`/api/patients/${this.patientToDelete.id}`, {
          method: "DELETE",
        })

        if (!res.ok) throw new Error("API error")

        this.patients = this.patients.filter(
          (p) => p.id !== this.patientToDelete.id
        )
        alert("✅ Hasta başarıyla silindi!")
      } catch (err) {
        alert("❌ Hasta silinemedi.")
      }

      this.closeDeleteModal()
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

/* Hover effects for cards */
.hover\:bg-gradient-to-r:hover {
  background-image: linear-gradient(
    to right,
    rgba(20, 177, 161, 0.05),
    rgba(6, 182, 212, 0.05)
  );
}

/* Button hover animations */
button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}
</style>
