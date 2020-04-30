<template>
  <div class="home">
    <Card title="Login" class="w-1/2">
      <template v-slot:content>
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
            <button type="submit">Submit</button>
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from '~/components/UI/Card.vue'
import InputField from '~/components/UI/Form/InputField.vue'

export default {
  auth: 'guest',
  layout: 'basic',
  components: {
    Card,
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
