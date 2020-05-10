<template>
  <form class="w-full" @submit.prevent="postClientForm">
    <div class="flex">
      <InputField
        v-model="form.vat_abbr"
        class="flex-grow pr-2"
        input-type="text"
        input-name="VAT Abbreviation, e.g. 'DK'"
      />
      <InputField
        v-model="form.vat"
        class="flex-grow pr-2"
        input-type="text"
        input-name="VAT Number, e.g. '40293833'"
      />
    </div>
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
    async cvrLookUp() {
      if (this.form.vat_abbr === 'DK' && this.form.vat.length === 8) {
        await this.$axios
          .$get('https://cvrapi.dk/api?country=dk&vat=' + this.form.vat)
          .then((response) => {
            this.form.name = response.name
          })
      }
    },
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
