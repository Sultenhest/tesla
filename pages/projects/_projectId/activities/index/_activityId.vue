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
  async fetch({ store, params, query }) {
    await store.dispatch('projects/getProjectActivity', [
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
    ...mapGetters('projects', ['getProjectActivity', 'getProjectsMeta'])
  },
  methods: {
    setCurrentActivity(event) {
      this.currentActivity = event.params.activity
    }
  },
  watchQuery: ['page']
}
</script>
