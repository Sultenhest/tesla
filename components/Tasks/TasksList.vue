<template>
  <div>
    <p v-if="!tasks" class="card-content">
      You dont seem to have any tasks yet.
    </p>
    <TasksRow
      v-for="task in tasks"
      :id="task.id"
      :key="task.id"
      :task="task"
      :with-project-link="withProjectLink"
    />
  </div>
</template>

<script>
import TasksRow from '~/components/Tasks/TasksRow.vue'

export default {
  name: 'TasksList',
  components: {
    TasksRow
  },
  props: {
    tasks: {
      type: Array,
      required: true,
      default: () => []
    },
    withProjectLink: {
      type: Boolean,
      default: true
    }
  }
}
</script>
