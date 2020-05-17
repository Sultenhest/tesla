<template>
  <div class="w-full">
    <div class="flex">
      <div class="w-1/2 p-3">
        <small class="text-sm text-gray-700">Activity Description</small>
        <p class="mt-3">{{ activity.echo_description }}</p>
      </div>
      <div class="w-1/2 p-3">
        <small class="text-sm text-gray-700">Activity Timestamp</small>
        <p class="mt-3"><Moment :timestamp="activity.created_at" /></p>
      </div>
    </div>

    <div v-if="activity.changes" class="w-full p-3">
      <small class="text-sm text-gray-700">Activity Changes</small>
      <div class="flex">
        <div class="w-1/2 pr-2">
          <small class="text-sm text-gray-700">Before</small>
          <p class="mt-3">{{ activity.changes.before }}</p>
        </div>
        <div class="w-1/2 pl-2">
          <small class="text-sm text-gray-700">After</small>
          <p class="mt-3">{{ activity.changes.after }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivityInformation',
  props: {
    activity: {
      type: Object,
      required: true,
      default: () => null
    }
  }
}
</script>
