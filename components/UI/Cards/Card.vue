<template>
  <div class="card">
    <div class="card-header">
      <div>
        <h3 class="text-xl">{{ title }}</h3>
        <h4 class="text-sm text-gray-700">{{ subTitle }}</h4>
      </div>
      <slot name="button"></slot>
    </div>
    <div class="card-content" :class="{ 'center-content': center }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    center: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.card {
  @apply flex flex-col rounded shadow bg-gray-100;
}

.card-header {
  @apply flex items-center justify-between py-3 px-5 rounded-t bg-white;
}

.card-footer {
  @apply items-center justify-between py-3 px-5 rounded-b bg-white border-t;
}
</style>
