<template>
  <aside class="sidebar">
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
      <li><a href="#">Gallery</a></li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'AppSidebar'
}
</script>

<style scoped>
.sidebar {
  width: 300px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.sidebar li {
  border-bottom: 1px solid #ddd;
}

.sidebar li:last-child {
  border-bottom: none;
}

.sidebar a {
  display: block;
  padding: 14px 18px;
  text-decoration: underline;
  color: #2c6ed5;
  background-color: white;
}

.sidebar li.active a {
  background-color: #0d6efd;
  color: white;
}
</style>