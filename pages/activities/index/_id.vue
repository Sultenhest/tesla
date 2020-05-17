<template>
  <div>
    <modal name="activity-info" height="auto" @before-open="setCurrentActivity">
      <Card title="Activity Information" :center="true">
        <template v-slot:button>
          <button class="button" @click="$modal.hide('activity-info')">
            <Icon icon-name="close" icon-text="Close" />
          </button>
        </template>
        <pre><code>{{ currentActivity.changes }}</code></pre>
      </Card>
    </modal>

    <tbody>
      <tr
        v-for="activity in getActivities"
        :key="activity.id"
        @click="$modal.show('activity-info', { activity: activity })"
      >
        <td>
          {{ activity.subject_type }}
        </td>
        <td>
          {{ activity.echo_description }}
        </td>
        <td>
          {{ activity.changes }}
        </td>
        <td>
          <Moment :timestamp="activity.created_at" />
        </td>
      </tr>
    </tbody>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
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
