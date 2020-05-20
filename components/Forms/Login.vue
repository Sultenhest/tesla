<template>
  <form class="login-form" @submit.prevent="login()">
    <InputField v-model="user.username" input-type="email" input-name="Email" />
    <InputField
      v-model="user.password"
      input-type="password"
      input-name="Password"
    />
    <div>
      <button class="button-primary button-large" type="submit">Login</button>
    </div>
  </form>
</template>

<script>
import InputField from '~/components/UI/Form/InputField.vue'

export default {
  name: 'Login',
  components: {
    InputField
  },
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      error: {}
    }
  },
  methods: {
    async login() {
      await this.$auth
        .loginWith('password_grant', {
          data: this.user
        })
        .then((response) => {
          this.$toast.success(
            'Hello again ' +
              this.$auth.user.name +
              ', you successfully logged in!'
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
.login-form {
  @apply w-full;
}
</style>
