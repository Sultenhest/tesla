<template>
  <div class="dashboard">
    <div class="hidden lg:block h-6 mb-3"></div>
    <Card
      class="w-full mb-4"
      title="Chart"
      sub-title="Task Statistics on a Weekly basis"
    >
      <Loader :loading="loading" />
      <LineChart
        v-if="!loading"
        :data="lineData"
        :options="{ responsive: true, maintainAspectRatio: false }"
      />
    </Card>

    <div class="block lg:flex mb-4">
      <Card class="w-full" title="Statistics" sub-title="This week in numbers">
        <div class="flex flex-wrap p-3">
          <div class="w-1/3 p-3">
            <Stat
              header="Billed Tasks"
              :value="getBilledAt.this_week"
              :percentage="getBilledAt.difference"
            />
          </div>
          <div class="w-1/3 p-3">
            <Stat
              header="Completed tasks"
              :value="getCompletedAt.this_week"
              :percentage="getCompletedAt.difference"
            />
          </div>
          <div class="w-1/3 p-3">
            <Stat
              header="New Tasks"
              :value="getCreatedAt.this_week"
              :percentage="getCreatedAt.difference"
            />
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import LineChart from '~/components/Charts/LineChart.vue'
import ProjectsListItem from '~/components/Dashboard/ProjectsListItem.vue'
import Stat from '~/components/Dashboard/Stat.vue'

export default {
  components: {
    LineChart,
    ProjectsListItem,
    Stat
  },
  fetch() {
    this.$auth.fetchUser()
    this.$store.dispatch('taskStatistics/getTaskStats').then(() => {
      this.flipLoading()
    })
    this.$axios.$get('/api/dashboard').then((response) => {
      this.projects = response.projects
    })
  },
  data() {
    return {
      projects: {},
      loading: true
    }
  },
  computed: {
    ...mapGetters('taskStatistics', [
      'getRawData',
      'getBilledAt',
      'getCompletedAt',
      'getCreatedAt'
    ]),
    lineData() {
      return {
        labels: Object.keys(this.getRawData.billed_at), // ['11', '12', '13', '14', '16', '17', '18', '19', '20', '21'],
        datasets: [
          {
            label: 'Billed Tasks',
            backgroundColor: 'rgba(44, 122, 123, .2)',
            pointBackgroundColor: '#2c7a7b',
            borderColor: '#2c7a7b',
            data: Object.values(this.getRawData.billed_at) // [67, 106, 84, 73, 71, 73, 77, 82, 91, 68]
          },
          {
            label: 'Completed Tasks',
            backgroundColor: 'rgba(76, 81, 191, .2)',
            pointBackgroundColor: '#4c51bf',
            borderColor: '#4c51bf',
            data: Object.values(this.getRawData.completed_at)
          }
        ]
      }
    }
  },
  methods: {
    flipLoading() {
      this.loading = !this.loading
    }
  }
}
</script>
