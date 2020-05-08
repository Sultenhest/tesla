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

    <Card
      :title="getCurrentProject.title"
      :sub-title="getCurrentProject.client_name"
      :center="true"
    >
      <template v-slot:button>
        <button class="button-teal" @click="$modal.show('edit-project')">
          <Icon icon-name="edit-pencil" icon-text="Edit Project" />
        </button>
      </template>
      <ProjectInformation :project="getCurrentProject" />
    </Card>

    <TasksModal
      name="new-task"
      title="Create new Task"
      :project-id="getCurrentProject.id"
      @taskFormSubmitted="refreshProject()"
    />

    <Card class="mt-4" title="Project Tasks">
      <template v-slot:button>
        <button class="button-teal" @click="$modal.show('new-task')">
          <Icon icon-name="add-outline" icon-text="Add Task to Project" />
        </button>
      </template>
      <Table :cols="['Task Title', 'Completed', 'Billed', '']">
        <TasksList
          :tasks="getCurrentProject.tasks"
          :with-project-link="false"
        />
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

    <ActivityFeed :activities="getCurrentProject.activity" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ActivityFeed from '~/components/ActivityFeed.vue'

import Card from '~/components/UI/Cards/Card.vue'
import Table from '~/components/UI/Table.vue'

import Icon from '~/components/Icon.vue'

import ProjectInformation from '~/components/Projects/ProjectInformation.vue'
import ProjectsModal from '~/components/Projects/ProjectsModal.vue'

import TasksModal from '~/components/Tasks/TasksModal.vue'
import TasksList from '~/components/Tasks/TasksList.vue'

export default {
  components: {
    ActivityFeed,
    Card,
    Table,
    Icon,
    ProjectInformation,
    ProjectsModal,
    TasksModal,
    TasksList
  },
  async fetch({ store, params }) {
    await store.dispatch('projects/getProject', params.projectId)
  },
  computed: {
    ...mapGetters('projects', ['getCurrentProject']),
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
