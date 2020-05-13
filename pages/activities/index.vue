<template>
  <div>
    <Card title="Activities" class="mt-4">
      <Table :cols="['Subject Type', 'Activity', 'Changes', 'At']">
        <nuxt-child :key="$route.params.id" />
      </Table>
      <div class="card-footer">
        <Pagination :meta="getMeta" />
      </div>
    </Card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Table from '~/components/UI/Table.vue'
import Pagination from '~/components/UI/Navigation/Pagination.vue'

export default {
  components: {
    Table,
    Pagination
  },
  fetch({ store, params }) {
    store.dispatch('activities/getActivities', params.id)
  },
  computed: {
    ...mapGetters('activities', ['getMeta', 'getLinks'])
  }
  /*
  methods: {
    previous(url) {
      return '/activities/5'
    },
    next(url) {
      if (this.$route.params.id === 1 && this.getMeta.last_page !== 1) {
        return '/activities/2'
      }
      return '/activities/7'
    }
  }
  */
}
</script>
