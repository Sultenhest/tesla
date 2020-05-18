<template>
  <div>
    <ActivitiesModal />

    <Card :title="cardTitle">
      <template v-slot:button>
        <button class="button-teal">
          <nuxt-link :to="projectLink">
            <Icon icon-name="view-carousel" icon-text="Go to Project" />
          </nuxt-link>
        </button>
      </template>
      <Table :cols="['Subject Type', 'Activity', 'Changes', 'At']">
        <nuxt-child :key="$route.query.page" />
      </Table>
      <div class="card-footer">
        <Pagination :base="paginationBaseUrl" :meta="getProjectMeta" />
      </div>
    </Card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ActivitiesModal from '~/components/Activities/ActivitiesModal.vue'
import Table from '~/components/UI/Table.vue'
import Pagination from '~/components/UI/Navigation/Pagination.vue'

export default {
  components: {
    ActivitiesModal,
    Table,
    Pagination
  },
  async fetch({ store, params, query }) {
    await store.dispatch('projects/getProject', params.projectId)
    await store.dispatch('projects/getProjectActivity', [
      params.projectId,
      query.page
    ])
  },
  computed: {
    ...mapGetters('projects', ['getCurrentProject', 'getProjectMeta']),
    cardTitle() {
      return this.getCurrentProject.title + ' Activities'
    },
    projectLink() {
      return '/projects/' + this.$route.params.projectId
    },
    paginationBaseUrl() {
      return this.$route.path
    }
  },
  watchQuery: ['page']
}
</script>
