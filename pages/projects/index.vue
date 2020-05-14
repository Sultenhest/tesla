<template>
  <div>
    <ProjectsModal name="new-project" title="New Project" />

    <Card title="Projects">
      <template v-slot:button>
        <button class="button-teal" @click="$modal.show('new-project')">
          <Icon icon-name="add-outline" icon-text="Add Project" />
        </button>
      </template>
      <Table :cols="['Project Title', 'Client', 'Tasks', '']">
        <ProjectsList :projects="getAllProjects" />
      </Table>
      <div class="card-footer">
        <Pagination base="projects" :meta="getMeta" />
      </div>
    </Card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Table from '~/components/UI/Table.vue'

import ProjectsModal from '~/components/Projects/ProjectsModal.vue'
import ProjectsList from '~/components/Projects/ProjectsList.vue'
import Pagination from '~/components/UI/Navigation/Pagination.vue'

export default {
  components: {
    Table,
    ProjectsModal,
    ProjectsList,
    Pagination
  },
  fetch({ store, params }) {
    store.dispatch('projects/getProjects')
  },
  computed: {
    ...mapGetters('projects', ['getAllProjects', 'getMeta'])
  }
}
</script>
