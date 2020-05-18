export const state = () => ({
  allProjects: [],
  meta: [],
  trashedProjects: [],
  currentProject: {}
})

export const mutations = {
  setCurrentProject(state, project) {
    state.currentProject = project
    this.dispatch('clients/getClient', project.client_id)
  },
  setProjects(state, projects) {
    state.allProjects = projects
  },
  setMeta(state, meta) {
    state.meta = meta
  },
  addProject(state, project) {
    state.allProjects.unshift(project)
  },
  updateProject(state, updatedProject) {
    const projectIndex = state.allProjects.findIndex(
      (project) => project.id === updatedProject.id
    )
    state.allProjects[projectIndex] = updatedProject
    state.currentProject = updatedProject
  },
  trashProject(state, project) {
    const index = state.allProjects.indexOf(project)
    if (index > -1) {
      state.trashedProjects.push(project)
      state.allProjects.splice(index, 1)
    }
  }
}

export const actions = {
  getProject(context, id) {
    return this.$axios
      .$get('/api/projects/' + id)
      .then((response) => {
        context.commit('setCurrentProject', response.data)
      })
      .catch((error) => {
        if (error.response.status === 404) {
          this.$toast.show(
            'This project has been trashed. You need to restore it to see it.'
          )
          context.commit('setCurrentProject', {})
        } else {
          this.$toast.error(error.response.data.message)
        }
        error({ statusCode: 404 })
      })
  },
  getProjects(context) {
    return this.$axios
      .$get('/api/projects')
      .then((response) => {
        context.commit('setProjects', response.data)
        context.commit('setMeta', response.meta)
      })
      .catch((error) => {
        this.$toast.error(error.response.data.message)
      })
  },
  addProject(context, project) {
    return this.$axios
      .$post('/api/projects', project)
      .then((response) => {
        context.commit('addProject', response.project)
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
        context.commit('updateProject', response.project)
        context.dispatch('getProject', response.project.id)
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
        context.commit('trashProject', project)
        this.$toast.show('Project was trashed')
      })
      .catch((error) => {
        this.$toast.error(error.response)
      })
  },
  restoreProject(context, project) {
    return this.$axios
      .$patch('/api/projects/' + project.id + '/restore')
      .then((response) => {
        this.$toast.show(response.message)
      })
      .catch((error) => {
        this.$toast.error(error.response)
      })
  },
  deleteProject(context, project) {
    return this.$axios
      .$delete('/api/projects/' + project.id + '/forcedelete')
      .then((response) => {
        this.$toast.show(response.message)
      })
      .catch((error) => {
        this.$toast.error(error.response)
      })
  }
}

export const getters = {
  getCurrentProject: (state) => {
    return state.currentProject
  },
  getAllProjects: (state) => {
    return state.allProjects
  },
  getMeta: (state) => {
    return state.meta
  },
  getAllTrashedProjects: (state) => {
    return state.trashedProjects
  }
}
