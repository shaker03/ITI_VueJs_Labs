<template>
  <form @submit.prevent="handleNext">
    <div class="mb-3">
      <label>Title</label>
      <input type="text" v-model="localData.title" class="form-control" />
      <small class="text-danger">{{ errors.title }}</small>
    </div>

    <div class="mb-3">
      <label>Content</label>
      <input type="text" v-model="localData.content" class="form-control" />
      <small class="text-danger">{{ errors.content }}</small>
    </div>

    <div class="mb-3">
      <label>Category</label>
      <div v-for="item in categories" :key="item">
        <input type="radio" :value="item" v-model="localData.category" /> {{ item }}
      </div>
      <small class="text-danger">{{ errors.category }}</small>
    </div>

    <div class="mb-3">
      <label>Series</label>
      <select v-model="localData.series" class="form-control">
        <option value="">Select series</option>
        <option>First Edition</option>
        <option>Second Edition</option>
        <option>Third Edition</option>
      </select>
      <small class="text-danger">{{ errors.series }}</small>
    </div>

    <div class="mb-3">
      <label>Share on</label>
      <div v-for="platform in platforms" :key="platform">
        <input type="checkbox" :value="platform" v-model="localData.shareOn" /> {{ platform }}
      </div>
      <small class="text-danger">{{ errors.shareOn }}</small>
    </div>

    <div class="mb-3">
      <input type="checkbox" v-model="localData.shareImmediately" />
      <label>Share Immediately</label>
    </div>

    <button class="btn btn-primary">Next</button>
  </form>
</template>

<script>
export default {
  name: 'DataForm',
  props: ['formData'],
  data() {
    return {
      localData: { ...this.formData },
      categories: ['Testing', 'Developing', 'Networking', 'Designing'],
      platforms: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'],
      errors: {}
    }
  },
  methods: {
    handleNext() {
      this.errors = {}

      if (!this.localData.title.trim()) this.errors.title = 'Title is required.'
      if (!this.localData.content.trim()) this.errors.content = 'Content is required.'
      if (!this.localData.category) this.errors.category = 'Category selection is required.'
      if (!this.localData.series) this.errors.series = 'Series selection is required.'
      if (!this.localData.shareOn.length) this.errors.shareOn = 'You must select at least one platform.'

      if (Object.keys(this.errors).length === 0) {
        this.$emit('next-step', this.localData)
      }
    }
  }
}
</script>