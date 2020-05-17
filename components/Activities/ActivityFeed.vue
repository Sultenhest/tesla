<template>
  <div>
    <Card :title="title" class="mt-4">
      <Table :cols="['Activity', 'Changes', 'At']">
        <tbody>
          <tr
            v-for="activity in activities"
            :key="activity.id"
            @click="$modal.show('activity-info', { activity: activity })"
          >
            <td>
              {{ activity.echo_description }}
            </td>
            <td>
              {{ listChanges(activity.changes) }}
            </td>
            <td>
              <Moment :timestamp="activity.created_at" />
            </td>
          </tr>
        </tbody>
      </Table>
      <div class="card-footer">
        <slot></slot>
      </div>
    </Card>
  </div>
</template>

<script>
import Table from '~/components/UI/Table.vue'

export default {
  name: 'ActivityFeed',
  components: {
    Table
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
  },
  methods: {
    listChanges(changes) {
      if (changes == null) {
        return ''
      }
      const str = Object.keys(changes.before).toString()
      return str.replace(/(.*),(.*)$/, '$1 and $2')
    }
  }
}
</script>
