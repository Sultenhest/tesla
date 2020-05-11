<template>
  <div>
    <small class="text-sm text-gray-700">{{ header }}</small>
    <div class="flex items-end mt-3">
      <h4 class="text-4xl leading-7">{{ value }}</h4>
      <span
        class="flex text-sm mt-1 ml-4 bg-opacity-50 px-2 py-1 rounded-full"
        :class="getClasses"
      >
        <Icon :icon-name="getIcon" icon-size="sm" />
        {{ percentage }}%
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Stat',
  props: {
    header: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    arrow: {
      type: String,
      default: 'up',
      validator: (value) => {
        return ['up', 'down'].includes(value)
      }
    },
    percentage: {
      type: Number,
      required: true
    }
  },
  computed: {
    getIcon() {
      if (this.arrow === 'down') {
        return 'arrow-thin-down'
      }
      return 'arrow-thin-up'
    },
    getClasses() {
      if (this.arrow === 'down') {
        return 'bg-red-200 text-red-500'
      }
      return 'bg-green-200 text-green-500'
    }
  }
}
</script>

<style scoped></style>
