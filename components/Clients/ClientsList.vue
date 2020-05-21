<template>
  <tbody>
    <p v-if="!clients" class="card-content">
      You dont seem to have any clients yet.
    </p>
    <ClientsRow
      v-for="client in clients"
      :id="client.id"
      :key="client.id"
      :client="client"
    />
  </tbody>
</template>

<script>
import ClientsRow from '~/components/Clients/ClientsRow.vue'

export default {
  name: 'ClientsList',
  components: {
    ClientsRow
  },
  props: {
    clients: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>
