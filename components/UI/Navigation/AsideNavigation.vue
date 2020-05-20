<template>
  <aside class="hidden lg:block">
    <div class="h-6 mb-3"></div>
    <ul class="space-y-3">
      <li>
        <nuxt-link to="/dashboard">
          <Icon
            icon-name="browser-window-open"
            icon-size="lg"
            class="mr-3"
          />Dashboard
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/clients">
          <Icon icon-name="user-group" icon-size="lg" class="mr-3" />Clients
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/projects">
          <Icon icon-name="view-carousel" icon-size="lg" class="mr-3" />Projects
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/tasks">
          <Icon icon-name="checkmark" icon-size="lg" class="mr-3" />Tasks
        </nuxt-link>
      </li>
      <li class="h-1"></li>
      <li>
        <nuxt-link to="/activities">
          <Icon icon-name="view-tile" icon-size="lg" class="mr-3" />Activity
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/me">
          <Icon icon-name="user" icon-size="lg" class="mr-3" />Profile
        </nuxt-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'AsideNavigation',
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
.text-teal-700 {
  @apply opacity-100;
}
</style>
