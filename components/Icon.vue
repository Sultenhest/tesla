<template
  ><svgicon :name="iconName" width="18" height="18" class="mr-2"></svgicon
></template>

<script>
export default {
  name: 'Icon',
  props: {
    iconName: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped>
.svg-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  color: inherit;
  vertical-align: middle;
  fill: none;
  stroke: currentColor;
}

.svg-fill {
  fill: currentColor;
  stroke: none;
}
</style>
