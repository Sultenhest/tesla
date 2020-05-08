<template>
  <div>
    {{ response }}
    <p>Name: {{ $auth.user.name }}</p>
    <p>Name: {{ $auth.user.email }}</p>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$axios.$get('api/user').then((response) => (this.response = response))
  }
}
</script>
