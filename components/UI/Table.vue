<template>
  <div class="table-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th v-for="col in cols" :key="col">
            {{ col }}
          </th>
        </tr>
      </thead>
      <slot></slot>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    cols: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="css">
.table-wrapper {
  @apply overflow-x-auto;
}

.table {
  @apply w-full table-auto;
}

.table thead {
  @apply border-gray-400 border-t border-b bg-gray-200 font-normal text-left;
}

.table tr {
  @apply flex justify-between transition duration-300 ease-in-out;
}

.table tr th {
  @apply font-normal;
}

.table tr th,
.table tr td {
  @apply flex items-center py-4 px-5;
}

.table tr th:first-child,
.table tr td:first-child {
  @apply w-3/5;
}

.table tr th:not(:first-child),
.table tr td:not(:first-child) {
  @apply flex-1;
}

.table tr th:last-child,
.table tr td:last-child {
  @apply w-1/3 flex-none;
}

@media (max-width: 1024px) {
  .table tbody {
    box-shadow: inset 0 3px 3px 0 rgba(0, 0, 0, 0.1),
      inset 0 -3px 3px 0 rgba(0, 0, 0, 0.1);
  }
}

.table tbody tr:hover {
  @apply bg-gray-200 cursor-pointer;
}
</style>
