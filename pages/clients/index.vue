<template>
  <div>
    <ClientsModal name="new-client" title="New Client" />

    <Card title="Clients">
      <template v-slot:button>
        <button class="button-teal" @click="$modal.show('new-client')">
          <Icon icon-name="add-outline" icon-text="Add Client" />
        </button>
      </template>
      <Table :cols="['Client Name', 'Projects', '']">
        <ClientsList :clients="getAllClients" />
      </Table>
      <div class="card-footer">
        <Pagination base="clients" :meta="getMeta" />
      </div>
    </Card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Table from '~/components/UI/Table.vue'

import ClientsModal from '~/components/Clients/ClientsModal.vue'
import ClientsList from '~/components/Clients/ClientsList.vue'
import Pagination from '~/components/UI/Navigation/Pagination.vue'

export default {
  components: {
    Table,
    ClientsModal,
    ClientsList,
    Pagination
  },
  fetch({ store, params }) {
    store.dispatch('clients/getClients')
  },
  computed: {
    ...mapGetters('clients', ['getAllClients', 'getMeta'])
  },
  methods: {
    async restore(client) {
      await this.$store.dispatch('clients/restoreClient', client)
    },
    async forceDelete(client) {
      await this.$store.dispatch('clients/deleteClient', client)
    }
  }
}
</script>
