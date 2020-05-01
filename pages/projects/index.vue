<template>
  <div>
    <modal name="new-project" height="auto">
      <Card title="Create new Project">
        <template v-slot:button>
          <button class="button" @click="$modal.hide('new-project')">
            <Icon icon-name="close" icon-text="Close" />
          </button>
        </template>
        <template v-slot:content>
          <ProjectsForm form-title="Create new Project" />
        </template>
      </Card>
    </modal>

    <TableCard title="Projects">
      <template v-slot:button>
        <button class="button-teal" @click="$modal.show('new-project')">
          <Icon icon-name="add-outline" icon-text="Add Project" />
        </button>
      </template>
      <template v-slot:content>
        <Table :cols="['Project Title', 'Client', '']">
          <ProjectsList :projects="getAllProjects" />
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

import ProjectsForm from '~/components/Projects/ProjectsForm.vue'
import ProjectsList from '~/components/Projects/ProjectsList.vue'

export default {
  components: {
    Card,
    TableCard,
    Table,
    Icon,
    ProjectsForm,
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
