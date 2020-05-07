<template>
  <div>
    <modal name="edit-project" height="auto">
      <Card title="Edit Project">
        <template v-slot:button>
          <button class="button" @click="$modal.hide('edit-project')">
            <Icon icon-name="close" icon-text="Close" />
          </button>
        </template>
        <template v-slot:content>
          <ProjectsForm :project="getCurrentProject" />
        </template>
      </Card>
    </modal>

    <button class="button mb-3">
      <nuxt-link to="/projects">
        <Icon icon-name="arrow-thin-left" icon-text="Back" class="text-black" />
      </nuxt-link>
    </button>

    <Card :title="getCurrentProject.title">
      <template v-slot:button>
        <button class="button-teal" @click="$modal.show('edit-project')">
          <Icon icon-name="edit-pencil" icon-text="Edit Project" />
        </button>
      </template>
      <template v-slot:content>
        {{ getCurrentProject }}
        <button class="button-danger" @click="trash(getCurrentProject)">
          <Icon icon-name="trash" icon-text="Trash" />
        </button>
      </template>
    </Card>

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

    <TableCard class="mt-4" title="Project Tasks">
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
      <template v-slot:footer>
        <nuxt-link :to="projectTasksLink" class="text-teal-700">
          <Icon
            icon-name="checkmark-outline"
            icon-text="Go to All Project Tasks"
          />
        </nuxt-link>
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

import ProjectsForm from '~/components/Projects/ProjectsForm.vue'
import TasksForm from '~/components/Tasks/TasksForm.vue'
import TasksList from '~/components/Tasks/TasksList.vue'

export default {
  components: {
    Card,
    TableCard,
    Table,
    Icon,
    ProjectsForm,
    TasksForm,
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
    async trash(project) {
      await this.$swal({
        title: 'Are you sure you want to trash this project?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('projects/trashProject', project)
        }
      })
    },
    async refreshProject() {
      await this.$store.dispatch(
        'projects/getProject',
        this.getCurrentProject.id
      )
    }
  }
}
</script>
