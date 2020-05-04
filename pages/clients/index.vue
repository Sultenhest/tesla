<template>
  <div>
    <modal name="new-client" height="auto">
      <Card title="Create new Client">
        <template v-slot:button>
          <button class="button" @click="$modal.hide('new-client')">
            <Icon icon-name="close" icon-text="Close" />
          </button>
        </template>
        <template v-slot:content>
          <ClientsForm />
        </template>
      </Card>
    </modal>

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

import Card from '~/components/UI/Cards/Card.vue'
import TableCard from '~/components/UI/Cards/TableCard.vue'
import Table from '~/components/UI/Table.vue'

import Icon from '~/components/Icon.vue'

import ClientsForm from '~/components/Clients/ClientsForm.vue'
import ClientsList from '~/components/Clients/ClientsList.vue'

export default {
  components: {
    Card,
    TableCard,
    Table,
    Icon,
    ClientsForm,
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
