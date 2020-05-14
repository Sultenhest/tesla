<template>
  <div>
    <TasksModal name="new-task" title="Create new Task" />

    <Card title="Tasks">
      <template v-slot:button>
        <button class="button-teal" @click="$modal.show('new-task')">
          <Icon icon-name="add-outline" icon-text="Add Task" />
        </button>
      </template>
      <Table :cols="['Task Title', 'Project', 'Completed', 'Billed', '']">
        <TasksList :tasks="getAllTasks" />
      </Table>
      <div class="card-footer">
        <Pagination base="tasks" :meta="getMeta" />
      </div>
    </Card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Table from '~/components/UI/Table.vue'

import TasksModal from '~/components/Tasks/TasksModal.vue'
import TasksList from '~/components/Tasks/TasksList.vue'
import Pagination from '~/components/UI/Navigation/Pagination.vue'

export default {
  components: {
    Table,
    TasksModal,
    TasksList,
    Pagination
  },
  fetch({ store, params }) {
    store.dispatch('tasks/getTasks')
  },
  computed: {
    ...mapGetters('tasks', ['getAllTasks', 'getMeta'])
  }
}
</script>
