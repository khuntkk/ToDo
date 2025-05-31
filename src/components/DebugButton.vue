<template>
  <button @click="$emit('toggle')" class="debug-toggle">
    Debug
  </button>
</template>

<script>
export default {
  name: 'DebugButton',
  emits: ['toggle']
}
</script>