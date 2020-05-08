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
    </Card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Card from '~/components/UI/Cards/Card.vue'
import Table from '~/components/UI/Table.vue'

import TasksModal from '~/components/Tasks/TasksModal.vue'
import TasksList from '~/components/Tasks/TasksList.vue'

export default {
  components: {
    Card,
    Table,
    TasksModal,
    TasksList
  },
  computed: {
    ...mapGetters('tasks', ['getAllTasks'])
  },
  created() {
    this.$store.dispatch('tasks/getTasks')
  }
}
</script>
