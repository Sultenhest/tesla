<template>
  <form class="w-full" @submit.prevent="postProjectForm">
    <InputField
      v-model="form.title"
      input-type="text"
      input-name="Project Title"
      :input-error="errors.title"
    />
    <InputField
      v-model="form.description"
      input-type="textarea"
      input-name="Project Description"
    />
    <button class="button-primary" type="submit">
      Save
    </button>
  </form>
</template>

<script>
import InputField from '~/components/UI/Form/InputField.vue'

export default {
  name: 'ProjectsForm',
  components: {
    InputField
  },
  props: {
    project: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      errors: '',
      form: this.project
        ? { ...this.project }
        : {
            title: '',
            description: ''
          }
    }
  },
  methods: {
    async postProjectForm() {
      if (this.project) {
        await this.$store
          .dispatch('projects/updateProject', this.form)
          .then((response) => {
            if (response) {
              this.errors = response
            } else {
              this.clearForm('edit-project')
            }
          })
      } else {
        await this.$store
          .dispatch('projects/addProject', this.form)
          .then((response) => {
            if (response) {
              this.errors = response
            } else {
              this.clearForm('new-project')
            }
          })
      }
    },
    clearForm(modalName) {
      this.form.title = ''
      this.form.description = ''
      this.$modal.hide(modalName)
    }
  }
}
</script>
