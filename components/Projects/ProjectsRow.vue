<template>
  <tr>
    <td>
      <nuxt-link :to="projectLink" class="text-teal-700">{{
        project.title
      }}</nuxt-link>
    </td>
    <td>
      <div v-if="project.client_id" class="text-teal-700">
        <nuxt-link :to="clientLink">{{ project.client_name }}</nuxt-link>
      </div>
    </td>
    <td>
      <div class="text-teal-700">
        <nuxt-link :to="tasksLink">{{ project.tasks_count }}</nuxt-link>
      </div>
    </td>
    <td class="text-right button flex justify-end">
      <nuxt-link :to="projectLink">
        <svgicon
          name="information-outline"
          width="18"
          height="18"
          class="mr-1"
        ></svgicon>
      </nuxt-link>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'ProjectsRow',
  props: {
    id: {
      type: Number,
      required: true
    },
    project: {
      type: Object,
      required: true
    }
  },
  computed: {
    projectLink() {
      return '/projects/' + this.id
    },
    clientLink() {
      if (this.project.client_id) {
        return '/clients/' + this.project.client_id
      }
      return ''
    },
    tasksLink() {
      return this.projectLink + '/tasks'
    }
  }
}
</script>
