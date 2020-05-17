<template>
  <div
    id="tesla"
    class="default-layout antialiased h-full min-h-screen flex flex-col items-stretch bg-gray-200 pb-10"
  >
    <HeaderNavigation />

    <div class="container flex-col lg:flex-row mt-4 lg:mt-10 px-2">
      <AsideNavigation class="w-full lg:w-1/5" />

      <main class="w-full lg:w-4/5">
        <BreadCrumbs />

        <nuxt />
      </main>
    </div>
  </div>
</template>

<script>
import HeaderNavigation from '~/components/UI/Navigation/HeaderNavigation.vue'
import AsideNavigation from '~/components/UI/Navigation/AsideNavigation.vue'
import BreadCrumbs from '~/components/UI/Navigation/BreadCrumbs.vue'

export default {
  components: {
    HeaderNavigation,
    AsideNavigation,
    BreadCrumbs
  },
  data() {
    return {}
  }
}
</script>
