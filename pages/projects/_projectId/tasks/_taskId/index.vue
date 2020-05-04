<template>
  <div>
    <modal name="edit-task" height="auto">
      <Card title="Edit Task">
        <template v-slot:button>
          <button class="button" @click="$modal.hide('edit-task')">
            <Icon icon-name="close" icon-text="Close" />
          </button>
        </template>
        <template v-slot:content>
          <TasksForm
            :task="getCurrentTask"
            :project-id="getCurrentTask.project_id"
          />
        </template>
      </Card>
    </modal>

    <button class="button mb-3">
      <nuxt-link to="/tasks">
        <Icon icon-name="arrow-thin-left" icon-text="Back" class="text-black" />
      </nuxt-link>
    </button>

    <Card :title="getCurrentTask.title">
      <template v-slot:button>
        <button class="button-teal" @click="$modal.show('edit-task')">
          <Icon icon-name="edit-pencil" icon-text="Edit Task" />
        </button>
      </template>
      <template v-slot:content>
        {{ getCurrentTask }}
        <button class="button-danger" @click="trash(getCurrentTask)">
          <Icon icon-name="trash" icon-text="Trash" />
        </button>
      </template>
    </Card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Card from '~/components/UI/Cards/Card.vue'
import Icon from '~/components/Icon.vue'
import TasksForm from '~/components/Tasks/TasksForm.vue'

export default {
  components: {
    Card,
    Icon,
    TasksForm
  },
  async fetch({ store, params }) {
    await store.dispatch('tasks/getTask', [params.projectId, params.taskId])
  },
  computed: {
    ...mapGetters('tasks', ['getCurrentTask'])
  },
  methods: {
    async trash(task) {
      await this.$swal({
        title: 'Are you sure you want to trash this task?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('tasks/trashTask', task)
        }
      })
    }
  }
}
</script>
