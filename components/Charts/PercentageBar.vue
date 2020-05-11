<template>
  <div v-tooltip="tooltip" class="flex flex-col items-center">
    <div class="h-2 w-full border-2 rounded flex bg-red-500">
      <div
        class="h-full rounded-l bg-green-500"
        :style="{ width: greenPercentage + '%' }"
      ></div>
    </div>
    <span v-if="linkText">{{ linkText }}</span>
  </div>
</template>

<script>
export default {
  name: 'PercentageBar',
  props: {
    green: {
      type: Number,
      required: true
    },
    red: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    linkText: {
      type: String,
      default: '',
      required: false
    }
  },
  computed: {
    tooltip() {
      if (this.total === 0) {
        return 'No tasks yet.'
      }
      if (this.red === 0) {
        return 'The project is completed!'
      }
      return (
        'You completed ' +
        this.green +
        ' out of ' +
        this.total +
        ' tasks.<br>' +
        this.red +
        ' more to go!'
      )
    },
    greenPercentage() {
      const percentage = Math.round((this.green / this.total) * 100)
      return Number.isNaN(percentage) ? 0 : percentage
    },
    redPercentage() {
      const percentage = Math.round((this.red / this.total) * 100)
      return Number.isNaN(percentage) ? 0 : percentage
    }
  }
}
</script>

<style>
.tooltip {
  @apply block z-50;
}

.tooltip .tooltip-inner {
  @apply bg-white rounded shadow p-3;
}
</style>
