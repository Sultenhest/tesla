<template>
  <div>
    {{ response }}
    <p>Name: {{ $auth.user.name }}</p>
    <p>Name: {{ $auth.user.email }}</p>
    <Card
      ><template v-slot:content>There aren't any failed jobs.</template></Card
    >

    <Card
      ><template v-slot:content>
        <form style="width:100%;">
          {{ textInput }}
          {{ passwordInput }}
          {{ emailInput }}
          {{ textAreaInput }}
          <InputField
            v-model="textInput"
            input-type="text"
            input-name="Text Input"
            default-value="Some value"
          />
          <InputField
            v-model="passwordInput"
            input-type="password"
            input-name="Password Input"
            default-value="Some value"
          />
          <InputField
            v-model="emailInput"
            input-type="email"
            input-name="Email Input"
            default-value="Some value"
          />
          <InputField
            v-model="textAreaInput"
            input-type="textarea"
            input-name="TextArea Input"
            default-value="Some value"
          />
        </form> </template
    ></Card>
  </div>
</template>

<script>
import Card from '~/components/UI/Cards/Card.vue'
import InputField from '~/components/UI/Form/InputField.vue'

export default {
  components: {
    Card,
    InputField
  },
  data() {
    return {
      response: {},
      textInput: '',
      passwordInput: '',
      emailInput: '',
      textAreaInput: ''
    }
  },
  mounted() {
    this.$axios.$get('api/user').then((response) => (this.response = response))
  }
}
</script>
