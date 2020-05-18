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
  async fetch({ store, params, query }) {
    await store.dispatch('tasks/getTaskActivity', [
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
    ...mapGetters('tasks', ['getTaskActivity', 'getTaskMeta'])
  },
  methods: {
    setCurrentActivity(event) {
      this.currentActivity = event.params.activity
    }
  },
  watchQuery: ['page']
}
</script>
