<template>
  <div>
    <Card class="mb-4" title="Profile" :center="true">
      No content
    </Card>

    <ActivitiesModal />

    <ActivityFeed
      v-for="(activities, date) in getFeed"
      :id="activities.id"
      :key="activities.id"
      class="mb-4"
      :title="$moment(date).fromNow()"
      :activities="activities"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ActivitiesModal from '~/components/Activities/ActivitiesModal.vue'
import ActivityFeed from '~/components/Activities/ActivityFeed.vue'

export default {
  components: {
    ActivitiesModal,
    ActivityFeed
  },
  async fetch() {
    await this.$store.dispatch('activities/fetchFeed')
  },
  data() {
    return {
      currentActivity: {
        changes: null
      }
    }
  },
  computed: {
    ...mapGetters('activities', ['getFeed'])
  },
  methods: {
    setCurrentActivity(event) {
      this.currentActivity = event.params.activity
    }
  }
}
</script>
