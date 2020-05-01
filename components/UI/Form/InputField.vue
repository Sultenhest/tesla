<template>
  <div class="input-group">
    <label :for="inputName">{{ inputName }}</label>
    <input
      v-if="inputType === 'text'"
      type="text"
      :name="inputName"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <input
      v-if="inputType === 'password'"
      type="password"
      :name="inputName"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <input
      v-if="inputType === 'email'"
      type="email"
      :name="inputName"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <textarea
      v-if="inputType === 'textarea'"
      :name="inputName"
      :value="value"
      rows="5"
      @input="$emit('input', $event.target.value)"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: 'InputField',
  props: {
    inputType: {
      type: String,
      default: 'text'
    },
    inputName: {
      type: String,
      default: 'Default'
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.input-group {
  @apply flex flex-col mb-3;
}

.input-group label {
  @apply w-full text-sm text-gray-700;
}

.input-group input,
.input-group textarea {
  @apply mt-1 py-3 px-4 rounded shadow block bg-white border-gray-400 leading-6;
}
</style>
