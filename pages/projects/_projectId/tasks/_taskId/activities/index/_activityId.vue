<template>
  <ActivityTableBody :activites="getTaskActivity" />
</template>

<script>
import { mapGetters } from 'vuex'

import ActivityTableBody from '~/components/Activities/ActivityTableBody.vue'

export default {
  components: {
    ActivityTableBody
  },
  fetch({ store, params, query }) {
    store.dispatch('tasks/fetchTaskActivity', [
      params.projectId,
      params.taskId,
      query.page
    ])
  },
  data() {
    return {
      currentActivity: {
        changes: null
      }
    }
  },
  computed: {
    ...mapGetters('tasks', ['getTaskActivity', 'getTaskActivityMeta'])
  },
  methods: {
    setCurrentActivity(event) {
      this.currentActivity = event.params.activity
    }
  },
  watchQuery: ['page']
}
</script>
