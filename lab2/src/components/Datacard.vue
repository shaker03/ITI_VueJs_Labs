<template>
  <div class="card p-4">
    <h2 class="text-center text-primary">User Data</h2>
    <p><strong>Title:</strong> {{ formData.title }}</p>
    <p><strong>Content:</strong> {{ formData.content }}</p>
    <p><strong>Category:</strong> {{ formData.category }}</p>
    <p><strong>Series:</strong> {{ formData.series }}</p>
    <p><strong>Share immediately:</strong> {{ formData.shareImmediately }}</p>
    <p><strong>Share on:</strong> {{ formData.shareOn.join(', ') }}</p>

    <button class="btn btn-primary w-100 mb-2" @click="$emit('prev-step')">Prev</button>
    <button class="btn btn-warning w-100" @click="$emit('submit-data')">Submit</button>
  </div>
</template>

<script>
export default {
  name: 'DataCard',
  props: ['formData']
}
</script>