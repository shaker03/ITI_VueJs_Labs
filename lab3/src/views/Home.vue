<template>
  <div>
    <DataList :students="students" @add-data="$emit('add-data')" />
  </div>
</template>

<script>
import DataList from '../components/DataList.vue'

export default {
  name: 'HomeView',
  components: {
    DataList,
  },
  props: {
    students: {
      type: Array,
      required: true
    }
  }
}
</script>
