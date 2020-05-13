<template>
  <div>
    <span v-if="iconAlign === 'right'">{{ iconText }}</span>
    <svgicon
      :name="iconName"
      :width="getSize"
      :height="getSize"
      class="mr-1"
    ></svgicon>
    <span v-if="iconAlign === 'left'">{{ iconText }}</span>
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
    iconSize: {
      type: String,
      default: 'md',
      validator: (value) => {
        return ['sm', 'md', 'lg'].includes(value)
      }
    },
    iconText: {
      type: String,
      default: ''
    },
    iconAlign: {
      type: String,
      default: 'left',
      validator: (value) => {
        return ['left', 'right'].includes(value)
      }
    }
  },
  computed: {
    getSize() {
      let size = '18'
      switch (this.iconSize) {
        case 'sm':
          size = '15'
          break
        case 'lg':
          size = '20'
          break
        default:
      }
      return size
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
