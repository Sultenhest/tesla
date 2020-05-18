<template>
  <div>
    <Card :title="title" class="mt-4">
      <Table :cols="['Activity', 'Changes', 'At']">
        <ActivityTableBody :activites="activities" />
      </Table>
    </Card>
  </div>
</template>

<script>
import Table from '~/components/UI/Table.vue'
import ActivityTableBody from '~/components/Activities/ActivityTableBody.vue'

export default {
  name: 'ActivityFeed',
  components: {
    Table,
    ActivityTableBody
  },
  props: {
    title: {
      type: String,
      default: 'Activities'
    },
    activities: {
      type: Array,
      required: true
    }
  }
}
</script>
