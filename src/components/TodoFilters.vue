<template>
  <div class="filters">
    <button 
      @click="$emit('update:modelValue', 'all')" 
      :class="['filter-btn', { active: modelValue === 'all' }]"
    >
      All ({{ todos.length }})
    </button>
    <button 
      @click="$emit('update:modelValue', 'active')"
      :class="['filter-btn', { active: modelValue === 'active' }]"
    >
      Active ({{ activeTodos.length }})
    </button>
    <button 
      @click="$emit('update:modelValue', 'completed')"
      :class="['filter-btn', { active: modelValue === 'completed' }]"
    >
      Completed ({{ completedTodos.length }})
    </button>
  </div>
</template>

<script>
export default {
  name: 'TodoFilters',
  props: {
    modelValue: {
      type: String,
      default: 'all'
    },
    todos: {
      type: Array,
      default: () => []
    },
    activeTodos: {
      type: Array,
      default: () => []
    },
    completedTodos: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modelValue']
}
</script>