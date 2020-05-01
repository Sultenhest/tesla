<template>
  <tbody>
    <ClientsRow
      v-for="client in clients"
      :id="client.id"
      :key="client.id"
      :client="client"
      @editClient="onEditClient"
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
  },
  methods: {
    onEditClient(client) {
      this.$emit('passClientToModal', client)
    }
  }
}
</script>
