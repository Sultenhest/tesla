<template>
  <div
    id="tesla"
    class="default-layout antialiased h-full min-h-screen flex flex-col items-stretch bg-gray-200 pb-10"
  >
    <HeaderNavigation />

    <div class="container mt-10">
      <AsideNavigation />

      <main class="w-4/5">
        <nuxt />
      </main>
    </div>
  </div>
</template>

<script>
import HeaderNavigation from '~/components/UI/HeaderNavigation.vue'
import AsideNavigation from '~/components/UI/AsideNavigation.vue'

export default {
  components: {
    HeaderNavigation,
    AsideNavigation
  },
  data() {
    return {}
  }
}
</script>
