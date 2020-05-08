<template>
  <div class="home">
    <Card title="Login" :center="true" class="w-1/2">
      <button @click="currentView = 'login'">
        Login
      </button>
      <button @click="currentView = 'register'">
        Register
      </button>

      {{ currentView }}

      <ul class="flex">
        <li class="py-3 px-5">Login</li>
        <li class="py-3 px-5 text-teal-500 border-teal-500 border-b-2">
          Register
        </li>
      </ul>
      <form class="login-form" @submit.prevent="login()">
        <InputField
          v-model="user.username"
          input-type="email"
          input-name="Email"
        />
        <InputField
          v-model="user.password"
          input-type="password"
          input-name="Password"
        />
        <div>
          <button class="button-teal" type="submit">Login</button>
        </div>
      </form>
    </Card>
  </div>
</template>

<script>
import InputField from '~/components/UI/Form/InputField.vue'

export default {
  auth: 'guest',
  layout: 'basic',
  components: {
    InputField
  },
  data() {
    return {
      currentView: 'login',
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
        .catch(() => {
          this.$toast.error(
            'The server encountered an error while authenticating.'
          )
        })
    }
  }
}
</script>

<style>
.home {
  @apply flex items-center justify-center w-full;
}

.login-form {
  @apply w-full;
}
</style>
