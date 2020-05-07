<template>
  <tr>
    <td>
      <nuxt-link :to="clientLink" class="text-teal-700">{{
        client.name
      }}</nuxt-link>
    </td>
    <td>
      <nuxt-link :to="clientProjectsLink" class="text-teal-700">
        {{ client.projects_count }}
      </nuxt-link>
    </td>
    <td class="text-right button flex justify-end">
      <nuxt-link :to="clientLink">
        <svgicon
          name="information-outline"
          width="18"
          height="18"
          class="mr-1"
        ></svgicon>
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
    clientProjectsLink() {
      return this.clientLink + '/projects'
    }
  }
}
</script>
