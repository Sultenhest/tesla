<template>
  <div class="dashboard">
    <div class="block lg:flex mb-4">
      <Card class="w-full" title="Statistics" subtitle="This weeks numbers">
        <div class="flex p-3">
          <div class="w-1/4 p-3">
            <small class="text-sm text-gray-700">Completed Tasks</small>
            <div class="flex items-end mt-3">
              <h4 class="text-4xl leading-7">33</h4>
              <span
                class="flex text-sm mt-1 ml-4 bg-green-200 bg-opacity-50 text-green-500 px-2 py-1 rounded-full"
              >
                <Icon icon-name="arrow-thin-up" icon-size="sm" /> 22%
              </span>
            </div>
          </div>
          <div class="w-1/4 p-3">
            <small class="text-sm text-gray-700">New Tasks</small>
            <div class="flex items-end mt-3">
              <h4 class="text-4xl leading-7">12</h4>
              <span
                class="flex text-sm mt-1 ml-4 bg-red-200 bg-opacity-50 text-red-500 px-2 py-1 rounded-full"
              >
                <Icon icon-name="arrow-thin-down" icon-size="sm" /> 22%
              </span>
            </div>
          </div>
          <div class="w-1/4 p-3">
            <small class="text-sm text-gray-700">Total Tasks</small>
            <h4 class="text-2xl mt-3">54</h4>
          </div>
          <div class="w-1/4 p-3">
            <small class="text-sm text-gray-700">Total Tasks</small>
            <h4 class="text-2xl mt-3">11</h4>
          </div>
        </div>
      </Card>
    </div>

    <div class="block lg:flex">
      <Card class="w-full lg:w-2/3 mr-0 lg:mr-2" title="Overview">
        <div class="flex p-3">
          <div class="w-1/3 p-3">
            <small class="text-sm text-gray-700">Total Clients</small>
            <h4 class="text-2xl mt-3">{{ $auth.user.clients_count }}</h4>
          </div>
          <div class="w-1/3 p-3">
            <small class="text-sm text-gray-700">Total Projects</small>
            <h4 class="text-2xl mt-3">{{ $auth.user.projects_count }}</h4>
          </div>
          <div class="w-1/3 p-3">
            <small class="text-sm text-gray-700">Total Tasks</small>
            <h4 class="text-2xl mt-3">{{ $auth.user.tasks_count }}</h4>
          </div>
        </div>
      </Card>

      <Card
        class="w-full lg:w-1/3 ml-0 lg:ml-2"
        title="Recently Visited Projects"
      >
        <ProjectsListItem
          v-for="project in projects"
          :id="project.id"
          :key="project.id"
          :project="project"
        />
      </Card>
    </div>

    <Card title="Big Dick Charts" style="display: none;">
      <LineChart :data="lineData" />
      <PieChart :data="pieData" />
    </Card>
  </div>
</template>

<script>
import ProjectsListItem from '~/components/Dashboard/ProjectsListItem.vue'

import LineChart from '~/components/Charts/LineChart.vue'
import PieChart from '~/components/Charts/PieChart.vue'

export default {
  components: {
    ProjectsListItem,
    LineChart,
    PieChart
  },
  data() {
    return {
      projects: {},
      error: {},
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
  async created() {
    await this.$axios
      .$get('/api/dashboard')
      .then((response) => {
        this.projects = response.projects
      })
      .catch((error) => {
        this.error = error
      })
  }
}
</script>
