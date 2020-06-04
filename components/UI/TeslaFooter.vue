<template>
  <footer>Tesla Version {{ getVersion }} | API Version {{ apiVersion }}</footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TeslaFooter',
  fetch() {
    this.$axios.$get('/api/version').then((response) => {
      this.apiVersion = response
    })
  },
  data() {
    return {
      apiVersion: ''
    }
  },
  computed: {
    ...mapGetters('version', ['getVersion'])
  }
}
</script>

<style scoped>
footer {
  @apply flex justify-center items-center mt-6 p-3 text-gray-700;
}
</style>
