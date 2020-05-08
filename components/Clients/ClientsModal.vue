<template>
  <modal :name="name" height="auto">
    <Card :title="title" :center="true">
      <template v-slot:button>
        <button class="button" @click="$modal.hide(name)">
          <Icon icon-name="close" icon-text="Close" />
        </button>
      </template>
      <ClientsForm :client="client" />
    </Card>
  </modal>
</template>

<script>
import Card from '~/components/UI/Cards/Card.vue'
import Icon from '~/components/Icon.vue'
import ClientsForm from '~/components/Clients/ClientsForm.vue'

export default {
  name: 'ClientsModal',
  components: {
    Card,
    Icon,
    ClientsForm
  },
  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    client: {
      type: Object,
      default: () => null
    }
  }
}
</script>
