import Vue from 'vue'

export const state = () => ({
  currentTask: {},
  tasks: [],
  tasksMeta: [],
  taskActivity: [],
  taskActivityMeta: []
})

export const mutations = {
  SET_CURRENT_TASK(state, task) {
    state.currentTask = task
  },
  SET_TASKS(state, tasks) {
    state.tasks = state.tasks.concat(tasks)
  },
  RESET_TASKS(state) {
    state.tasks = []
  },
  SET_TASKS_META(state, meta) {
    state.tasksMeta = meta
  },
  ADD_TASK(state, task) {
    state.tasks.unshift(task)
  },
  UPDATE_TASK(state, updatedTask) {
    const taskIndex = state.tasks.findIndex(
      (task) => task.id === updatedTask.id
    )
    Vue.set(state.tasks, taskIndex, updatedTask)
    state.currentTask = updatedTask
  },
  TRASH_TASK(state, { task }) {
    state.tasks.splice(state.tasks.indexOf(task), 1)
  },
  SET_TASK_ACTIVITY(state, activities) {
    state.taskActivity = activities
  },
  SET_TASK_ACTIVITY_META(state, meta) {
    state.taskActivityMeta = meta
  }
}

export const actions = {
  async fetchTask(context, idArray) {
    return await this.$axios
      .$get('/api/projects/' + idArray[0] + '/tasks/' + idArray[1])
      .then((response) => {
        context.commit('SET_CURRENT_TASK', response.data)
      })
      .catch((error) => {
        if (error.response.status === 404) {
          this.$toast.show(
            'This task has been trashed. You need to restore it to see it.'
          )
          context.commit('SET_CURRENT_TASK', {})
        } else {
          this.$toast.error(error.response.data.message)
        }
        error({ statusCode: 404 })
      })
  },
  async fetchTasks(context, params) {
    let url = ''
    if (params.page === 1) {
      context.commit('RESET_TASKS')
    }
    if ('project' in params) {
      url = 'projects/' + params.project + '/'
    }
    return await this.$axios
      .$get('/api/' + url + 'tasks?page=' + params.page)
      .then((response) => {
        context.commit('SET_TASKS', response.data)
        context.commit('SET_TASKS_META', response.meta)
      })
      .catch((error) => {
        this.$toast.error(error.response.data.message)
      })
  },
  addTask(context, task) {
    return this.$axios
      .$post('/api/projects/' + task.project_id + '/tasks', task)
      .then((response) => {
        context.commit('ADD_TASK', response.task)
        this.$toast.success(response.message)
        context.dispatch('fetchTasks', 1)
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
        context.commit('UPDATE_TASK', response.task)
        context.dispatch('fetchTask', [
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
        context.commit('TRASH_TASK', task)
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
        context.commit('UPDATE_TASK', response.task)
        if (response.task.completed_at) {
          this.$toast.success(response.message)
        } else {
          this.$toast.show(response.message)
        }
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
        context.commit('UPDATE_TASK', response.task)
        if (response.task.billed_at) {
          this.$toast.success(response.message)
        } else {
          this.$toast.show(response.message)
        }
      })
      .catch((error) => {
        this.$toast.error(error.response.data.message)
        return error.response.data.errors
      })
  },
  async fetchTaskActivity(context, params) {
    return await this.$axios
      .$get(
        '/api/projects/' +
          params[0] +
          '/tasks/' +
          params[1] +
          '/activity?page=' +
          params[2]
      )
      .then((response) => {
        context.commit('SET_TASK_ACTIVITY', response.data)
        context.commit('SET_TASK_ACTIVITY_META', response.meta)
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
  getTasksMeta: (state) => {
    return state.tasksMeta
  },
  getTaskActivity: (state) => {
    return state.taskActivity
  },
  getTaskActivityMeta: (state) => {
    return state.taskActivityMeta
  }
}
