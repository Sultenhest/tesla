<template>
  <div class="dashboard container">
    <p>Welcome to the dashboard. You should be logged in.</p>
    <p>Name: {{ $auth.user.name }}</p>
    <p>Name: {{ $auth.user.email }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      response: {}
    }
  },
  mounted() {
    // this.$axios.$get('hello').then((response) => (this.response = response))
  }
}
</script>

<style>
.container {
  @apply min-h-screen text-center mx-auto;
}
</style>
