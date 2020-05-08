<template>
  <tr>
    <td>{{ task.title }}</td>
    <td v-if="withProjectLink">
      <nuxt-link :to="projectLink" class="text-teal-700">{{
        task.project_title
      }}</nuxt-link>
    </td>
    <td><Moment :timestamp="task.completed_at" /></td>
    <td>
      <Moment :timestamp="task.billed_at" />
    </td>
    <td class="text-right button flex justify-end">
      <svgicon
        name="checkmark-outline"
        width="18"
        height="18"
        class="mr-1 mt-05 cursor-pointer"
        @click="toggleCompleted"
      ></svgicon>
      <svgicon
        name="credit-card"
        width="18"
        height="18"
        class="mr-1 mt-05 cursor-pointer"
        @click="toggleBilled"
      ></svgicon>
      <nuxt-link :to="taskLink">
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
  name: 'TasksRow',
  props: {
    id: {
      type: Number,
      required: true
    },
    task: {
      type: Object,
      required: true
    },
    withProjectLink: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    projectLink() {
      return '/projects/' + this.task.project_id
    },
    taskLink() {
      return this.projectLink + '/tasks/' + this.id
    }
  },
  methods: {
    async toggleCompleted() {
      await this.$store
        .dispatch('tasks/toggleCompleted', this.task)
        .then(() => {
          this.refreshProject()
        })
    },
    async toggleBilled() {
      await this.$store.dispatch('tasks/toggleBilled', this.task).then(() => {
        this.refreshProject()
      })
    },
    async refreshProject() {
      await this.$store.dispatch('projects/getProject', this.task.project_id)
    }
  }
}
</script>
