<template>
  <modal :name="name" height="auto">
    <Card :title="title">
      <template v-slot:button>
        <button class="button" @click="$modal.hide(name)">
          <Icon icon-name="close" icon-text="Close" />
        </button>
      </template>
      <template v-slot:content>
        <ProjectsForm :project="project" />
      </template>
    </Card>
  </modal>
</template>

<script>
import Card from '~/components/UI/Cards/Card.vue'
import Icon from '~/components/Icon.vue'
import ProjectsForm from '~/components/Projects/ProjectsForm.vue'

export default {
  name: 'ClientsModal',
  components: {
    Card,
    Icon,
    ProjectsForm
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
    project: {
      type: Object,
      default: () => null
    }
  }
}
</script>
