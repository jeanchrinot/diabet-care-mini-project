// src/router/index.js
import { createRouter, createWebHistory } from "vue-router"

import WelcomePage from "@/pages/WelcomePage.vue"
import DoctorLayout from "@/layouts/DoctorLayout.vue"
import DoctorDashboard from "@/pages/doctor/Dashboard.vue"
import PatientsPage from "@/pages/doctor/Patients.vue"
import PatientDetailsPage from "@/pages/doctor/PatientDetails.vue"
import SettingsPage from "@/pages/doctor/Settings.vue"

const routes = [
  { path: "/", component: WelcomePage },
  {
    path: "/doctor",
    component: DoctorLayout,
    children: [
      { path: "dashboard", component: DoctorDashboard }, // /doctor
      {
        path: "patients",
        component: PatientsPage,
      }, // /doctor/patients
      { path: "patients/:id", component: PatientDetailsPage },
      { path: "settings", component: SettingsPage }, // /doctor/settings
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
