<template>
  <div class="card">
    <div class="card-header">
      <h5 class="text-xl">{{ title }}</h5>
      <div v-if="this.$slots.button">
        <slot name="button"></slot>
      </div>
    </div>
    <div v-if="this.$slots.content" class="card-content">
      <slot name="content"></slot>
    </div>
    <div v-if="this.$slots.table">
      <slot name="table"></slot>
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

.card-content {
  @apply flex flex-col items-center justify-between p-5;
}
</style>
