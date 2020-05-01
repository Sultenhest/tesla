<template>
  <tr>
    <td>{{ project.title }}</td>
    <td>
      <div v-if="project.client" class="text-teal-700">
        <nuxt-link :to="clientLink">{{ project.client.name }}</nuxt-link>
      </div>
    </td>
    <td class="text-right button flex justify-end">
      <nuxt-link :to="projectLink">
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
  name: 'ProjectsRow',
  props: {
    id: {
      type: Number,
      required: true
    },
    project: {
      type: Object,
      required: true
    }
  },
  computed: {
    projectLink() {
      return '/projects/' + this.id
    },
    clientLink() {
      if (this.project.client) {
        return '/clients/' + this.project.client.id
      }
      return ''
    }
  }
}
</script>
