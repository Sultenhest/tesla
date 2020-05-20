<template>
  <tr>
    <td>
      <nuxt-link :to="clientLink" class="text-teal-700">{{
        client.name
      }}</nuxt-link>
    </td>
    <td>
      <nuxt-link :to="projectsLink" class="text-teal-700">
        {{ client.projects_count }}
      </nuxt-link>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'ClientRow',
  props: {
    id: {
      type: Number,
      required: true
    },
    client: {
      type: Object,
      required: true
    }
  },
  computed: {
    clientLink() {
      return '/clients/' + this.id
    },
    projectsLink() {
      return '/clients/' + this.id + '/#client-projects'
    }
  }
}
</script>
