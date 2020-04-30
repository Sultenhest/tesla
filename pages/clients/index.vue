<template>
  <div>
    <form @submit.prevent="addClient">
      <input
        v-model="form.name"
        type="text"
        name="name"
        placeholder="Client Name"
      />
      <textarea
        v-model="form.description"
        rows="4"
        type="text"
        name="description"
        placeholder="Client Description"
      ></textarea>
      <button type="submit">Submit</button>
      {{ error }}
    </form>

    <ol>
      <li v-for="client in getAllClients" :key="client.id">
        {{ client.name }}<button @click="trash(client)">Trash</button>
        <div v-if="client.deleted_at" style="border:1px solid red;">
          <button @click="restore(client)">Restore</button>
          <button @click="forceDelete(client)">Force Delete</button>
        </div>
      </li>
    </ol>
    TRASHED CLIENTS
    {{ getAllTrashedClients }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      form: {
        name: '',
        description: ''
      },
      error: {}
    }
  },
  computed: {
    ...mapGetters('clients', ['getAllClients', 'getAllTrashedClients'])
  },
  created() {
    this.$store.dispatch('clients/getClients')
  },
  methods: {
    async addClient() {
      await this.$store
        .dispatch('clients/addClient', this.form)
        .then((response) => {
          this.form.name = ''
          this.form.description = ''
        })
    },
    async trash(client) {
      await this.$store.dispatch('clients/trashClient', client)
    },
    async restore(client) {
      await this.$store.dispatch('clients/restoreClient', client)
    },
    async forceDelete(client) {
      await this.$store.dispatch('clients/deleteClient', client)
    }
  }
}
</script>
