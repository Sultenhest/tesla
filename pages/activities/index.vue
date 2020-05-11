<template>
  <div>
    Activity
    <pre>
      {{ response }}
    </pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      response: []
    }
  },
  async created() {
    await this.$axios
      .$get('/api/activities')
      .then((response) => {
        this.response = response
      })
      .catch((error) => {
        this.error = error
      })
  }
}
</script>
