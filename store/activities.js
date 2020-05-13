export const state = () => ({
  activities: [],
  meta: [],
  links: []
})

export const mutations = {
  setActivities(state, activities) {
    state.activities = activities
  },
  setMeta(state, meta) {
    state.meta = meta
  },
  setLinks(state, links) {
    state.links = links
  }
}

export const actions = {
  async getActivities(context, page) {
    return await this.$axios
      .$get('/api/activities?page=' + page)
      .then((response) => {
        context.commit('setActivities', response.data)
        context.commit('setMeta', response.meta)
        context.commit('setLinks', response.links)
      })
  }
}

export const getters = {
  getActivities: (state) => {
    return state.activities
  },
  getMeta: (state) => {
    return state.meta
  },
  getLinks: (state) => {
    return state.links
  }
}
