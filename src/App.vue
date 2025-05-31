<template>
  <div>
    <DebugButton @toggle="toggleDebug" />
    
    <DebugInfo 
      v-if="showDebug" 
      :debug-info="debugInfo" 
    />

    <div class="app">
      <AppHeader 
        :show-manual-install="showManualInstall"
        @trigger-install="triggerInstall"
      />

      <AddTodo 
        v-model="newTodo"
        @add-todo="addTodo"
      />

      <TodoFilters 
        v-model="currentFilter"
        :todos="todos"
        :active-todos="activeTodos"
        :completed-todos="completedTodos"
      />

      <TodoList 
        v-if="filteredTodos.length > 0"
        :todos="filteredTodos"
        @update-todo="updateTodo"
        @delete-todo="deleteTodo"
      />

      <EmptyState v-else />

      <TodoStats 
        v-if="todos.length > 0"
        :completed-count="completedTodos.length"
        :total-count="todos.length"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import TodoDB from './composables/TodoDB.js'
import { usePWA } from './composables/usePWA.js'

import DebugButton from './components/DebugButton.vue'
import DebugInfo from './components/DebugInfo.vue'
import AppHeader from './components/AppHeader.vue'
import AddTodo from './components/AddTodo.vue'
import TodoFilters from './components/TodoFilters.vue'
import TodoList from './components/TodoList.vue'
import EmptyState from './components/EmptyState.vue'
import TodoStats from './components/TodoStats.vue'

export default {
  name: 'App',
  components: {
    DebugButton,
    DebugInfo,
    AppHeader,
    AddTodo,
    TodoFilters,
    TodoList,
    EmptyState,
    TodoStats
  },
  setup() {
    const todos = ref([])
    const newTodo = ref('')
    const currentFilter = ref('all')
    const db = new TodoDB()
    const showDebug = ref(false)

    const { 
      showManualInstall, 
      debugInfo, 
      triggerInstall 
    } = usePWA()

    const activeTodos = computed(() =>
      todos.value.filter(todo => !todo.completed)
    )

    const completedTodos = computed(() =>
      todos.value.filter(todo => todo.completed)
    )

    const filteredTodos = computed(() => {
      switch (currentFilter.value) {
        case 'active':
          return activeTodos.value
        case 'completed':
          return completedTodos.value
        default:
          return todos.value
      }
    })

    const loadTodos = async () => {
      try {
        const loadedTodos = await db.getAllTodos()
        todos.value = loadedTodos.sort((a, b) => b.id - a.id)
      } catch (error) {
        console.error('Error loading todos:', error)
      }
    }

    const addTodo = async () => {
      if (!newTodo.value.trim()) return

      const todo = {
        id: Date.now(),
        text: newTodo.value.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      }

      try {
        await db.addTodo(todo)
        todos.value.unshift(todo)
        newTodo.value = ''
      } catch (error) {
        console.error('Error adding todo:', error)
      }
    }

    const updateTodo = async (todo) => {
      try {
        await db.updateTodo(todo)
      } catch (error) {
        console.error('Error updating todo:', error)
      }
    }

    const deleteTodo = async (id) => {
      try {
        await db.deleteTodo(id)
        todos.value = todos.value.filter(todo => todo.id !== id)
      } catch (error) {
        console.error('Error deleting todo:', error)
      }
    }

    const toggleDebug = () => {
      showDebug.value = !showDebug.value
    }

    onMounted(async () => {
      try {
        await db.init()
        await loadTodos()
      } catch (error) {
        console.error('Error initializing app:', error)
      }
    })

    return {
      todos,
      newTodo,
      currentFilter,
      activeTodos,
      completedTodos,
      filteredTodos,
      addTodo,
      updateTodo,
      deleteTodo,
      showManualInstall,
      showDebug,
      debugInfo,
      toggleDebug,
      triggerInstall
    }
  }
}
</script>