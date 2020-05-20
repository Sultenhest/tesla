<template>
  <form class="register-form" @submit.prevent="register()">
    <InputField v-model="user.name" input-type="text" input-name="Name" />
    <InputField v-model="user.username" input-type="email" input-name="Email" />
    <InputField
      v-model="user.password"
      input-type="password"
      input-name="Password"
    />
    <div>
      <button class="button-primary button-large" type="submit">
        Register
      </button>
    </div>
  </form>
</template>

<script>
import InputField from '~/components/UI/Form/InputField.vue'

export default {
  name: 'Register',
  components: {
    InputField
  },
  data() {
    return {
      user: {
        name: '',
        username: '',
        password: ''
      },
      error: {}
    }
  },
  methods: {
    register() {
      return this.$axios
        .$post('/api/register', this.user)
        .then((response) => {
          this.login()
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
    },
    async login() {
      await this.$auth
        .loginWith('password_grant', {
          data: this.user
        })
        .then((response) => {
          this.$toast.success(
            'Hello ' + this.$auth.user.name + ', you successfully logged in!'
          )
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
    }
  }
}
</script>

<style scoped>
.register-form {
  @apply w-full;
}
</style>
