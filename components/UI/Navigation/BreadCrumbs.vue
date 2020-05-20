<template>
  <div
    v-if="this.$route.name !== 'dashboard'"
    class="w-full h-6 button mb-3 cursor-pointer"
  >
    <small class="text-sm text-gray-700" @click="goBack">
      <Icon
        icon-name="arrow-thin-left"
        icon-text="Go Back"
        class="text-black"
      />
    </small>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumbs',
  computed: {
    crumbs() {
      const links = []
      this.$route.path.split('/').forEach((element) => {
        links.push(element)
      })
      return links
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style lang="css" scoped></style>
