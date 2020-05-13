<template>
  <div>
    <tbody>
      <tr v-for="activity in getActivities" :key="activity.id">
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
  name: 'ActivitesTable',
  fetch({ store, params }) {
    store.dispatch('activities/getActivities', params.id)
  },
  computed: {
    ...mapGetters('activities', ['getActivities', 'getMeta', 'getLinks'])
  }
}
</script>
