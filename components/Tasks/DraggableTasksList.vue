<template>
  <tbody>
    <p v-if="!getProjectTasks" class="card-content">
      You dont seem to have any tasks yet.
    </p>
    <Draggable
      v-model="getProjectTasks"
      v-bind="dragOptions"
      @end="changeOrder"
    >
      <transition-group>
        <TasksRow
          v-for="task in getProjectTasks"
          :id="task.id"
          :key="task.id"
          :task="task"
          :with-project-link="withProjectLink"
        />
      </transition-group>
    </Draggable>
  </tbody>
</template>

<script>
// import { mapGetters } from 'vuex'
import TasksRow from '~/components/Tasks/TasksRow.vue'

export default {
  name: 'DraggableTasksList',
  components: {
    TasksRow
  },
  props: {
    withProjectLink: {
      type: Boolean,
      default: true
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('projects/getProject', params.projectId)
  },
  computed: {
    getProjectTasks: {
      get() {
        return this.$store.state.projects.projectTasks
      },
      set(tasks) {
        this.$store.commit('projects/setProjectTasks', tasks)
      }
    },
    dragOptions() {
      return {
        animation: 0,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
    // ...mapGetters('projects', ['getProjectTasks'])
  },
  methods: {
    changeOrder(data) {
      console.log(data)
    }
  }
}
</script>

<style>
.ghost {
  @apply opacity-50;
}
</style>
