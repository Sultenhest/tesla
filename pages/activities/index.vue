<template>
  <div>
    <ActivitiesModal />

    <Card title="Activities">
      <Table
        :cols="['Subject Type', 'Activity', 'Changes', 'At']"
        :equal-width="true"
      >
        <nuxt-child :key="$route.query.page" />
      </Table>
      <div class="card-footer">
        <Pagination base="activities" :meta="getMeta" />
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
  fetch({ store, params, query }) {
    store.dispatch('activities/fetchActivities', query.page)
  },
  computed: {
    ...mapGetters('activities', ['getMeta'])
  },
  watchQuery: ['page']
}
</script>
