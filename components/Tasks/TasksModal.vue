<template>
  <modal :name="name" height="auto">
    <Card :title="title" :center="true">
      <template v-slot:button>
        <button class="button" @click="$modal.hide(name)">
          <Icon icon-name="close" icon-text="Close" />
        </button>
      </template>
      <TasksForm
        :task="task"
        :project-id="projectId"
        @taskFormSubmitted="formSubmit()"
      />
    </Card>
  </modal>
</template>

<script>
import Card from '~/components/UI/Cards/Card.vue'
import Icon from '~/components/Icon.vue'
import TasksForm from '~/components/Tasks/TasksForm.vue'

export default {
  name: 'TasksModal',
  components: {
    Card,
    Icon,
    TasksForm
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
    task: {
      type: Object,
      default: () => null
    },
    projectId: {
      type: Number,
      required: false,
      default: 0
    }
  },
  methods: {
    formSubmit() {
      this.$emit('taskFormSubmitted', this.task)
    }
  }
}
</script>
