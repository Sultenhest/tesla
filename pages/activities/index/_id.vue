<template>
  <ActivityTableBody :activites="getActivities" />
</template>

<script>
import { mapGetters } from 'vuex'

import ActivityTableBody from '~/components/Activities/ActivityTableBody.vue'

export default {
  components: {
    ActivityTableBody
  },
  async fetch({ store, params, query }) {
    await store.dispatch('activities/getActivities', query.page)
  },
  data() {
    return {
      currentActivity: {
        changes: null
      }
    }
  },
  computed: {
    ...mapGetters('activities', ['getActivities', 'getMeta'])
  },
  methods: {
    setCurrentActivity(event) {
      this.currentActivity = event.params.activity
    }
  },
  watchQuery: ['page']
}
</script>
