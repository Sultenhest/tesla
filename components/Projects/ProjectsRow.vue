<template>
  <tr>
    <td>
      <nuxt-link :to="projectLink" class="text-teal-700">
        <p>{{ project.title }}</p>
        <div v-if="project.client_id" class="text-teal-700">
          <nuxt-link :to="clientLink">
            <small class="text-sm text-gray-700">Client:</small>
            <small class="text-sm">
              {{ project.client_name }}
            </small>
          </nuxt-link>
        </div>
      </nuxt-link>
    </td>
    <td>
      <div class="text-teal-700">
        <nuxt-link :to="tasksLink">
          <PercentageBar
            :green="project.completed_tasks"
            :red="project.incompleted_tasks"
            :total="project.tasks_count"
            link-text="Go to Tasks"
          />
        </nuxt-link>
      </div>
    </td>
  </tr>
</template>

<script>
import PercentageBar from '~/components/Charts/PercentageBar.vue'

export default {
  name: 'ProjectsRow',
  components: {
    PercentageBar
  },
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
