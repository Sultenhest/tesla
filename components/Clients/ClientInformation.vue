<template>
  <div class="w-full">
    <div class="w-full p-3">
      <small class="text-sm text-gray-700">Client Description</small>
      <p class="mt-3">{{ client.description }}</p>
    </div>

    <div class="flex">
      <div class="w-1/2 p-3">
        <small class="text-sm text-gray-700">Client Projects</small>
        <h4 class="text-xl mt-3">{{ client.projects_count }}</h4>
      </div>
      <div class="w-1/2 p-3">
        <small class="text-sm text-gray-700"></small>
        <h4 class="text-xl mt-3"></h4>
      </div>
    </div>

    <div class="flex items-center justify-between px-3">
      <small class="text-sm text-gray-700"
        >Last updated: <Moment :timestamp="client.updated_at"
      /></small>
      <div class="flex justify-end">
        <button class="button-teal mr-1">
          <nuxt-link :to="activitiesLink">
            <Icon icon-name="queue" icon-text="Activity" />
          </nuxt-link>
        </button>
        <button class="button-danger" @click="trash(client)">
          <Icon icon-name="trash" icon-text="Trash" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClientInformation',
  props: {
    client: {
      type: Object,
      required: true,
      default: () => null
    }
  },
  computed: {
    activitiesLink() {
      return this.$route.path + '/activities'
    }
  },
  methods: {
    async trash(client) {
      await this.$swal({
        title: 'Are you sure you want to trash this client?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#E53E3E',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('clients/trashClient', client)
          this.$router.push('/clients/trashed')
        }
      })
    }
  }
}
</script>
