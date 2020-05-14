import Vue from 'vue'

export const state = () => ({
  currentTask: {},
  meta: [],
  tasks: [],
  trashedTasks: []
})

export const mutations = {
  setCurrentTask(state, task) {
    state.currentTask = task
  },
  setTasks(state, tasks) {
    state.tasks = state.tasks.concat(tasks)
  },
  resetTasks(state) {
    state.tasks = []
  },
  setMeta(state, meta) {
    state.meta = meta
  },
  addTask(state, task) {
    state.tasks.unshift(task)
  },
  updateTask(state, updatedTask) {
    const taskIndex = state.tasks.findIndex(
      (task) => task.id === updatedTask.id
    )
    // state.tasks[taskIndex] = updatedTask
    Vue.set(state.tasks, taskIndex, updatedTask)
    state.currentTask = updatedTask
  },
  trashTask(state, task) {
    const index = state.tasks.indexOf(task)
    if (index > -1) {
      state.trashedTasks.push(task)
      state.tasks.splice(index, 1)
    }
  }
}

export const actions = {
  getTask(context, idArray) {
    return this.$axios
      .$get('/api/projects/' + idArray[0] + '/tasks/' + idArray[1])
      .then((response) => {
        context.commit('setCurrentTask', response.data)
      })
      .catch((error) => {
        this.$toast.error(error.response.data.message)
      })
  },
  getTasks(context, page) {
    if (page === 1) {
      context.commit('resetTasks')
    }
    return this.$axios
      .$get('/api/tasks?page=' + page)
      .then((response) => {
        context.commit('setTasks', response.data)
        context.commit('setMeta', response.meta)
      })
      .catch((error) => {
        this.$toast.error(error.response.data.message)
      })
  },
  addTask(context, task) {
    return this.$axios
      .$post('/api/projects/' + task.project_id + '/tasks', task)
      .then((response) => {
        context.commit('addTask', response.task)
        this.$toast.success(response.message)
        context.dispatch('getTasks', 1)
      })
      .catch((error) => {
        this.$toast.error(error.response.data.message)
        return error.response.data.errors
      })
  },
  updateTask(context, task) {
    return this.$axios
      .$patch('/api/projects/' + task.project_id + '/tasks/' + task.id, task)
      .then((response) => {
        context.commit('updateTask', response.task)
        context.dispatch('getTask', [
          response.task.project_id,
          response.task.id
        ])
        this.$toast.success(response.message)
      })
      .catch((error) => {
        this.$toast.error(error.response.data.message)
        return error.response.data.errors
      })
  },
  trashTask(context, task) {
    return this.$axios
      .$delete('/api/projects/' + task.project_id + '/tasks/' + task.id)
      .then((response) => {
        context.commit('trashTask', task)
        this.$toast.success('trashed')
      })
      .catch((error) => {
        this.$toast.error(error.response)
      })
  },
  restoreTask(context, task) {
    return this.$axios
      .$patch(
        '/api/projects/' + task.project_id + '/tasks/' + task.id + '/restore'
      )
      .then((response) => {
        this.$toast.success(response.message)
      })
      .catch((error) => {
        this.$toast.error(error.response)
      })
  },
  deleteTask(context, task) {
    return this.$axios
      .$delete(
        '/api/projects/' +
          task.project_id +
          '/tasks/' +
          task.id +
          '/forcedelete'
      )
      .then((response) => {
        this.$toast.success(response.message)
      })
      .catch((error) => {
        this.$toast.error(error.response)
      })
  },
  toggleCompleted(context, task) {
    return this.$axios
      .$patch(
        '/api/projects/' + task.project_id + '/tasks/' + task.id + '/completed',
        task
      )
      .then((response) => {
        context.commit('updateTask', response.task)
        this.$toast.success(response.message)
      })
      .catch((error) => {
        this.$toast.error(error.response.data.message)
        return error.response.data.errors
      })
  },
  toggleBilled(context, task) {
    return this.$axios
      .$patch(
        '/api/projects/' + task.project_id + '/tasks/' + task.id + '/billed',
        task
      )
      .then((response) => {
        context.commit('updateTask', response.task)
        this.$toast.success(response.message)
      })
      .catch((error) => {
        this.$toast.error(error.response.data.message)
        return error.response.data.errors
      })
  }
}

export const getters = {
  getCurrentTask: (state) => {
    return state.currentTask
  },
  getTasks: (state) => {
    return state.tasks
  },
  getMeta: (state) => {
    return state.meta
  },
  getAllTrashedTasks: (state) => {
    return state.trashedTasks
  }
}
