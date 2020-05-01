<template>
  <form class="w-full" @submit.prevent="postClientForm">
    <InputField
      v-model="form.name"
      input-type="text"
      input-name="Client Name"
      :input-error="errors.name"
    />
    <InputField
      v-model="form.description"
      input-type="textarea"
      input-name="Client Description"
    />
    <InputField
      v-model="form.vat_abbr"
      input-type="text"
      input-name="VAT Abbreviation, e.g. 'DK'"
    />
    <InputField
      v-model="form.vat"
      input-type="text"
      input-name="VAT Number, e.g. '12345678'"
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
      errors: '',
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
      if (this.client) {
        await this.$store
          .dispatch('clients/updateClient', this.form)
          .then((response) => {
            if (response) {
              this.errors = response
            } else {
              this.clearForm('edit-client')
            }
          })
      } else {
        await this.$store
          .dispatch('clients/addClient', this.form)
          .then((response) => {
            if (response) {
              this.errors = response
            } else {
              this.clearForm('new-client')
            }
          })
      }
    },
    clearForm(modalName) {
      this.form.name = ''
      this.form.description = ''
      this.$modal.hide(modalName)
    }
  }
}
</script>
