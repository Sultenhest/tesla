<template>
  <span v-if="timestamp">{{ $moment(timestamp).fromNow() }}</span>
</template>

<script>
export default {
  name: 'Moment',
  props: {
    timestamp: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
