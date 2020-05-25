<template>
  <tr>
    <td class="w-1/4">
      {{ client.name }}
    </td>
    <td class="w-3/4 text-right button flex justify-end">
      <button class="button-teal mr-2" @click="restore">
        <Icon icon-name="arrow-outline-up" icon-text="Restore" />
      </button>
      <button class="button-danger" @click="forceDelete">
        <Icon icon-name="trash" icon-text="Permanently Delete" />
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'ClientRow',
  props: {
    client: {
      type: Object,
      required: true
    }
  },
  methods: {
    restore() {
      this.$store.dispatch('clients/restoreClient', this.client)
      this.$router.back()
    },
    forceDelete() {
      this.$swal({
        title: 'Are you sure you want to PERMANENTLY DELETE this client?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#E53E3E',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('clients/deleteClient', this.client)
          this.$router.push('/clients')
        }
      })
    }
  }
}
</script>
