<template>
  <div class="card">
    <div class="card-header">
      <h3 class="text-xl">{{ title }}</h3>
      <slot name="button"></slot>
    </div>
    <div class="bg-gray-100">
      <ul class="flex">
        <li class="py-3 px-5">First</li>
        <li class="py-3 px-5 text-teal-500 border-teal-500 border-b-2">
          Second
        </li>
        <li class="py-3 px-5">Third</li>
      </ul>
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
