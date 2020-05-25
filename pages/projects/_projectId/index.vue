<template>
  <div>
    <ProjectsModal
      name="edit-project"
      title="Edit Project"
      :project="getCurrentProject"
    />

    <div class="block lg:flex">
      <Card
        class="w-full lg:w-4/6 mr-4 mb-4 lg:mb-0"
        :title="getCurrentProject.title"
        :center="true"
      >
        <template v-slot:button>
          <button class="button-teal" @click="$modal.show('edit-project')">
            <Icon icon-name="edit-pencil" icon-text="Edit Project" />
          </button>
        </template>
        <ProjectInformation :project="getCurrentProject" />
      </Card>

      <Card
        v-if="hasClient"
        class="w-full lg:w-2/6"
        :title="getCurrentClient.name"
        :center="true"
      >
        <template v-slot:button>
          <button class="button-teal">
            <nuxt-link :to="projectClientLink">
              <Icon icon-name="user-group" icon-text="Go to Client" />
            </nuxt-link>
          </button>
        </template>
        <div class="w-full p-3">
          <small class="text-sm text-gray-700">Client Description</small>
          <p class="mt-3">{{ getCurrentClient.description }}</p>
        </div>
      </Card>

      <Card
        v-else
        class="w-full lg:w-2/6"
        title="Client has been trashed"
        :center="true"
      >
        <div class="flex items-center justify-between flex-col py-5">
          This project's client has been trashed.

          <nuxt-link to="/clients/trashed" class="button-teal mt-3">
            Go here to restore it
          </nuxt-link>
        </div>
      </Card>
    </div>

    <TasksModal
      name="new-task"
      title="Create new Task"
      :project-id="getCurrentProject.id"
      @taskFormSubmitted="refreshProject()"
    />

    <Card class="mt-4" title="Most Recent Project Tasks">
      <template v-slot:button>
        <button class="button-teal" @click="$modal.show('new-task')">
          <Icon icon-name="add-outline" icon-text="Add Task to Project" />
        </button>
      </template>
      <Table :cols="['Task Title', '']">
        <TasksList :tasks="recentTasks" :with-project-link="false" />
      </Table>
      <div class="center-content">
        <nuxt-link :to="projectTasksLink" class="flex text-teal-700">
          <Icon icon-name="checkmark-outline" class="mr-1" />
          Go to All Project Tasks
        </nuxt-link>
      </div>
    </Card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Table from '~/components/UI/Table.vue'

import ProjectInformation from '~/components/Projects/ProjectInformation.vue'
import ProjectsModal from '~/components/Projects/ProjectsModal.vue'

import TasksModal from '~/components/Tasks/TasksModal.vue'
import TasksList from '~/components/Tasks/TasksList.vue'

export default {
  components: {
    Table,
    ProjectInformation,
    ProjectsModal,
    TasksModal,
    TasksList
  },
  fetch({ store, params }) {
    store.dispatch('projects/fetchProject', params.projectId)
    store.dispatch('tasks/fetchTasks', { page: 1, project: params.projectId })
  },
  computed: {
    ...mapGetters({
      getCurrentProject: 'projects/getCurrentProject',
      getCurrentTasks: 'tasks/getTasks',
      getCurrentClient: 'clients/getCurrentClient'
    }),
    hasClient() {
      return typeof this.getCurrentClient.name !== 'undefined'
    },
    projectClientLink() {
      return '/clients/' + this.getCurrentProject.client_id
    },
    recentTasks() {
      /*
      const tasksClones = [...this.getCurrentTasks]
      return tasksClones
      */
      return this.getCurrentTasks
    },
    projectTasksLink() {
      return '/projects/' + this.getCurrentProject.id + '/tasks'
    }
  },
  methods: {
    refreshProject() {
      this.$store.dispatch('projects/fetchProject', this.getCurrentProject.id)
      this.$store.dispatch(
        'projects/fetchProjectTasks',
        this.getCurrentProject.id
      )
    }
  }
}
</script>
