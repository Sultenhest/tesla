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

    <Card title="Activities" class="mt-4">
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
    </Card>
  </div>
</template>

<script>
import Icon from '~/components/Icon.vue'
import Card from '~/components/UI/Cards/Card.vue'
import Table from '~/components/UI/Table.vue'

export default {
  name: 'ActivityFeed',
  components: {
    Icon,
    Card,
    Table
  },
  props: {
    activities: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentActivity: {
        changes: null
      }
    }
  },
  methods: {
    setCurrentActivity(event) {
      this.currentActivity = event.params.activity
    },
    listChanges(changes) {
      const str = Object.keys(changes.before).toString()
      return str.replace(/(.*),(.*)$/, '$1 and $2')
    }
  }
}
</script>
