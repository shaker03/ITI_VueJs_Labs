<template>
  <div class="d-flex flex-column min-vh-100">
    <AppHeader />

    <div class="d-flex justify-content-around align-items-start flex-grow-1">
      <AppSidebar v-if="$route.name === 'home'" />

      <div class="content w-50 mb-5">
        <router-view v-slot="{ Component, route }">
          <component
            v-if="route.name === 'home'"
            :is="Component"
            :students="students"
            @add-data="goToForm"
          />

          <component
            v-else-if="route.name === 'form'"
            :is="Component"
            :formData="formData"
            @next-step="goToPreview"
          />

          <component
            v-else-if="route.name === 'preview'"
            :is="Component"
            :formData="formData"
            @prev-step="goToForm"
            @submit-data="submitData"
          />

          <component
            v-else-if="route.name === 'student'"
            :is="Component"
            :studentId="route.params.id"
          />

          <component
            v-else
            :is="Component"
          />
        </router-view>
      </div>
    </div>

    <AppFooter class="mt-auto flex-shrink-0" />
  </div>
</template>

<script>
import AppHeader from './components/Header.vue'
import AppFooter from './components/Footer.vue'
import AppSidebar from './components/Sidbar.vue'

const API_URL = 'http://localhost:3000/students'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    AppSidebar
  },
  data() {
    return {
      students: [],
      formData: {
        title: '',
        content: '',
        category: '',
        series: '',
        shareOn: [],
        shareImmediately: false
      }
    }
  },
  async created() {
    await this.fetchStudents()
  },
  methods: {
    async fetchStudents() {
      try {
        const response = await fetch(API_URL)
        const data = await response.json()
        this.students = data
      } catch (error) {
        console.error('Error fetching students:', error)
      }
    },

    goToForm() {
      this.$router.push({ name: 'form' })
    },

    goToPreview(data) {
      this.formData = { ...data }
      this.$router.push({ name: 'preview' })
    },

    async submitData() {
      try {
        const newStudent = {
          ...this.formData
        }

        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newStudent)
        })

        const createdStudent = await response.json()
        this.students.push(createdStudent)

        this.formData = {
          title: '',
          content: '',
          category: '',
          series: '',
          shareOn: [],
          shareImmediately: false
        }

        this.$router.push({ name: 'home' })
      } catch (error) {
        console.error('Error adding student:', error)
        alert('Failed to submit user data. Is json-server running on port 3000? Error: ' + error.message)
      }
    }
  }
}
</script>