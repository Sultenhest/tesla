<template>
  <div>
    <ClientsModal
      name="edit-client"
      title="Edit Client"
      :client="getCurrentClient"
    />

    <button class="button mb-3">
      <nuxt-link to="/clients">
        <Icon icon-name="arrow-thin-left" icon-text="Back" class="text-black" />
      </nuxt-link>
    </button>

    <Card :title="getCurrentClient.name">
      <template v-slot:button>
        <button class="button-teal" @click="$modal.show('edit-client')">
          <Icon icon-name="edit-pencil" icon-text="Edit Client" />
        </button>
      </template>
      <template v-slot:content>
        <pre>
          {{ getCurrentClient }}
        </pre>
        <button class="button-danger" @click="trash(getCurrentClient)">
          <Icon icon-name="trash" icon-text="Trash" />
        </button>
      </template>
    </Card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Card from '~/components/UI/Cards/Card.vue'
import Icon from '~/components/Icon.vue'
import ClientsModal from '~/components/Clients/ClientsModal.vue'

export default {
  components: {
    Card,
    Icon,
    ClientsModal
  },
  async fetch({ store, params }) {
    await store.dispatch('clients/getClient', params.id)
  },
  computed: {
    ...mapGetters('clients', ['getCurrentClient'])
  },
  methods: {
    async trash(client) {
      await this.$swal({
        title: 'Are you sure you want to trash this client?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('clients/trashClient', client)
        }
      })
    }
  }
}
</script>

<style lang="css" scoped></style>
