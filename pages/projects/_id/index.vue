<template>
  <div>
    <modal name="edit-project" height="auto">
      <Card title="Edit Project">
        <template v-slot:button>
          <button class="button" @click="$modal.hide('edit-project')">
            <Icon icon-name="close" icon-text="Close" />
          </button>
        </template>
        <template v-slot:content>
          <ProjectsForm :project="getCurrentProject" />
        </template>
      </Card>
    </modal>

    <button class="button mb-3">
      <nuxt-link to="/projects">
        <Icon icon-name="arrow-thin-left" icon-text="Back" class="text-black" />
      </nuxt-link>
    </button>

    <Card :title="getCurrentProject.title">
      <template v-slot:button>
        <button class="button-teal" @click="$modal.show('edit-project')">
          <Icon icon-name="edit-pencil" icon-text="Edit Project" />
        </button>
      </template>
      <template v-slot:content>
        {{ getCurrentProject }}
        <button class="button-danger" @click="trash(getCurrentProject)">
          <Icon icon-name="trash" icon-text="Trash" />
        </button>
      </template>
    </Card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Card from '~/components/UI/Cards/Card.vue'
import Icon from '~/components/Icon.vue'
import ProjectsForm from '~/components/Projects/ProjectsForm.vue'

export default {
  components: {
    Card,
    Icon,
    ProjectsForm
  },
  async fetch({ store, params }) {
    await store.dispatch('projects/getProject', params.id)
  },
  computed: {
    ...mapGetters('projects', ['getCurrentProject'])
  },
  methods: {
    async trash(project) {
      await this.$swal({
        title: 'Are you sure you want to trash this project?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('projects/trashProject', project)
        }
      })
    }
  }
}
</script>

<style lang="css" scoped></style>
