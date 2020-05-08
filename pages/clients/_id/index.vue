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

    <Card :title="getCurrentClient.name" :sub-title="getVat()" :center="true">
      <template v-slot:button>
        <button class="button-teal" @click="$modal.show('edit-client')">
          <Icon icon-name="edit-pencil" icon-text="Edit Client" />
        </button>
      </template>
      <ClientInformation :client="getCurrentClient" />
    </Card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Card from '~/components/UI/Cards/Card.vue'
import Icon from '~/components/Icon.vue'

import ClientInformation from '~/components/Clients/ClientInformation.vue'
import ClientsModal from '~/components/Clients/ClientsModal.vue'

export default {
  components: {
    Card,
    Icon,
    ClientInformation,
    ClientsModal
  },
  async fetch({ store, params }) {
    await store.dispatch('clients/getClient', params.id)
  },
  computed: {
    ...mapGetters('clients', ['getCurrentClient'])
  },
  methods: {
    getVat() {
      return this.getCurrentClient.vat_abbr + this.getCurrentClient.vat
    }
  }
}
</script>
