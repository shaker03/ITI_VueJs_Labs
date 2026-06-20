<template>
  <div>
    <table class="table table-bordered text-center">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id">
          <td>{{ student.id }}</td>
          <td>{{ student.title }}</td>
          <td>{{ student.category }}</td>
        </tr>
      </tbody>
    </table>

    <div class="d-flex justify-content-between align-items-center">
      <strong># of students {{ students.length }}</strong>
      <button class="btn btn-primary" @click="$emit('add-data')">Add</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataList',
  props: ['students']
}
</script>