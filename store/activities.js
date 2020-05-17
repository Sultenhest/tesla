export const state = () => ({
  activities: [],
  meta: [],
  feed: []
})

export const mutations = {
  setActivities(state, activities) {
    state.activities = activities
  },
  setMeta(state, meta) {
    state.meta = meta
  },
  setFeed(state, feed) {
    state.feed = feed
  }
}

export const actions = {
  getActivities(context, page) {
    return this.$axios.$get('/api/activities?page=' + page).then((response) => {
      context.commit('setActivities', response.data)
      context.commit('setMeta', response.meta)
    })
  },
  fetchFeed(context) {
    return this.$axios
      .$get('/api/me')
      .then((response) => {
        context.commit('setFeed', response.feed)
      })
      .catch((error) => {
        this.$toast.error(error.response.data.message)
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
  getFeed: (state) => {
    return state.feed
  }
}
