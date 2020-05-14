export const state = () => ({
  activities: [],
  meta: []
})

export const mutations = {
  setActivities(state, activities) {
    state.activities = activities
  },
  setMeta(state, meta) {
    state.meta = meta
  }
}

export const actions = {
  async getActivities(context, page) {
    return await this.$axios
      .$get('/api/activities?page=' + page)
      .then((response) => {
        context.commit('setActivities', response.data)
        context.commit('setMeta', response.meta)
      })
  }
}

export const getters = {
  getActivities: (state) => {
    return state.activities
  },
  getMeta: (state) => {
    return state.meta
  }
}
