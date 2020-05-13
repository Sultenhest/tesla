<template>
  <div class="dashboard">
    <div class="block lg:flex mb-4">
      <Card class="w-full" title="Statistics" sub-title="This week in numbers">
        <div class="flex flex-wrap p-3">
          <div class="w-1/2 md:w-1/4 p-3">
            <Stat header="Billed Tasks" :value="11" :percentage="1" />
          </div>
          <div class="w-1/2 md:w-1/4 p-3">
            <Stat header="Completed tasks" :value="33" :percentage="18" />
          </div>
          <div class="w-1/2 md:w-1/4 p-3">
            <Stat
              header="New Tasks"
              :value="12"
              arrow="down"
              :percentage="22"
            />
          </div>
          <div class="w-1/2 md:w-1/4 p-3">
            <Stat header="Total Tasks" :value="54" :percentage="44" />
          </div>
        </div>
      </Card>
    </div>

    <div class="block lg:flex">
      <Card
        class="w-full lg:w-2/3 mr-0 lg:mr-2 mb-4 lg:mb-0"
        title="Overview"
        sub-title="Your current status"
      >
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

    {{ statistics }}
    <ul>
      <li
        v-for="statistic in statistics"
        :id="statistic.id"
        :key="statistic.id"
      >
        {{ statistic }}
      </li>
    </ul>

    <Card title="Big Dick Charts" style="display: none;">
      <LineChart :data="lineData" />
      <PieChart :data="pieData" />
    </Card>
  </div>
</template>

<script>
import ProjectsListItem from '~/components/Dashboard/ProjectsListItem.vue'
import Stat from '~/components/Dashboard/Stat.vue'

import LineChart from '~/components/Charts/LineChart.vue'
import PieChart from '~/components/Charts/PieChart.vue'

export default {
  components: {
    ProjectsListItem,
    Stat,
    LineChart,
    PieChart
  },
  fetch() {
    this.$auth.fetchUser()
    this.$axios
      .$get('/api/dashboard')
      .then((response) => {
        this.projects = response.projects
        this.statistics = response.statistics
      })
      .catch((error) => {
        this.error = error
      })
  },
  data() {
    return {
      projects: {},
      statistics: {},
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
  }
}
</script>
