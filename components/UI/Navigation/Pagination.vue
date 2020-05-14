<template>
  <nav class="flex items-center justify-between">
    <span class="w-24">
      <nuxt-link v-if="!isFirstPage" :to="prev">
        <Icon icon-name="arrow-thin-left" icon-text="Previous" />
      </nuxt-link>
    </span>
    <p class="text-sm text-gray-700">
      Showing {{ meta.from }} to {{ meta.to }} of {{ meta.total }} results
    </p>
    <span class="w-24 text-right">
      <nuxt-link v-if="!currentPageIsLastPage" :to="next">
        <Icon
          icon-name="arrow-thin-right"
          icon-text="Next"
          icon-align="right"
        />
      </nuxt-link>
    </span>
    <!--
    <nuxt-link v-for="index in meta.last_page" :key="index" :to="'/activites/' + index">{{
      index
    }}</nuxt-link>
    -->
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    base: {
      type: String,
      default: ''
    },
    meta: {
      type: [Array, Object],
      required: true,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  computed: {
    isFirstPage() {
      return this.meta.current_page === 1
    },
    currentPageIsLastPage() {
      return this.meta.current_page === this.meta.last_page
    },
    prev() {
      return '/' + this.base + '?page=' + (this.meta.current_page - 1)
    },
    next() {
      if (this.currentPageIsLastPage) return ''
      return '/' + this.base + '?page=' + (this.meta.current_page + 1)
    }
  }
}
</script>
