<template>
  <div class="home flex-col">
    <Card :title="currentView" class="w-11/12 lg:w-1/2">
      <div class="center-content">
        <transition name="page" mode="out-in">
          <Login v-if="currentView === 'Login'" />
          <Register v-if="currentView === 'Register'" />
        </transition>

        <div
          class="w-full cursor-pointer mt-3 text-sm text-center text-gray-700"
        >
          <small
            v-if="currentView === 'Login'"
            @click="currentView = 'Register'"
          >
            Don't have a profile? Click here to register
          </small>
          <small
            v-if="currentView === 'Register'"
            @click="currentView = 'Login'"
          >
            Already have a profile? Click here to login
          </small>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import Login from '~/components/Forms/Login.vue'
import Register from '~/components/Forms/Register.vue'

export default {
  auth: 'guest',
  layout: 'basic',
  components: {
    Login,
    Register
  },
  data() {
    return {
      currentView: 'Login',
      response: ''
    }
  }
}
</script>

<style>
.home {
  @apply flex items-center justify-center w-full;
}
</style>
