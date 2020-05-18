<template>
  <nav class="navigation shadow">
    <div class="mx-auto px-6">
      <div class="relative flex items-center justify-between h-16">
        <Dropdown align="left" class="lg:hidden">
          <template v-slot:trigger>
            <Icon icon-name="menu" />
          </template>

          <ul class="py-1">
            <li>
              <nuxt-link to="/dashboard">
                Dashboard
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/Clients">
                Clients
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/projects">
                Projects
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/tasks">
                Tasks
              </nuxt-link>
            </li>
          </ul>
        </Dropdown>
        <nuxt-link to="/" class="text-xl">
          <span class="text-gray-800 ml-1">🐈 Tesla</span>
        </nuxt-link>
        <Dropdown>
          <template v-slot:trigger>
            <p class="leading-8 mr-2 hidden lg:block">
              {{ $auth.user.name }}
            </p>
            <img
              class="inline-block h-8 w-8 rounded-full text-white shadow-solid"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              alt=""
            />
          </template>

          <ul class="py-1">
            <li>
              <nuxt-link to="/me">
                Profile
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/activities">
                Activity
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/settings">
                Settings
              </nuxt-link>
            </li>
            <li class="border-t my-1"></li>
            <li>
              <nuxt-link to="/logout">
                Logout
              </nuxt-link>
            </li>
          </ul>
        </Dropdown>
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
