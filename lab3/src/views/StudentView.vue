<template>
  <div>
    <SingleDataCard :studentId="studentId" />
  </div>
</template>

<script>
import SingleDataCard from '../components/SingleDataCard.vue'

export default {
  name: 'StudentView',
  components: {
    SingleDataCard
  },
  props: {
    studentId: {
      type: [String, Number],
      required: true
    }
  }
}
</script>
