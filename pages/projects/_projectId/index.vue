<template>
  <div>
    <ProjectsModal
      name="edit-project"
      title="Edit Project"
      :project="getCurrentProject"
    />

    <button class="button mb-3">
      <nuxt-link to="/projects">
        <Icon icon-name="arrow-thin-left" icon-text="Back" class="text-black" />
      </nuxt-link>
    </button>

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
      <Table :cols="['Task Title', 'Completed', 'Billed', '']">
        <TasksList :tasks="recentProjects" :with-project-link="false" />
      </Table>
      <div class="center-content">
        <nuxt-link :to="projectTasksLink" class="text-teal-700">
          <Icon
            icon-name="checkmark-outline"
            icon-text="Go to All Project Tasks"
          />
        </nuxt-link>
      </div>
    </Card>

    <ActivitiesModal />

    <ActivityFeed :activities="getCurrentProject.activity" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ActivitiesModal from '~/components/Activities/ActivitiesModal.vue'
import ActivityFeed from '~/components/Activities/ActivityFeed.vue'

import Table from '~/components/UI/Table.vue'

import ProjectInformation from '~/components/Projects/ProjectInformation.vue'
import ProjectsModal from '~/components/Projects/ProjectsModal.vue'

import TasksModal from '~/components/Tasks/TasksModal.vue'
import TasksList from '~/components/Tasks/TasksList.vue'

export default {
  components: {
    ActivitiesModal,
    ActivityFeed,
    Table,
    ProjectInformation,
    ProjectsModal,
    TasksModal,
    TasksList
  },
  async fetch({ store, params }) {
    await store.dispatch('projects/getProject', params.projectId)
  },
  computed: {
    ...mapGetters({
      getCurrentProject: 'projects/getCurrentProject',
      getCurrentClient: 'clients/getCurrentClient'
    }),
    projectClientLink() {
      return '/clients/' + this.getCurrentProject.client_id
    },
    recentProjects() {
      const tasksClones = [...this.getCurrentProject.tasks]
      return tasksClones.splice(0, 3)
    },
    projectTasksLink() {
      return '/projects/' + this.getCurrentProject.id + '/tasks'
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
