<template>
  <div>
    <Datacard
      :formData="formData"
      @prev-step="$emit('prev-step')"
      @submit-data="$emit('submit-data')"
    />
  </div>
</template>

<script>
import Datacard from '../components/Datacard.vue'

export default {
  name: 'PreviewView',
  components: {
    Datacard
  },
  emits: ['prev-step', 'submit-data'],
  props: {
    formData: {
      type: Object,
      required: true
    }
  }
}
</script>
