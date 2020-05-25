<template>
  <ActivityTableBody :activites="getClientActivity" />
</template>

<script>
import { mapGetters } from 'vuex'

import ActivityTableBody from '~/components/Activities/ActivityTableBody.vue'

export default {
  components: {
    ActivityTableBody
  },
  async fetch({ store, params, query }) {
    await store.dispatch('clients/fetchClientActivity', [params.id, query.page])
  },
  data() {
    return {
      currentActivity: {
        changes: null
      }
    }
  },
  computed: {
    ...mapGetters('clients', ['getClientActivity', 'getClientActivityMeta'])
  },
  methods: {
    setCurrentActivity(event) {
      this.currentActivity = event.params.activity
    }
  },
  watchQuery: ['page']
}
</script>
