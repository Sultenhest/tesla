<template><div></div></template>

<script>
export default {
  async created() {
    await this.$auth
      .logout('password_grant')
      .then((response) => {
        this.$toast.success('Successfully logged you out!')
        this.$router.replace({ path: '/' })
      })
      .catch(() => {
        this.$toast.error(
          'The server encountered an error while logging you out. Please try again.'
        )
      })
    /*
    this.$store
      .dispatch('custom_auth/destroyToken')
      .then(() => this.$router.replace({ path: '/' }))
    */
  }
}
</script>
