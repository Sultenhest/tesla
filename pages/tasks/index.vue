<template>
  <div>
    <TasksModal name="new-task" title="Create new Task" />

    <TableCard title="Tasks">
      <template v-slot:button>
        <button class="button-teal" @click="$modal.show('new-task')">
          <Icon icon-name="add-outline" icon-text="Add Task" />
        </button>
      </template>
      <template v-slot:content>
        <Table :cols="['Task Title', 'Project', 'Completed', 'Billed', '']">
          <TasksList :tasks="getAllTasks" />
        </Table>
      </template>
    </TableCard>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import TableCard from '~/components/UI/Cards/TableCard.vue'
import Table from '~/components/UI/Table.vue'

import Icon from '~/components/Icon.vue'

import TasksModal from '~/components/Tasks/TasksModal.vue'
import TasksList from '~/components/Tasks/TasksList.vue'

export default {
  components: {
    TableCard,
    Table,
    Icon,
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
