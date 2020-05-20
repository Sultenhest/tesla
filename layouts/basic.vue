<template>
  <div
    id="tesla"
    class="basic-layout antialiased h-full min-h-screen flex flex-col items-stretch bg-gray-200"
  >
    <div class="container">
      <nuxt />
    </div>

    <TeslaFooter class="fixed w-full bottom-0 left-0" />
  </div>
</template>

<script>
import TeslaFooter from '~/components/UI/TeslaFooter.vue'

export default {
  components: {
    TeslaFooter
  }
}
</script>
