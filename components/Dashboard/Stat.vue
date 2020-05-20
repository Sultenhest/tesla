<template>
  <div class="h-full flex flex-col justify-between">
    <small class="text-sm text-gray-700">{{ header }}</small>
    <div class="block lg:flex items-end mt-3">
      <h4 class="text-4xl leading-7">{{ value }}</h4>
      <span
        class="flex justify-center text-sm mt-3 lg:mt-1 lg:ml-4 bg-opacity-50 px-2 py-1 rounded-full"
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
    percentage: {
      type: Number,
      required: true
    }
  },
  computed: {
    getIcon() {
      if (this.percentage < 0) {
        return 'arrow-thin-down'
      }
      return 'arrow-thin-up'
    },
    getClasses() {
      if (this.percentage < 0) {
        return 'bg-red-200 text-red-500'
      }
      return 'bg-green-200 text-green-500'
    }
  }
}
</script>

<style scoped></style>
