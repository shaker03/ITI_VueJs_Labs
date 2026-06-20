<template>
  <div>
    <DataForm :formData="formData" @next-step="$emit('next-step', $event)" />
  </div>
</template>

<script>
import DataForm from '../components/DataForm.vue'

export default {
  name: 'FormView',
  components: {
    DataForm
  },
  emits: ['next-step'],
  props: {
    formData: {
      type: Object,
      required: true
    }
  }
}
</script>
