<template>
  <div>
    <TasksModal
      name="edit-task"
      title="Edit Task"
      :task="getCurrentTask"
      :project-id="getCurrentTask.id"
    />

    <Card :title="getCurrentTask.title" :center="true">
      <template v-slot:button>
        <div>
          <button
            class="button-primary"
            :class="{ 'button-active': getCurrentTask.completed_at }"
            @click="toggleCompleted()"
          >
            <Icon
              icon-name="checkmark-outline"
              :icon-text="
                getCurrentTask.completed_at
                  ? 'Unmark as Completed'
                  : 'Mark as Completed'
              "
            />
          </button>
          <button
            class="button-primary"
            :class="{ 'button-active': getCurrentTask.billed_at }"
            @click="toggleBilled()"
          >
            <Icon
              icon-name="credit-card"
              :icon-text="
                getCurrentTask.billed_at ? 'Unmark as Billed' : 'Mark as Billed'
              "
            />
          </button>
          <button class="button-teal" @click="$modal.show('edit-task')">
            <Icon icon-name="edit-pencil" icon-text="Edit Task" />
          </button>
        </div>
      </template>
      <TaskInformation :task="getCurrentTask" />
    </Card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import TaskInformation from '~/components/Tasks/TaskInformation.vue'
import TasksModal from '~/components/Tasks/TasksModal.vue'

export default {
  components: {
    TaskInformation,
    TasksModal
  },
  async fetch({ store, params }) {
    await store.dispatch('tasks/getTask', [params.projectId, params.taskId])
  },
  computed: {
    ...mapGetters('tasks', ['getCurrentTask'])
  },
  methods: {
    async toggleCompleted() {
      await this.$store
        .dispatch('tasks/toggleCompleted', this.getCurrentTask)
        .then(() => {
          this.refreshTask()
        })
    },
    async toggleBilled() {
      await this.$store
        .dispatch('tasks/toggleBilled', this.getCurrentTask)
        .then(() => {
          this.refreshTask()
        })
    },
    async refreshTask() {
      await this.$store.dispatch('tasks/getTask', [
        this.getCurrentTask.project_id,
        this.getCurrentTask.id
      ])
    }
  }
}
</script>
