export const state = () => ({
  currentProject: {},
  projects: [],
  projectsMeta: [],
  projectActivity: [],
  projectActivityMeta: []
})

export const mutations = {
  SET_CURRENT_PROJECT(state, project) {
    state.currentProject = project
    this.dispatch('clients/fetchClient', project.client_id)
  },
  SET_PROJECTS(state, projects) {
    state.projects = state.projects.concat(projects)
  },
  RESET_PROJECTS(state) {
    state.projects = []
  },
  SET_PROJECTS_META(state, meta) {
    state.projectsMeta = meta
  },
  ADD_PROJECT(state, project) {
    state.projects.unshift(project)
  },
  UPDATE_PROJECT(state, updatedProject) {
    const projectIndex = state.projects.findIndex(
      (project) => project.id === updatedProject.id
    )
    state.projects[projectIndex] = updatedProject
    state.currentProject = updatedProject
  },
  TRASH_PROJECT(state, project) {
    const index = state.projects.indexOf(project)
    if (index > -1) {
      state.projects.splice(index, 1)
    }
  },
  SET_PROJECT_ACTIVITY(state, activities) {
    state.projectActivity = activities
  },
  SET_PROJECT_ACTIVITY_META(state, meta) {
    state.projectActivityMeta = meta
  }
}

export const actions = {
  async fetchProject(context, id) {
    return await this.$axios
      .$get('/api/projects/' + id)
      .then((response) => {
        context.commit('SET_CURRENT_PROJECT', response.data)
      })
      .catch((error) => {
        if (error.response.status === 404) {
          this.$toast.show(
            'This project has been trashed. You need to restore it to see it.'
          )
          context.commit('SET_CURRENT_PROJECT', {})
        } else {
          this.$toast.error(error.response.data.message)
        }
        error({ statusCode: 404 })
      })
  },
  async fetchProjects(context, params) {
    let url = ''
    if (params.page === 1) {
      context.commit('RESET_PROJECTS')
    }
    if ('client' in params) {
      url = 'clients/' + params.client + '/'
    }
    return await this.$axios
      .$get('/api/' + url + 'projects?page=' + params.page)
      .then((response) => {
        context.commit('SET_PROJECTS', response.data)
        context.commit('SET_PROJECTS_META', response.meta)
      })
      .catch((error) => {
        this.$toast.error(error.response.data.message)
      })
  },
  addProject(context, project) {
    return this.$axios
      .$post('/api/projects', project)
      .then((response) => {
        context.commit('ADD_PROJECT', response.project)
        this.$toast.success(response.message)
      })
      .catch((error) => {
        this.$toast.error(error.response.data.message)
        return error.response.data.errors
      })
  },
  updateProject(context, project) {
    return this.$axios
      .$patch('/api/projects/' + project.id, project)
      .then((response) => {
        context.commit('UPDATE_PROJECT', response.project)
        context.dispatch('fetchProject', response.project.id)
        this.$toast.success(response.message)
      })
      .catch((error) => {
        this.$toast.error(error.response.data.message)
        return error.response.data.errors
      })
  },
  trashProject(context, project) {
    return this.$axios
      .$delete('/api/projects/' + project.id)
      .then((response) => {
        context.commit('TRASH_PROJECT', project)
        this.$toast.show(response.message)
      })
      .catch((error) => {
        this.$toast.error(error.response)
      })
  },
  async fetchProjectActivity(context, params) {
    return await this.$axios
      .$get('/api/projects/' + params[0] + '/activity?page=' + params[1])
      .then((response) => {
        context.commit('SET_PROJECT_ACTIVITY', response.data)
        context.commit('SET_PROJECT_ACTIVITY_META', response.meta)
      })
      .catch((error) => {
        this.$toast.error(error.response.data.message)
      })
  }
}

export const getters = {
  getCurrentProject: (state) => {
    return state.currentProject
  },
  getProjects: (state) => {
    return state.projects
  },
  getProjectsMeta: (state) => {
    return state.projectsMeta
  },
  getProjectActivity: (state) => {
    return state.projectActivity
  },
  getProjectActivityMeta: (state) => {
    return state.projectActivityMeta
  }
}
