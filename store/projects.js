export const state = () => ({
  allProjects: [],
  trashedProjects: [],
  currentProject: {}
})

export const mutations = {
  setCurrentProject(state, project) {
    state.currentProject = project
  },
  setProjects(state, projects) {
    state.allProjects = projects
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
    return this.$axios.$get('/api/projects/' + id).then((data) => {
      context.commit('setCurrentProject', data)
    })
  },
  getProjects(context) {
    return this.$axios.$get('/api/projects').then((data) => {
      context.commit('setProjects', data)
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
        this.$toast.success('trashed')
      })
      .catch((error) => {
        this.$toast.error(error.response)
      })
  },
  restoreProject(context, project) {
    return this.$axios
      .$patch('/api/projects/' + project.id + '/restore')
      .then((response) => {
        this.$toast.success(response.message)
      })
      .catch((error) => {
        this.$toast.error(error.response)
      })
  },
  deleteProject(context, project) {
    return this.$axios
      .$delete('/api/projects/' + project.id + '/forcedelete')
      .then((response) => {
        this.$toast.success(response.message)
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
  getAllTrashedProjects: (state) => {
    return state.trashedProjects
  }
}
