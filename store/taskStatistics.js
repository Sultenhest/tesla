export const state = () => ({
  billedAt: {
    statistics: {},
    this_week: 0,
    last_week: 0,
    difference: 0
  },
  completedAt: {
    statistics: {},
    this_week: 0,
    last_week: 0,
    difference: 0
  },
  createdAt: {
    statistics: {},
    this_week: 0,
    last_week: 0,
    difference: 0
  }
})

export const mutations = {
  setBilledAt(state, statistics) {
    const stats = Object.entries(statistics)
    if (stats.length === 0) return
    state.billedAt.statistics = stats
    state.billedAt = {
      this_week: stats[stats.length - 1][1],
      last_week: stats[stats.length - 2][1]
    }
    const lastWeek = state.billedAt.last_week
    const increase = state.billedAt.this_week - lastWeek
    state.billedAt.difference = Math.round((increase / lastWeek) * 100)
  },
  setCompletedAt(state, statistics) {
    const stats = Object.entries(statistics)
    if (stats.length === 0) return
    state.completedAt.statistics = stats
    state.completedAt = {
      this_week: stats[stats.length - 1][1],
      last_week: stats[stats.length - 2][1]
    }
    const lastWeek = state.completedAt.last_week
    const increase = state.completedAt.this_week - lastWeek
    state.completedAt.difference = Math.round((increase / lastWeek) * 100)
  },
  setCreatedAt(state, statistics) {
    const stats = Object.entries(statistics)
    if (stats.length === 0) return
    state.createdAt.statistics = stats
    state.createdAt = {
      this_week: stats[stats.length - 1][1],
      last_week: stats[stats.length - 2][1]
    }
    const lastWeek = state.createdAt.last_week
    const increase = state.createdAt.this_week - lastWeek
    state.createdAt.difference = Math.round((increase / lastWeek) * 100)
  }
}

export const actions = {
  async getBilledStats(context) {
    await this.$axios.$get('/api/dashboard').then((response) => {
      context.commit('setBilledAt', response.statistics.tasks.billed_at)
      context.commit('setCompletedAt', response.statistics.tasks.completed_at)
      context.commit('setCreatedAt', response.statistics.tasks.created_at)
    })
  }
}

export const getters = {
  getBilledAt: (state) => {
    return state.billedAt
  },
  getCompletedAt: (state) => {
    return state.completedAt
  },
  getCreatedAt: (state) => {
    return state.createdAt
  }
}
