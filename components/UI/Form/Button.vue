<template>
  <div class="button">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Button',
  data() {
    return {}
  }
}
</script>

<style lang="css" scoped>
.button {
  @apply py-1 px-2 rounded text-sm text-white bg-teal-700;
}
</style>
