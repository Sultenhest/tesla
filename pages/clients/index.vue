<template>
  <div>
    <ClientsModal name="new-client" title="New Client" />

    <Card title="Clients">
      <template v-slot:button>
        <button class="button-teal" @click="$modal.show('new-client')">
          <Icon icon-name="add-outline" icon-text="Add Client" />
        </button>
      </template>
      <Table :cols="['Client Name', 'Projects']">
        <ClientsList :clients="getClients" />
      </Table>
      <div class="card-footer">
        <p class="text-sm text-center text-gray-700">
          Showing all clients -
          <nuxt-link to="/clients/trashed">
            Click here to see trashed clients
          </nuxt-link>
        </p>
      </div>
    </Card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Table from '~/components/UI/Table.vue'

import ClientsModal from '~/components/Clients/ClientsModal.vue'
import ClientsList from '~/components/Clients/ClientsList.vue'

export default {
  components: {
    Table,
    ClientsModal,
    ClientsList
  },
  fetch({ store, params }) {
    store.dispatch('clients/fetchClients')
  },
  computed: {
    ...mapGetters('clients', ['getClients'])
  }
}
</script>
