<template
  ><table class="table">
    <thead>
      <tr>
        <th v-for="col in cols" :key="col">{{ col }}</th>
      </tr>
    </thead>
    <slot></slot></table
></template>

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
.table {
  @apply w-full;
}

.table thead {
  @apply border-gray-400 border-t border-b bg-gray-200 font-normal text-left;
}

.table tr {
  @apply flex;
}

.table tr th {
  @apply font-normal;
}

.table tr th,
.table tr td {
  @apply flex-1 py-4 px-5;
}

.table tbody tr:hover {
  @apply bg-gray-200;
}
</style>
