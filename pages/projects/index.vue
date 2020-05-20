<template>
  <div>
    <ProjectsModal name="new-project" title="New Project" />

    <Card title="Projects">
      <template v-slot:button>
        <button class="button-teal" @click="$modal.show('new-project')">
          <Icon icon-name="add-outline" icon-text="Add Project" />
        </button>
      </template>
      <Table :cols="['Project Title', 'Tasks']">
        <ProjectsList :projects="getAllProjects" />
      </Table>
      <div class="card-footer flex flex-col">
        <button
          v-if="!currentPageIsLastPage"
          class="button-primary mb-2"
          @click="loadMore"
        >
          Load more
        </button>
        <p class="text-sm text-center text-gray-700">
          Showing 1 to {{ getMeta.to }} of {{ getMeta.total }} results
        </p>
      </div>
    </Card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Table from '~/components/UI/Table.vue'

import ProjectsModal from '~/components/Projects/ProjectsModal.vue'
import ProjectsList from '~/components/Projects/ProjectsList.vue'

export default {
  components: {
    Table,
    ProjectsModal,
    ProjectsList
  },
  fetch({ store }) {
    store.dispatch('projects/getProjects', 1)
  },
  data() {
    return {
      noMoreData: false
    }
  },
  computed: {
    ...mapGetters('projects', ['getAllProjects', 'getMeta']),
    currentPageIsLastPage() {
      return this.getMeta.current_page === this.getMeta.last_page
    }
  },
  methods: {
    loadMore() {
      if (!this.currentPageIsLastPage) {
        this.$store.dispatch(
          'projects/getProjects',
          this.getMeta.current_page + 1
        )
      }
    }
  }
}
</script>
