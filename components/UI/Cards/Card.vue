<template>
  <div class="card">
    <div class="card-header">
      <h3 class="text-xl">{{ title }}</h3>
      <slot name="button"></slot>
    </div>
    <div class="card-content">
      <slot name="content"></slot>
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
