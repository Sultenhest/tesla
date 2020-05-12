<template>
  <div class="w-full h-full flex flex-col">
    <div class="w-full p-3">
      <small class="text-sm text-gray-700">Project Description</small>
      <p class="mt-3">{{ project.description }}</p>
    </div>

    <div class="flex">
      <div class="w-full p-3">
        <PercentageBar
          :green="project.completed_tasks"
          :red="project.incompleted_tasks"
          :total="project.tasks_count"
        />
      </div>
    </div>

    <div class="flex">
      <div class="w-1/3 p-3">
        <small class="text-sm text-gray-700">Project Tasks</small>
        <h4 class="text-xl mt-3">{{ project.tasks_count }}</h4>
      </div>
      <div class="w-1/3 p-3">
        <small class="text-sm text-gray-700">Completed Project Tasks</small>
        <h4 class="text-xl mt-3">{{ project.completed_tasks }}</h4>
      </div>
      <div class="w-1/3 p-3">
        <small class="text-sm text-gray-700">Incompleted Project Tasks</small>
        <h4 class="text-xl mt-3">{{ project.incompleted_tasks }}</h4>
      </div>
    </div>

    <div class="mt-auto flex items-center justify-between px-3">
      <small class="text-sm text-gray-700"
        >Last updated: <Moment :timestamp="project.updated_at"
      /></small>
      <button class="button-danger" @click="trash(project)">
        <Icon icon-name="trash" icon-text="Trash" />
      </button>
    </div>
  </div>
</template>

<script>
import PercentageBar from '~/components/Charts/PercentageBar.vue'

export default {
  name: 'ProjectInformation',
  components: {
    PercentageBar
  },
  props: {
    project: {
      type: Object,
      required: true,
      default: () => null
    }
  },
  methods: {
    async trash(project) {
      await this.$swal({
        title: 'Are you sure you want to trash this project?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#E53E3E',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('projects/trashProject', project)
          this.$router.back()
        }
      })
    }
  }
}
</script>
