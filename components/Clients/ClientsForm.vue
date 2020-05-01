<template>
  <form class="w-full" @submit.prevent="postClientForm">
    <InputField
      v-model="form.name"
      input-type="text"
      input-name="Client Name"
    />
    <InputField
      v-model="form.description"
      input-type="textarea"
      input-name="Client Description"
    />
    <button class="button-primary" type="submit">
      Save
    </button>
  </form>
</template>

<script>
import InputField from '~/components/UI/Form/InputField.vue'

export default {
  name: 'ClientsForm',
  components: {
    InputField
  },
  props: {
    client: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      form: this.client
        ? { ...this.client }
        : {
            name: '',
            description: ''
          }
    }
  },
  methods: {
    async postClientForm() {
      this.client
        ? await this.$store
            .dispatch('clients/updateClient', this.form)
            .then((response) => {
              this.form.name = ''
              this.form.description = ''
              this.$modal.hide('edit-client')
            })
        : await this.$store
            .dispatch('clients/addClient', this.form)
            .then((response) => {
              this.form.name = ''
              this.form.description = ''
              this.$modal.hide('new-client')
            })
    }
  }
}
</script>
