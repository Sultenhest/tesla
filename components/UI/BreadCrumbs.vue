<template>
  <div class="level">
    <div class="level-left">
      <div class="level-item">
        <a class="button is-white" @click="$router.back()">
          <b-icon icon="chevron-left" size="is-medium" />
        </a>
      </div>
      <div class="level-item">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li v-for="(item, i) in crumbs" :key="i" :class="item.classes">
              <nuxt-link :to="item.path">
                {{ item.name }}
              </nuxt-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BreadCrumbs',
  computed: {
    crumbs() {
      const crumbs = []
      this.$route.matched.map((item, i, { length }) => {
        const crumb = {}
        crumb.path = item.path
        crumb.name = item.name

        if (i === length - 1) {
          if (item.regex.keys.length > 0) {
            crumbs.push({
              path: item.path.replace(/\/:[^/:]*$/, ''),
              name: item.name
            })
            crumb.path = this.$route.path
            crumb.name = this.$route.name
          }
          crumb.classes = 'is-active'
        }
        crumbs.push(crumb)
      })
      return crumbs
    }
  }
}
</script>
<style scoped>
.container {
  margin: auto;
  width: 50%;
}
</style>
