<template>
  <div>
    <modal name="edit-client" height="auto">
      <Card title="Edit Client">
        <template v-slot:button>
          <button class="button" @click="$modal.hide('edit-client')">
            <Icon icon-name="close" icon-text="Close" />
          </button>
        </template>
        <template v-slot:content>
          <ClientsForm :client="getCurrentClient" />
        </template>
      </Card>
    </modal>

    <Card :title="getCurrentClient.name">
      <template v-slot:button>
        <button class="button-teal" @click="$modal.show('edit-client')">
          <Icon icon-name="edit-pencil" icon-text="Edit Client" />
        </button>
      </template>
      <template v-slot:content>
        {{ getCurrentClient }}
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
import ClientsForm from '~/components/Clients/ClientsForm.vue'

export default {
  components: {
    Card,
    Icon,
    ClientsForm
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
