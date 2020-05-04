<template>
  <div class="card">
    <div class="card-header">
      <h5 class="text-xl">{{ title }}</h5>
      <slot name="button"></slot>
    </div>
    <div>
      <slot name="content"></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
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
