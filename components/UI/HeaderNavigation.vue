<template>
  <nav class="navigation shadow">
    <div class="mx-auto px-6">
      <div class="relative flex items-center justify-between h-16">
        <nuxt-link to="/">🐈<strong>Tesla</strong></nuxt-link>
        <nuxt-link to="/logout" class="flex"
          ><p class="leading-8 mr-2">{{ $auth.user.name }}</p>
          <img
            class="inline-block h-8 w-8 rounded-full text-white shadow-solid"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
            alt=""
        /></nuxt-link>
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
