<template>
  <div class="home container">
    <form @submit.prevent="login()">
      <div>
        <label>Email</label>
        <input
          v-model="user.username"
          type="email"
          name="email"
          placeholder="Email"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          v-model="user.password"
          type="password"
          name="password"
          placeholder="Password"
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>

    <pre>
      {{ error }}
    </pre>
  </div>
</template>

<script>
export default {
  auth: 'guest',
  components: {},
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
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
</style>
