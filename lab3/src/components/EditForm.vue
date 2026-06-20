<template>
  <div class="card p-4">
    <h2 class="text-center text-warning">Edit Student</h2>

    <div v-if="loading" class="text-center py-4">
      Loading student data...
    </div>

    <div v-else-if="error" class="text-danger text-center py-4">
      {{ error }}
    </div>

    <form v-else @submit.prevent="updateStudent">
      <div class="mb-3">
        <label class="form-label">Title</label>
        <input v-model="form.title" type="text" class="form-control" />
      </div>

      <div class="mb-3">
        <label class="form-label">Content</label>
        <input v-model="form.content" type="text" class="form-control" />
      </div>

      <div class="mb-3">
        <label class="form-label d-block">Category</label>
        <div v-for="item in categories" :key="item" class="form-check">
          <input
            class="form-check-input"
            type="radio"
            :id="item"
            :value="item"
            v-model="form.category"
          />
          <label class="form-check-label" :for="item">{{ item }}</label>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label">Series</label>
        <select v-model="form.series" class="form-control">
          <option value="">Select series</option>
          <option>First Edition</option>
          <option>Second Edition</option>
          <option>Third Edition</option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label d-block">Share On</label>

        <div v-for="platform in platforms" :key="platform" class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            :id="platform"
            :value="platform"
            v-model="form.shareOn"
          />
          <label class="form-check-label" :for="platform">{{ platform }}</label>
        </div>
      </div>

      <div class="form-check mb-3">
        <input
          v-model="form.shareImmediately"
          type="checkbox"
          class="form-check-input"
          id="shareImmediately"
        />
        <label class="form-check-label" for="shareImmediately">
          Share Immediately
        </label>
      </div>

      <button type="submit" class="btn btn-success w-100">
        Update Student
      </button>

      <router-link
        :to="{ name: 'home' }"
        class="btn btn-secondary w-100 mt-2"
      >
        Cancel
      </router-link>
    </form>
  </div>
</template>

<script>
const API_URL = 'http://localhost:3000/students'

export default {
  name: 'EditStudent',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      loading: true,
      error: null,
      categories: ['Testing', 'Developing', 'Networking', 'Designing'],
      platforms: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'],
      form: {
        title: '',
        content: '',
        category: '',
        series: '',
        shareImmediately: false,
        shareOn: []
      }
    }
  },
  async created() {
    await this.fetchStudent()
  },
  watch: {
    id() {
      this.fetchStudent()
    }
  },
  methods: {
    async fetchStudent() {
      this.loading = true
      this.error = null

      try {
        const response = await fetch(`${API_URL}/${this.id}`)

        if (!response.ok) {
          throw new Error('Student not found.')
        }

        const data = await response.json()

        this.form = {
          title: data.title || '',
          content: data.content || '',
          category: data.category || '',
          series: data.series || '',
          shareImmediately: !!data.shareImmediately,
          shareOn: Array.isArray(data.shareOn) ? data.shareOn : []
        }
      } catch (err) {
        this.error = err.message || 'Failed to load student.'
      } finally {
        this.loading = false
      }
    },

    async updateStudent() {
      try {
        const response = await fetch(`${API_URL}/${this.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: this.id,
            ...this.form
          })
        })

        if (!response.ok) {
          throw new Error('Failed to update student.')
        }

        this.$router.push({
          name: 'student',
          params: { id: this.id }
        })
      } catch (err) {
        this.error = err.message || 'Update failed.'
      }
    }
  }
}
</script>