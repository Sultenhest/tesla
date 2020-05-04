<template>
  <div>
    <modal name="new-task" height="auto">
      <Card title="Create new Task">
        <template v-slot:button>
          <button class="button" @click="$modal.hide('new-task')">
            <Icon icon-name="close" icon-text="Close" />
          </button>
        </template>
        <template v-slot:content>
          <TasksForm
            :project-id="getCurrentProject.id"
            @taskFormSubmitted="refreshProject()"
          />
        </template>
      </Card>
    </modal>

    <TableCard class="mt-4" :title="tableHeader">
      <template v-slot:button>
        <button class="button-teal" @click="$modal.show('new-task')">
          <Icon icon-name="add-outline" icon-text="Add Task to Project" />
        </button>
      </template>
      <template v-slot:content>
        <Table :cols="['Task Title', 'Completed', 'Billed', '']">
          <TasksList
            :tasks="getCurrentProject.tasks"
            :with-project-link="false"
          />
        </Table>
      </template>
    </TableCard>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Card from '~/components/UI/Cards/Card.vue'
import TableCard from '~/components/UI/Cards/TableCard.vue'
import Table from '~/components/UI/Table.vue'

import Icon from '~/components/Icon.vue'

import TasksForm from '~/components/Tasks/TasksForm.vue'
import TasksList from '~/components/Tasks/TasksList.vue'

export default {
  components: {
    Card,
    TableCard,
    Table,
    Icon,
    TasksForm,
    TasksList
  },
  async fetch({ store, params }) {
    await store.dispatch('projects/getProject', params.projectId)
  },
  computed: {
    ...mapGetters('projects', ['getCurrentProject']),
    tableHeader() {
      return this.getCurrentProject.title + ' tasks'
    }
  },
  methods: {
    async refreshProject() {
      await this.$store.dispatch(
        'projects/getProject',
        this.getCurrentProject.id
      )
    }
  }
}
</script>
