<template>
  <tbody>
    <p v-if="!activites" class="center-content">
      You dont seem to have any activites yet.
    </p>
    <ActivityRow
      v-for="activity in activites"
      :key="activity.id"
      :activity="activity"
    />
  </tbody>
</template>

<script>
import ActivityRow from '~/components/Activities/ActivityRow.vue'

export default {
  name: 'ActivityTableBody',
  components: {
    ActivityRow
  },
  props: {
    activites: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>
