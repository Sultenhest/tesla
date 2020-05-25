export const state = () => ({
  activities: [],
  meta: [],
  feed: []
})

export const mutations = {
  SET_ACTIVITIES(state, activities) {
    state.activities = activities
  },
  SET_META(state, meta) {
    state.meta = meta
  },
  SET_FEED(state, feed) {
    state.feed = feed
  }
}

export const actions = {
  async fetchActivities(context, page) {
    return await this.$axios
      .$get('/api/activities?page=' + page)
      .then((response) => {
        context.commit('SET_ACTIVITIES', response.data)
        context.commit('SET_META', response.meta)
      })
  },
  fetchFeed(context) {
    return this.$axios
      .$get('/api/me')
      .then((response) => {
        context.commit('SET_FEED', response.feed)
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
