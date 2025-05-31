<template>
  <div class="todo-list">
    <TodoItem 
      v-for="todo in todos" 
      :key="todo.id" 
      :todo="todo"
      @update-todo="$emit('updateTodo', $event)"
      @delete-todo="$emit('deleteTodo', $event)"
    />
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue'

export default {
  name: 'TodoList',
  components: {
    TodoItem
  },
  props: {
    todos: {
      type: Array,
      default: () => []
    }
  },
  emits: ['updateTodo', 'deleteTodo']
}
</script>