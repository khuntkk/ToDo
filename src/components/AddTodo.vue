<template>
  <div class="add-todo">
    <div class="input-group">
      <input 
        type="text" 
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @keyup.enter="$emit('addTodo')" 
        placeholder="What needs to be done?"
        class="todo-input"
      >
      <button @click="$emit('addTodo')" class="add-btn">
        Add
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddTodo',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue', 'addTodo']
}
</script>