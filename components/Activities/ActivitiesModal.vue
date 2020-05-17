<template>
  <modal name="activity-info" height="auto" @before-open="setCurrentActivity">
    <Card title="Activity Information" :center="true">
      <template v-slot:button>
        <button class="button" @click="$modal.hide('activity-info')">
          <Icon icon-name="close" icon-text="Close" />
        </button>
      </template>
      <ActivityInformation :activity="currentActivity" />
    </Card>
  </modal>
</template>

<script>
import ActivityInformation from '~/components/Activities/ActivityInformation.vue'

export default {
  name: 'ActivitiesModal',
  components: {
    ActivityInformation
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
    }
  }
}
</script>

<style lang="css" scoped></style>
