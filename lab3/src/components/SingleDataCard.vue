<template>
  <div class="card p-4">
    <h2 class="text-center text-primary">Student Details</h2>

    <div v-if="loading" class="text-center py-4">
      Loading student data...
    </div>

    <div v-else-if="error" class="text-danger text-center py-4">
      {{ error }}
    </div>

    <div v-else>
      <p><strong>ID:</strong> {{ student.id }}</p>
      <p><strong>Title:</strong> {{ student.title }}</p>
      <p><strong>Content:</strong> {{ student.content }}</p>
      <p><strong>Category:</strong> {{ student.category }}</p>
      <p><strong>Series:</strong> {{ student.series }}</p>
      <p><strong>Share immediately:</strong> {{ student.shareImmediately }}</p>
      <p><strong>Share on:</strong> {{ student.shareOn.join(', ') }}</p>

      <div class="d-flex gap-2 mt-3">
        <button class="btn btn-danger w-100" @click="deleteStudent">
          Delete
        </button>

        <router-link
          :to="{ name: 'edit-student', params: { id: student.id } }"
          class="btn btn-warning w-100"
        >
          Edit
        </router-link>
      </div>

      <router-link :to="{ name: 'home' }" class="btn btn-secondary w-100 mt-3">
        Back to list
      </router-link>
    </div>
  </div>
</template>

<script>
const API_URL = 'http://localhost:3000/students'

export default {
  name: 'SingleDataCard',
  props: {
    studentId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      student: null,
      loading: true,
      error: null
    }
  },
  async created() {
    await this.fetchStudent()
  },
  watch: {
    studentId() {
      this.fetchStudent()
    }
  },
  methods: {
    async fetchStudent() {
      this.loading = true
      this.error = null
      this.student = null

      try {
        const response = await fetch(`${API_URL}/${this.studentId}`)

        if (!response.ok) {
          throw new Error(`Student with ID ${this.studentId} not found.`)
        }

        this.student = await response.json()
      } catch (err) {
        this.error = err.message || 'Failed to load student data.'
      } finally {
        this.loading = false
      }
    },

    async deleteStudent() {
      const confirmed = confirm('Are you sure you want to delete this student?')
      if (!confirmed) return

      try {
        const response = await fetch(`${API_URL}/${this.studentId}`, {
          method: 'DELETE'
        })

        if (!response.ok) {
          throw new Error('Failed to delete student.')
        }

        this.$router.push({ name: 'home' })
      } catch (err) {
        this.error = err.message || 'Delete failed.'
      }
    }
  }
}
</script>