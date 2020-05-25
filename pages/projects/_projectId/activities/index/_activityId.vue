<template>
  <ActivityTableBody :activites="getProjectActivity" />
</template>

<script>
import { mapGetters } from 'vuex'

import ActivityTableBody from '~/components/Activities/ActivityTableBody.vue'

export default {
  components: {
    ActivityTableBody
  },
  fetch({ store, params, query }) {
    store.dispatch('projects/fetchProjectActivity', [
      params.projectId,
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
    ...mapGetters('projects', ['getProjectActivity', 'getProjectActivityMeta'])
  },
  methods: {
    setCurrentActivity(event) {
      this.currentActivity = event.params.activity
    }
  },
  watchQuery: ['page']
}
</script>
