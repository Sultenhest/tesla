<template>
  <div class="dropdown">
    <div class="dropdown-toggle" @click.prevent="toggleOpen">
      <p class="leading-8 mr-2">
        {{ $auth.user.name }}
      </p>
      <img
        class="inline-block h-8 w-8 rounded-full text-white shadow-solid"
        :class="{ 'border-2 border-gray-400': isOpen }"
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
        alt=""
      />
    </div>

    <transition name="dropdown-menu" mode="out-in">
      <div v-show="isOpen" class="dropdown-menu" @click.prevent="toggleOpen">
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
          <li>
            <nuxt-link to="/logout">
              Logout
            </nuxt-link>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  data() {
    return {
      isOpen: false
    }
  },
  watch: {
    isOpen(isOpen) {
      if (isOpen) {
        document.addEventListener('click', this.closeIfClickedOutside)
      }
    }
  },
  mounted() {
    this.isOpen = false
  },
  methods: {
    toggleOpen() {
      return (this.isOpen = !this.isOpen)
    }
  }
}
</script>

<style scoped>
.dropdown {
  @apply relative cursor-pointer;
}
.dropdown-toggle {
  @apply flex;
}
.dropdown-menu {
  @apply w-48 absolute right-0 bg-white rounded shadow;
  @apply origin-top-right;
  top: 2.5rem;
}
.dropdown-menu-enter-active {
  @apply transform transition duration-100 ease-out opacity-0 scale-95;
}
.dropdown-menu-enter-to {
  @apply transform opacity-100 scale-100;
}
.dropdown-menu-leave-active {
  @apply transform transition duration-75 ease-in opacity-100 scale-100;
}
.dropdown-menu-leave-to {
  @apply transform opacity-0 scale-95;
}
.dropdown-menu a {
  @apply block px-4 py-2;
}
.dropdown-menu li {
  @apply transition duration-300 ease-in-out;
}
.dropdown-menu li:hover {
  @apply bg-gray-200;
}
</style>
