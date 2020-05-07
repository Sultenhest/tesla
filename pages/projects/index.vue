<template>
  <div>
    <ProjectsModal name="new-project" title="New Project" />

    <TableCard title="Projects">
      <template v-slot:button>
        <button class="button-teal" @click="$modal.show('new-project')">
          <Icon icon-name="add-outline" icon-text="Add Project" />
        </button>
      </template>
      <template v-slot:content>
        <Table :cols="['Project Title', 'Client', 'Tasks', '']">
          <ProjectsList :projects="getAllProjects" />
        </Table>
      </template>
    </TableCard>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import TableCard from '~/components/UI/Cards/TableCard.vue'
import Table from '~/components/UI/Table.vue'

import Icon from '~/components/Icon.vue'

import ProjectsModal from '~/components/Projects/ProjectsModal.vue'
import ProjectsList from '~/components/Projects/ProjectsList.vue'

export default {
  components: {
    TableCard,
    Table,
    Icon,
    ProjectsModal,
    ProjectsList
  },
  computed: {
    ...mapGetters('projects', ['getAllProjects'])
  },
  created() {
    this.$store.dispatch('projects/getProjects')
  }
}
</script>
