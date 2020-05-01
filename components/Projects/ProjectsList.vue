<template>
  <tbody>
    <p v-if="!projects" class="card-content">
      You dont seem to have any projects yet.
    </p>
    <ProjectsRow
      v-for="project in projects"
      :id="project.id"
      :key="project.id"
      :project="project"
    />
  </tbody>
</template>

<script>
import ProjectsRow from '~/components/Projects/ProjectsRow.vue'

export default {
  name: 'ProjectsList',
  components: {
    ProjectsRow
  },
  props: {
    projects: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>
