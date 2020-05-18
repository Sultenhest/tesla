<template>
  <div
    id="tesla"
    class="error-layout antialiased h-full min-h-screen flex flex-col items-stretch bg-gray-200 pb-10"
  >
    <div class="container w-full" :center="true">
      Something went wrong.
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.back()
    }
  }
}
</script>
