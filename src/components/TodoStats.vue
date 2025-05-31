<template>
  <div class="stats">
    {{ completedCount }} of {{ totalCount }} tasks completed
    <span v-if="completedCount === totalCount">🎉</span>
  </div>
</template>

<script>
export default {
  name: 'TodoStats',
  props: {
    completedCount: {
      type: Number,
      default: 0
    },
    totalCount: {
      type: Number,
      default: 0
    }
  }
}
</script>