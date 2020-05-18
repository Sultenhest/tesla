import Vue from 'vue'

export const state = () => ({
  currentTask: {},
  meta: [],
  tasks: [],
  trashedTasks: [],
  taskActivity: [],
  taskMeta: []
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
  },
  setTaskActivity(state, activities) {
    state.taskActivity = activities
  },
  setTaskMeta(state, meta) {
    state.taskMeta = meta
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
        if (error.response.status === 404) {
          this.$toast.show(
            'This task has been trashed. You need to restore it to see it.'
          )
          context.commit('setCurrentTask', {})
        } else {
          this.$toast.error(error.response.data.message)
        }
        error({ statusCode: 404 })
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
        this.$toast.show('Task was trashed.')
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
        this.$toast.show(response.message)
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
        this.$toast.show(response.message)
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
        this.$toast.show(response.message)
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
        this.$toast.show(response.message)
      })
      .catch((error) => {
        this.$toast.error(error.response.data.message)
        return error.response.data.errors
      })
  },
  getTaskActivity(context, params) {
    return this.$axios
      .$get(
        '/api/projects/' +
          params[0] +
          '/tasks/' +
          params[1] +
          '/activity?page=' +
          params[2]
      )
      .then((response) => {
        context.commit('setTaskActivity', response.data)
        context.commit('setTaskMeta', response.meta)
      })
      .catch((error) => {
        this.$toast.error(error.response.data.message)
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
  },
  getTaskActivity: (state) => {
    return state.taskActivity
  },
  getTaskMeta: (state) => {
    return state.taskMeta
  }
}
