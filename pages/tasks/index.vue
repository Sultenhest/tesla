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
          Showing 1 to {{ getMeta.to }} of {{ getMeta.total }} results
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
    store.dispatch('tasks/getTasks', 1)
  },
  data() {
    return {
      noMoreData: false
    }
  },
  computed: {
    ...mapGetters('tasks', ['getTasks', 'getMeta']),
    currentPageIsLastPage() {
      return this.getMeta.current_page === this.getMeta.last_page
    }
  },
  methods: {
    loadMore() {
      if (!this.currentPageIsLastPage) {
        this.$store.dispatch('tasks/getTasks', this.getMeta.current_page + 1)
      }
    }
  }
}
</script>
