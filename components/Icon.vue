<template>
  <div>
    <svgicon :name="iconName" width="18" height="18" class="mr-1"></svgicon>
    {{ iconText }}
  </div>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    iconName: {
      type: String,
      default: ''
    },
    iconText: {
      type: String,
      default: ''
    }
  }
}
</script>
<style>
.svg-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  color: inherit;
  vertical-align: middle;
  fill: none;
  stroke: currentColor;
  margin-top: -0.07rem;
}

.svg-fill {
  fill: currentColor;
  stroke: none;
}
</style>
