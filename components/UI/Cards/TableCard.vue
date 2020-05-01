<template>
  <div class="card">
    <div class="card-header">
      <h5 class="text-xl">{{ title }}</h5>
      <slot name="button"></slot>
    </div>
    <div>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableCard',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  }
}
</script>

<style>
.card {
  @apply flex flex-col rounded shadow bg-gray-100;
}

.card-header {
  @apply flex items-center justify-between py-3 px-5 rounded-t bg-white;
}
</style>
