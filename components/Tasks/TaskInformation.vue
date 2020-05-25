<template>
  <div class="w-full">
    <div class="w-full p-3">
      <small class="text-sm text-gray-700">Task Description</small>
      <p class="mt-3">{{ task.description }}</p>
    </div>

    <div class="flex">
      <div class="w-1/3 p-3">
        <small class="text-sm text-gray-700">
          <Icon icon-name="time" icon-text="Time spent on task" />
        </small>
        <h4 class="text-xl mt-3">{{ timeSpent }}</h4>
      </div>
      <div class="w-1/3 p-3">
        <small class="text-sm text-gray-700">
          <Icon icon-name="checkmark-outline" icon-text="Task Completed" />
        </small>
        <h4 class="text-xl mt-3">
          <Moment :timestamp="task.completed_at" />
        </h4>
      </div>
      <div class="w-1/3 p-3">
        <small class="text-sm text-gray-700">
          <Icon icon-name="credit-card" icon-text="Task Billed" />
        </small>
        <h4 class="text-xl mt-3">
          <Moment :timestamp="task.billed_at" />
        </h4>
      </div>
    </div>

    <div class="flex items-center justify-between mt-3 px-3">
      <small class="text-sm text-gray-700">
        Last updated:
        <Moment :timestamp="task.updated_at" />
      </small>
      <div class="flex justify-end">
        <button class="button-teal mr-1">
          <nuxt-link :to="activitiesLink">
            <Icon icon-name="queue" icon-text="Activity" />
          </nuxt-link>
        </button>
        <button class="button-danger" @click="trash(task)">
          <Icon icon-name="trash" icon-text="Trash" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskInformation',
  props: {
    task: {
      type: Object,
      required: true,
      default: () => null
    }
  },
  computed: {
    timeSpent() {
      return this.task.hours_spent + 'h ' + this.task.minutes_spent + 'm'
    },
    activitiesLink() {
      return this.$route.path + '/activities'
    }
  },
  methods: {
    trash(task) {
      this.$swal({
        title: 'Are you sure you want to trash this task?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#E53E3E',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('tasks/trashTask', task)
          this.$router.push('/tasks')
        }
      })
    }
  }
}
</script>
