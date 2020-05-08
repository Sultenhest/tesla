<template>
  <div class="w-full">
    <div class="w-full p-3">
      <small class="text-sm text-gray-700">Description</small>
      <p class="mt-3">{{ client.description }}</p>
    </div>

    <div class="flex">
      <div class="w-1/2 p-3">
        <small class="text-sm text-gray-700">Projects</small>
        <h4 class="text-xl mt-3">{{ client.projects_count }}</h4>
      </div>
      <div class="w-1/2 p-3">
        <small class="text-sm text-gray-700">Tasks</small>
      </div>
    </div>

    <div class="flex items-center justify-between px-3">
      <small class="text-sm text-gray-700"
        >Last updated: {{ $moment(client.updated_at).fromNow() }}</small
      >
      <button class="button-danger" @click="trash(getCurrentClient)">
        <Icon icon-name="trash" icon-text="Trash" />
      </button>
    </div>
  </div>
</template>

<script>
import Icon from '~/components/Icon.vue'

export default {
  name: 'ClientInformation',
  components: {
    Icon
  },
  props: {
    client: {
      type: Object,
      required: true,
      default: () => null
    }
  },
  methods: {
    async trash(client) {
      await this.$swal({
        title: 'Are you sure you want to trash this client?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('clients/trashClient', client)
        }
      })
    }
  }
}
</script>
