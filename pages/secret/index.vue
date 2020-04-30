<template>
  <div>
    {{ response }}
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
    this.$axios.$get('api/user').then((response) => (this.response = response))
  }
}
</script>
