<template>
  <div>
    <TasksModal name="new-task" title="Create new Task" />

    <Card title="Tasks">
      <Table :cols="['Task Title', 'Project', '']">
        <TasksList :tasks="getTasks" />
      </Table>
      <div class="card-footer flex flex-col">
        <button
          v-if="!currentPageIsLastPage"
          class="button-primary mb-2"
          @click="loadMore"
        >
          Load more
        </button>
        <p class="text-sm text-center text-gray-700">
          Showing 1 to {{ getTasksMeta.to }} of {{ getTasksMeta.total }} results
        </p>
      </div>
    </Card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Table from '~/components/UI/Table.vue'

import TasksModal from '~/components/Tasks/TasksModal.vue'
import TasksList from '~/components/Tasks/TasksList.vue'

export default {
  components: {
    Table,
    TasksModal,
    TasksList
  },
  fetch({ store }) {
    store.dispatch('tasks/fetchTasks', { page: 1 })
  },
  data() {
    return {
      noMoreData: false
    }
  },
  computed: {
    ...mapGetters('tasks', ['getTasks', 'getTasksMeta']),
    currentPageIsLastPage() {
      return this.getTasksMeta.current_page === this.getTasksMeta.last_page
    }
  },
  methods: {
    loadMore() {
      if (!this.currentPageIsLastPage) {
        this.$store.dispatch('tasks/fetchTasks', {
          page: this.getTasksMeta.current_page + 1
        })
      }
    }
  }
}
</script>
