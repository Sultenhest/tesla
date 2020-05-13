<template>
  <nav class="navigation shadow">
    <div class="mx-auto px-6">
      <div class="relative flex items-center justify-between h-16">
        <nuxt-link to="/" class="text-xl"
          >🐈<span class="text-gray-800 ml-1">Tesla</span></nuxt-link
        >
        <Dropdown />
      </div>
    </div>
  </nav>
</template>

<script>
import Dropdown from '~/components/UI/Dropdown.vue'

export default {
  name: 'HeaderNavigation',
  components: {
    Dropdown
  },
  data() {
    return {}
  }
}
</script>

<style>
.navigation {
  @apply .bg-white;
}
</style>
