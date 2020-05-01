<template>
  <aside class="w-1/5">
    <ul class="space-y-3">
      <li>
        <nuxt-link to="/dashboard"
          ><Icon icon-name="browser-window-open" />Dashboard</nuxt-link
        >
      </li>
      <li>
        <nuxt-link to="/clients"
          ><Icon icon-name="user-group" />Clients</nuxt-link
        >
      </li>
      <li>
        <nuxt-link to="/projects"
          ><Icon icon-name="view-carousel" />Projects</nuxt-link
        >
      </li>
      <li>
        <nuxt-link to="/tasks"><Icon icon-name="checkmark" />Tasks</nuxt-link>
      </li>
      <li class="h-1"></li>
      <li>
        <nuxt-link to="/activities"
          ><Icon icon-name="stroke-width" />Activity</nuxt-link
        >
      </li>
      <li>
        <nuxt-link to="/me"><Icon icon-name="user" />Profile</nuxt-link>
      </li>
    </ul>
  </aside>
</template>

<script>
import Icon from '~/components/Icon.vue'

export default {
  name: 'AsideNavigation',
  components: {
    Icon
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
a {
  @apply flex items-center opacity-75;
}

.nuxt-link-active,
.text-teal-600 {
  @apply opacity-100;
}
</style>
