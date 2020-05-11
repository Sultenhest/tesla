<template>
  <nuxt-link class="project-link" :to="projectLink">
    <div>
      <h3 class="text-xl">{{ project.title }}</h3>
      <h4 class="text-sm text-gray-700">{{ project.client_name }}</h4>
    </div>
    <Icon icon-name="cheveron-right" />
  </nuxt-link>
</template>

<script>
export default {
  name: 'ProjectsListItem',
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  computed: {
    projectLink() {
      return '/projects/' + this.project.id
    }
  }
}
</script>

<style scoped>
.project-link {
  @apply flex items-center justify-between py-3 px-5 border-t;
}
.project-link:first-child {
  @apply border-none;
}
</style>
