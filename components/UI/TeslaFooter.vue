<template>
  <footer>Version {{ getVersion }}</footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TeslaFooter',
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
