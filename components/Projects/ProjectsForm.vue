<template>
  <form class="w-full" @submit.prevent="postProjectForm">
    <div v-if="clientId === 0" class="input-group">
      <label>Client</label>
      <v-select
        v-model="form.client_id"
        label="name"
        :reduce="(client) => client.id"
        :options="getClients"
      ></v-select>
    </div>
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
    <button class="button-primary button-large" type="submit">
      Save
    </button>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'

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
    },
    clientId: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      errors: '',
      form: this.project
        ? { ...this.project }
        : {
            client_id: this.clientId ? this.clientId : '',
            title: '',
            description: ''
          }
    }
  },
  computed: {
    ...mapGetters('clients', ['getClients'])
  },
  created() {
    this.$store.dispatch('clients/fetchClients')
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
      this.$emit('projectFormSubmitted', this.task)
    }
  }
}
</script>
