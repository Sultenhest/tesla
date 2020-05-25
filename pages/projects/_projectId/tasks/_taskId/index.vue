<template>
  <div>
    <TasksModal
      name="edit-task"
      title="Edit Task"
      :task="getCurrentTask"
      :project-id="getCurrentTask.id"
    />

    <div class="block lg:flex">
      <Card
        class="w-full lg:w-4/6 mr-4 mb-4 lg:mb-0"
        :title="getCurrentTask.title"
        :center="true"
      >
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
                  getCurrentTask.billed_at
                    ? 'Unmark as Billed'
                    : 'Mark as Billed'
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

      <Card
        class="w-full lg:w-2/6"
        :title="getCurrentProject.title"
        :center="true"
      >
        <template v-slot:button>
          <button class="button-teal">
            <nuxt-link :to="projectLink">
              <Icon icon-name="view-carousel" icon-text="Go to Project" />
            </nuxt-link>
          </button>
        </template>
        <div class="w-full p-3">
          <small class="text-sm text-gray-700">Project Description</small>
          <p class="mt-3">{{ getCurrentProject.description }}</p>
        </div>
      </Card>
    </div>
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
  fetch({ store, params }) {
    store.dispatch('projects/fetchProject', params.projectId)
    store.dispatch('tasks/fetchTask', [params.projectId, params.taskId])
  },
  computed: {
    ...mapGetters({
      getCurrentProject: 'projects/getCurrentProject',
      getCurrentTask: 'tasks/getCurrentTask'
    }),
    projectLink() {
      return '/projects/' + this.getCurrentProject.id
    }
  },
  methods: {
    toggleCompleted() {
      this.$store
        .dispatch('tasks/toggleCompleted', this.getCurrentTask)
        .then(() => {
          this.refreshTask()
        })
    },
    toggleBilled() {
      this.$store
        .dispatch('tasks/toggleBilled', this.getCurrentTask)
        .then(() => {
          this.refreshTask()
        })
    },
    refreshTask() {
      this.$store.dispatch('tasks/fetchTask', [
        this.getCurrentTask.project_id,
        this.getCurrentTask.id
      ])
    }
  }
}
</script>
