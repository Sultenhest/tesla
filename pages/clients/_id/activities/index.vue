<template>
  <div>
    <ActivitiesModal />

    <Card :title="cardTitle">
      <template v-slot:button>
        <button class="button-teal">
          <nuxt-link :to="clientLink">
            <Icon icon-name="user-group" icon-text="Go to Client" />
          </nuxt-link>
        </button>
      </template>
      <Table
        :cols="['Subject Type', 'Activity', 'Changes', 'At']"
        :equal-width="true"
      >
        <nuxt-child :key="$route.query.page" />
      </Table>
      <div class="card-footer">
        <Pagination :base="paginationBaseUrl" :meta="getClientMeta" />
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
    await store.dispatch('clients/getClient', params.id)
    await store.dispatch('clients/getClientActivity', [params.id, query.page])
  },
  computed: {
    ...mapGetters('clients', ['getCurrentClient', 'getClientMeta']),
    cardTitle() {
      return this.getCurrentClient.name + ' Activities'
    },
    clientLink() {
      return '/clients/' + this.$route.params.id
    },
    paginationBaseUrl() {
      return this.$route.path
    }
  },
  watchQuery: ['page']
}
</script>
