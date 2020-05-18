<template>
  <form class="w-full" @submit.prevent="postTaskForm">
    <InputField
      v-model="form.title"
      input-type="text"
      input-name="Task Title"
      :input-error="errors.title"
    />
    <InputField
      v-model="form.description"
      input-type="textarea"
      input-name="Task Description"
    />
    <div class="flex">
      <InputField
        v-model="form.hours_spent"
        class="flex-grow pr-2"
        input-type="number"
        input-name="Hours Spent"
        :input-error="errors.hours_spent"
      />
      <InputField
        v-model="form.minutes_spent"
        class="flex-grow pl-2"
        input-type="number"
        input-name="Minutes Spent"
        :input-error="errors.minutes_spent"
      />
    </div>
    <button class="button-primary" type="submit">
      Save
    </button>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'

import InputField from '~/components/UI/Form/InputField.vue'

export default {
  name: 'TasksForm',
  components: {
    InputField
  },
  props: {
    task: {
      type: Object,
      default: () => null
    },
    projectId: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      errors: '',
      form: this.task
        ? { ...this.task }
        : {
            project_id: this.projectId ? this.projectId : '',
            title: '',
            description: '',
            hours_spent: '',
            minutes_spent: ''
          }
    }
  },
  computed: {
    ...mapGetters('projects', ['getAllProjects'])
  },
  created() {
    this.$store.dispatch('projects/getProjects')
  },
  methods: {
    async postTaskForm() {
      if (this.task) {
        await this.$store
          .dispatch('tasks/updateTask', this.form)
          .then((response) => {
            if (response) {
              this.errors = response
            } else {
              this.clearForm('edit-task')
            }
          })
      } else {
        await this.$store
          .dispatch('tasks/addTask', this.form)
          .then((response) => {
            if (response) {
              this.errors = response
            } else {
              this.clearForm('new-task')
            }
          })
      }
    },
    clearForm(modalName) {
      this.form.title = ''
      this.form.description = ''
      this.$modal.hide(modalName)
      this.$emit('taskFormSubmitted', this.task)
    }
  }
}
</script>
