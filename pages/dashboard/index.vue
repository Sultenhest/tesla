<template>
  <div class="dashboard">
    <Card title="Welcome to the dashboard" :center="true">
      <p>There aren't any failed jobs.</p>
      <LineChart :data="lineData" />
      <PieChart :data="pieData" />
    </Card>
  </div>
</template>

<script>
import Card from '~/components/UI/Cards/Card.vue'

import LineChart from '~/components/Charts/LineChart.vue'
import PieChart from '~/components/Charts/PieChart.vue'

export default {
  components: {
    Card,
    LineChart,
    PieChart
  },
  data() {
    return {
      response: {},
      lineData: {
        labels: ['January', 'February', 'March'],
        datasets: [
          {
            label: 'GitHub Commits',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#2c7a7b',
            borderColor: '#2c7a7b',
            data: [40, 20, 12]
          }
        ]
      },
      pieData: {
        labels: ['Green', 'Red', 'Blue'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
            data: [1, 10, 5]
          }
        ]
      }
    }
  },
  mounted() {
    // this.$axios.$get('hello').then((response) => (this.response = response))
  }
}
</script>
