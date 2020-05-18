<template>
  <tr @click="$modal.show('activity-info', { activity: activity })">
    <td>
      {{ activity.subject_type }}
    </td>
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
</template>

<script>
export default {
  name: 'ActivityRow',
  props: {
    activity: {
      type: Object,
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
