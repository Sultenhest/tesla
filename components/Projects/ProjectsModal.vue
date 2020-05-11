<template>
  <modal
    :name="name"
    height="auto"
    :max-width="600"
    :adaptive="true"
    :scrollable="true"
  >
    <Card :title="title" :center="true">
      <template v-slot:button>
        <button class="button" @click="$modal.hide(name)">
          <Icon icon-name="close" icon-text="Close" />
        </button>
      </template>
      <ProjectsForm
        :client-id="clientId"
        :project="project"
        @projectFormSubmitted="formSubmit()"
      />
    </Card>
  </modal>
</template>

<script>
import ProjectsForm from '~/components/Projects/ProjectsForm.vue'

export default {
  name: 'ClientsModal',
  components: {
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
    },
    clientId: {
      type: Number,
      required: false,
      default: 0
    }
  },
  methods: {
    formSubmit() {
      this.$emit('projectFormSubmitted', this.task)
    }
  }
}
</script>
