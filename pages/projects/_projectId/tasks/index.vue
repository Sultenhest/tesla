<template>
  <div>
    <TasksModal
      name="new-task"
      title="Create new Task"
      :project-id="getCurrentProject.id"
      @taskFormSubmitted="refreshProject()"
    />

    <div class="block lg:flex">
      <Card class="w-full lg:w-4/6 mr-4 mb-4 lg:mb-0" :title="tableHeader">
        <template v-slot:button>
          <button class="button-teal" @click="$modal.show('new-task')">
            <Icon icon-name="add-outline" icon-text="Add Task to Project" />
          </button>
        </template>
        <Table :cols="['Task Title', '']">
          <DraggableTasksList :with-project-link="false" />
        </Table>
      </Card>

      <div class="lg:w-2/6">
        <Card class="w-full" :title="getCurrentProject.title" :center="true">
          <template v-slot:button>
            <button class="button-teal">
              <nuxt-link :to="projectLink">
                <Icon
                  icon-name="view-carousel"
                  icon-text="Go to Project"
                  class="text-white"
                />
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Table from '~/components/UI/Table.vue'

import TasksModal from '~/components/Tasks/TasksModal.vue'
import DraggableTasksList from '~/components/Tasks/DraggableTasksList.vue'

export default {
  components: {
    Table,
    TasksModal,
    DraggableTasksList
  },
  async fetch({ store, params }) {
    await store.dispatch('projects/getProject', params.projectId)
  },
  computed: {
    ...mapGetters('projects', ['getCurrentProject']),
    tableHeader() {
      return this.getCurrentProject.title + ' tasks'
    },
    projectLink() {
      return '/projects/' + this.getCurrentProject.id
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
