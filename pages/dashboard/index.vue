<template>
  <div class="dashboard">
    <Card title="Welcome to the dashboard" :center="true">
      <p>There aren't any failed jobs.</p>
    </Card>
  </div>
</template>

<script>
import Card from '~/components/UI/Cards/Card.vue'

export default {
  components: {
    Card
  },
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
