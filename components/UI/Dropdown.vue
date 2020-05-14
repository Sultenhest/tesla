<template>
  <div class="dropdown">
    <div class="dropdown-toggle" @click.prevent="toggleOpen">
      <slot name="trigger"></slot>
    </div>

    <transition name="dropdown-menu" mode="out-in">
      <div
        v-show="isOpen"
        class="dropdown-menu"
        :class="align === 'left' ? 'left-0' : 'right-0'"
        @click.prevent="toggleOpen"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    align: { type: String, default: 'right' }
  },
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

<style>
.dropdown {
  @apply relative cursor-pointer;
}
.dropdown-toggle {
  @apply flex;
}
.dropdown-menu {
  @apply w-48 absolute bg-white rounded shadow;
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
