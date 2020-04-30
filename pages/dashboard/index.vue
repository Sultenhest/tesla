<template>
  <div class="dashboard">
    <Card title="Welcome to the dashboard"
      ><template v-slot:content>There aren't any failed jobs.</template></Card
    >
  </div>
</template>

<script>
import Card from '~/components/UI/Card.vue'

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
