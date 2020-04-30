<template>
  <nav class="navigation shadow">
    <div class="mx-auto px-6">
      <div class="relative flex items-center justify-between h-16">
        <nuxt-link to="/">Home</nuxt-link>
        <div v-if="this.$auth.loggedIn">
          <nuxt-link to="/clients">Clients</nuxt-link>
          <nuxt-link to="/dashboard">Dashboard</nuxt-link>
          <nuxt-link to="/logout">Logout</nuxt-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'HeaderNavigation',

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
