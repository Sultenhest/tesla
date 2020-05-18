<template>
  <div>
    <Card title="Trashed Clients">
      <Table :cols="['Client Name', '']">
        <TrashedClientsList :trashedClients="getAllTrashedClients" />
      </Table>
      <div class="card-footer">
        <p class="text-sm text-center text-gray-700">
          Showing trashed all clients -
          <nuxt-link to="/clients">
            Click here to see clients
          </nuxt-link>
        </p>
      </div>
    </Card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Table from '~/components/UI/Table.vue'

import TrashedClientsList from '~/components/Clients/TrashedClientsList.vue'

export default {
  components: {
    Table,
    TrashedClientsList
  },
  fetch({ store, params }) {
    store.dispatch('clients/getClients')
  },
  computed: {
    ...mapGetters('clients', ['getAllTrashedClients'])
  }
}
</script>
