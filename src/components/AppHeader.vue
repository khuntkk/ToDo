<template>
  <div class="header">
    <h1>📝 My Todo List</h1>
    <p>Stay organized and productive</p>
    <button 
      v-if="showManualInstall" 
      @click="$emit('triggerInstall')" 
      class="manual-install-btn"
    >
      📱 Install App
    </button>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {
    showManualInstall: {
      type: Boolean,
      default: false
    }
  },
  emits: ['triggerInstall']
}
</script>