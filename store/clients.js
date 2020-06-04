export const state = () => ({
  currentClient: {},
  clients: [],
  trashedClients: [],
  clientActivity: [],
  clientActivityMeta: []
})

export const mutations = {
  SET_CURRENT_CLIENT(state, client) {
    state.currentClient = client
  },
  SET_CLIENTS(state, clients) {
    state.clients = clients
  },
  SET_TRASHED_CLIENTS(state, trashedClients) {
    state.trashedClients = trashedClients
  },
  SET_CLIENT_ACTIVITY(state, activities) {
    state.clientActivity = activities
  },
  SET_CLIENT_ACTIVITY_META(state, meta) {
    state.clientActivityMeta = meta
  },
  ADD_CLIENT(state, client) {
    state.clients.unshift(client)
  },
  UPDATE_CLIENT(state, updatedClient) {
    const clientIndex = state.clients.findIndex(
      (client) => client.id === updatedClient.id
    )
    state.clients[clientIndex] = updatedClient
    state.currentClient = updatedClient
  },
  TRASH_CLIENT(state, { client }) {
    const index = state.clients.indexOf(client)
    if (index > -1) {
      state.trashedClients.push(client)
      state.clients.splice(index, 1)
    }
  },
  RESTORE_CLIENT(state, client) {
    const index = state.trashedClients.indexOf(client)
    if (index > -1) {
      state.clients.push(client)
      state.trashedClients.splice(index, 1)
    }
  },
  DELETE_CLIENT(state, client) {
    const index = state.trashedClients.indexOf(client)
    if (index > -1) {
      state.trashedClients.splice(index, 1)
    }
  }
}

export const actions = {
  async fetchClient(context, id) {
    return await this.$axios
      .$get('/api/clients/' + id)
      .then((response) => {
        context.commit('SET_CURRENT_CLIENT', response.data)
      })
      .catch((error) => {
        if (error.response.status === 404) {
          this.$toast.show(
            'This client has been trashed. You need to restore it to see it.'
          )
          context.commit('SET_CURRENT_CLIENT', {})
        } else {
          this.$toast.error(error.response.data.message)
        }
        error({ statusCode: 404 })
      })
  },
  async fetchClients(context) {
    return await this.$axios
      .$get('/api/clients')
      .then((response) => {
        context.commit('SET_CLIENTS', response.clients.data)
        context.commit('SET_TRASHED_CLIENTS', response.trashed_clients.data)
      })
      .catch((error) => {
        this.$toast.error(error.response.data.message)
      })
  },
  addClient(context, client) {
    return this.$axios
      .$post('/api/clients', client)
      .then((response) => {
        context.commit('ADD_CLIENT', response.client)
        this.$toast.success(response.message)
      })
      .catch((error) => {
        this.$toast.error(error.response.data.message)
        return error.response.data.errors
      })
  },
  updateClient(context, client) {
    return this.$axios
      .$patch('/api/clients/' + client.id, client)
      .then((response) => {
        context.commit('UPDATE_CLIENT', response.client)
        this.$toast.success(response.message)
      })
      .catch((error) => {
        this.$toast.error(error.response.data.message)
        return error.response.data.errors
      })
  },
  trashClient(context, client) {
    return this.$axios
      .$delete('/api/clients/' + client.id)
      .then((response) => {
        context.commit('TRASH_CLIENT', client)
        this.$toast.show(response.message)
      })
      .catch((error) => {
        this.$toast.error(error.response)
      })
  },
  restoreClient(context, client) {
    return this.$axios
      .$patch('/api/clients/' + client.id + '/restore')
      .then((response) => {
        context.commit('RESTORE_CLIENT', client)
        this.$toast.show(response.message)
      })
      .catch((error) => {
        this.$toast.error(error.response)
      })
  },
  deleteClient(context, client) {
    return this.$axios
      .$delete('/api/clients/' + client.id + '/forcedelete')
      .then((response) => {
        context.commit('DELETE_CLIENT', client)
        this.$toast.show(response.message)
      })
      .catch((error) => {
        this.$toast.error(error.response)
      })
  },
  async fetchClientActivity(context, params) {
    return await this.$axios
      .$get('/api/clients/' + params[0] + '/activity?page=' + params[1])
      .then((response) => {
        context.commit('SET_CLIENT_ACTIVITY', response.data)
        context.commit('SET_CLIENT_ACTIVITY_META', response.meta)
      })
      .catch((error) => {
        this.$toast.error(error.response.data.message)
      })
  }
}

export const getters = {
  getCurrentClient: (state) => {
    return state.currentClient
  },
  getClients: (state) => {
    return state.clients
  },
  getTrashedClients: (state) => {
    return state.trashedClients
  },
  getClientActivity: (state) => {
    return state.clientActivity
  },
  getClientActivityMeta: (state) => {
    return state.clientActivityMeta
  }
}
