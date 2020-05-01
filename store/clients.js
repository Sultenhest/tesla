export const state = () => ({
  allClients: [],
  trashedClients: [],
  currentClient: {}
})

export const mutations = {
  setCurrentClient(state, client) {
    state.currentClient = client
  },
  setClients(state, clients) {
    state.allClients = clients
  },
  addClient(state, client) {
    state.allClients.unshift(client)
  },
  updateClient(state, updatedClient) {
    const clientIndex = state.allClients.findIndex(
      (client) => client.id === updatedClient.id
    )
    state.allClients[clientIndex] = updatedClient
    state.currentClient = updatedClient
  },
  trashClient(state, client) {
    const index = state.allClients.indexOf(client)
    if (index > -1) {
      state.trashedClients.push(client)
      state.allClients.splice(index, 1)
    }
  }
}

export const actions = {
  getClient(context, id) {
    return this.$axios.$get('/api/clients/' + id).then((data) => {
      context.commit('setCurrentClient', data)
    })
  },
  getClients(context) {
    return this.$axios.$get('/api/clients').then((data) => {
      context.commit('setClients', data)
    })
  },
  addClient(context, client) {
    return this.$axios
      .$post('/api/clients', client)
      .then((response) => {
        context.commit('addClient', response.client)
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
        context.commit('updateClient', response.client)
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
        context.commit('trashClient', client)
        this.$toast.success('trashed')
      })
      .catch((error) => {
        this.$toast.error(error.response)
      })
  },
  restoreClient(context, client) {
    return this.$axios
      .$patch('/api/clients/' + client.id + '/restore')
      .then((response) => {
        this.$toast.success(response.message)
      })
      .catch((error) => {
        this.$toast.error(error.response)
      })
  },
  deleteClient(context, client) {
    return this.$axios
      .$delete('/api/clients/' + client.id + '/forcedelete')
      .then((response) => {
        this.$toast.success(response.message)
      })
      .catch((error) => {
        this.$toast.error(error.response)
      })
  }
}

export const getters = {
  getCurrentClient: (state) => {
    return state.currentClient
  },
  getAllClients: (state) => {
    return state.allClients
  },
  getAllTrashedClients: (state) => {
    return state.trashedClients
  }
}