<template>
  <div>
    <ClientsModal name="new-client" title="New Client" />

    <TableCard title="Clients">
      <template v-slot:button>
        <button class="button-teal" @click="$modal.show('new-client')">
          <Icon icon-name="add-outline" icon-text="Add Client" />
        </button>
      </template>
      <template v-slot:content>
        <Table :cols="['Client Name', 'Projects', '']">
          <ClientsList :clients="getAllClients" />
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

import ClientsModal from '~/components/Clients/ClientsModal.vue'
import ClientsList from '~/components/Clients/ClientsList.vue'

export default {
  components: {
    TableCard,
    Table,
    Icon,
    ClientsModal,
    ClientsList
  },
  computed: {
    ...mapGetters('clients', ['getAllClients'])
  },
  created() {
    this.$store.dispatch('clients/getClients')
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
