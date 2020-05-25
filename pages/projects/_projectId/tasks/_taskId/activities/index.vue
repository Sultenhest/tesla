<template>
  <div>
    <ActivitiesModal />

    <Card :title="cardTitle">
      <template v-slot:button>
        <button class="button-teal">
          <nuxt-link :to="taskLink">
            <Icon icon-name="view-carousel" icon-text="Go to Task" />
          </nuxt-link>
        </button>
      </template>
      <Table
        :cols="['Subject Type', 'Activity', 'Changes', 'At']"
        :equal-width="true"
      >
        <nuxt-child :key="$route.query.page" />
      </Table>
      <div class="card-footer">
        <Pagination :base="paginationBaseUrl" :meta="getTaskActivityMeta" />
      </div>
    </Card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ActivitiesModal from '~/components/Activities/ActivitiesModal.vue'
import Table from '~/components/UI/Table.vue'
import Pagination from '~/components/UI/Navigation/Pagination.vue'

export default {
  components: {
    ActivitiesModal,
    Table,
    Pagination
  },
  fetch({ store, params, query }) {
    store.dispatch('tasks/fetchTask', [params.projectId, params.taskId])
    store.dispatch('tasks/fetchTaskActivity', [
      params.projectId,
      params.taskId,
      query.page
    ])
  },
  computed: {
    ...mapGetters('tasks', ['getCurrentTask', 'getTaskActivityMeta']),
    cardTitle() {
      return this.getCurrentTask.title + ' Activities'
    },
    taskLink() {
      return (
        '/projects/' +
        this.$route.params.projectId +
        '/tasks/' +
        this.$route.params.taskId
      )
    },
    paginationBaseUrl() {
      return this.$route.path
    }
  },
  watchQuery: ['page']
}
</script>
