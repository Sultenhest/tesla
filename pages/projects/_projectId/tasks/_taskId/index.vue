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
          <button class="button-primary" @click="toggleCompleted()">
            <Icon icon-name="checkmark-outline" icon-text="Toggle Completed" />
          </button>
          <button class="button-primary" @click="toggleBilled()">
            <Icon icon-name="credit-card" icon-text="Toggle Billed" />
          </button>
          <button class="button-teal" @click="$modal.show('edit-task')">
            <Icon icon-name="edit-pencil" icon-text="Edit Task" />
          </button>
        </div>
      </template>
      <TaskInformation :task="getCurrentTask" />
    </Card>

    <ActivityFeed :activities="getCurrentTask.activity" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ActivityFeed from '~/components/ActivityFeed.vue'

import TaskInformation from '~/components/Tasks/TaskInformation.vue'
import TasksModal from '~/components/Tasks/TasksModal.vue'

export default {
  components: {
    ActivityFeed,
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
      await this.$store.dispatch('tasks/getTask', this.getCurrentTask.id)
    }
  }
}
</script>
