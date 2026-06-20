<template>
  <header class="bg-warning text-center py-5 mb-4">
    <h1 class="m-0">welcome in our vue application</h1>
    <router-link
      v-if="$route.name !== 'book-list'"
      :to="{ name: 'book-list' }"
      class="btn btn-dark btn-sm mt-3"
    >
      Go to Book View
    </router-link>
    <router-link
      v-else
      :to="{ name: 'home' }"
      class="btn btn-dark btn-sm mt-3"
    >
      Back to Dashboard
    </router-link>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>