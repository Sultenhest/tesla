<template>
  <tbody>
    <ClientRow
      v-for="client in clients"
      :id="client.id"
      :key="client.id"
      :client="client"
      @editClient="onEditClient"
    />
  </tbody>
</template>

<script>
import ClientRow from '~/components/Clients/ClientRow.vue'

export default {
  name: 'ClientsList',
  components: {
    ClientRow
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
