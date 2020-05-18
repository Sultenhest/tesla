<template>
  <tbody>
    <p v-if="!trashedClients" class="card-content">
      You dont seem to have any trashedClients yet.
    </p>
    <TrashedClientsRow
      v-for="client in trashedClients"
      :key="client.id"
      :client="client"
    />
  </tbody>
</template>

<script>
import TrashedClientsRow from '~/components/Clients/TrashedClientsRow.vue'

export default {
  name: 'TrashedClientsList',
  components: {
    TrashedClientsRow
  },
  props: {
    trashedClients: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>
