<template>
  <div>
    <ClientsModal
      name="edit-client"
      title="Edit Client"
      :client="getCurrentClient"
    />

    <Card :title="getCurrentClient.name" :sub-title="getVat()" :center="true">
      <template v-slot:button>
        <button class="button-teal" @click="$modal.show('edit-client')">
          <Icon icon-name="edit-pencil" icon-text="Edit Client" />
        </button>
      </template>
      <ClientInformation :client="getCurrentClient" />
    </Card>

    <ProjectsModal
      name="new-project"
      title="New Project"
      :client-id="getCurrentClient.id"
      @projectFormSubmitted="refresh()"
    />

    <Card id="client-projects" :title="projectsTitle()" class="mt-4">
      <template v-slot:button>
        <button class="button-teal" @click="$modal.show('new-project')">
          <Icon icon-name="add-outline" icon-text="Add Project to Client" />
        </button>
      </template>
      <Table :cols="['Project Title', 'Tasks']">
        <ProjectsList :projects="getProjects" />
      </Table>
    </Card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ClientInformation from '~/components/Clients/ClientInformation.vue'
import ClientsModal from '~/components/Clients/ClientsModal.vue'

import ProjectsModal from '~/components/Projects/ProjectsModal.vue'
import Table from '~/components/UI/Table.vue'
import ProjectsList from '~/components/Projects/ProjectsList.vue'

export default {
  components: {
    ClientInformation,
    ClientsModal,
    ProjectsModal,
    Table,
    ProjectsList
  },
  fetch({ store, params }) {
    store.dispatch('clients/fetchClient', params.id)
    store.dispatch('projects/fetchProjects', { page: 1, client: params.id })
  },
  computed: {
    ...mapGetters({
      getCurrentClient: 'clients/getCurrentClient',
      getProjects: 'projects/getProjects'
    })
  },
  methods: {
    refresh() {
      this.$store.dispatch('clients/fetchClient', this.getCurrentClient.id)
      this.$store.dispatch('projects/fetchProjects', {
        page: 1,
        client: this.getCurrentClient.id
      })
    },
    getVat() {
      if (
        this.getCurrentClient.vat_abbr == null ||
        this.getCurrentClient.vat == null
      ) {
        return ''
      }
      return this.getCurrentClient.vat_abbr + this.getCurrentClient.vat
    },
    projectsTitle() {
      return this.getCurrentClient.name + "'s Projects"
    }
  }
}
</script>
