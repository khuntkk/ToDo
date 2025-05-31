<template>
  <div class="todo-item">
    <input 
      type="checkbox" 
      v-model="todo.completed" 
      @change="$emit('updateTodo', todo)" 
      class="todo-checkbox"
    >
    <span :class="['todo-text', { completed: todo.completed }]">
      {{ todo.text }}
    </span>
    <button @click="$emit('deleteTodo', todo.id)" class="delete-btn">
      🗑️
    </button>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  emits: ['updateTodo', 'deleteTodo']
}
</script>