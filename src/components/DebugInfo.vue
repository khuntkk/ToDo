<template>
  <div class="debug-info">
    <div><strong>PWA Debug Info:</strong></div>
    <div>beforeinstallprompt fired: {{ debugInfo.promptFired ? '✅' : '❌' }}</div>
    <div>Service Worker: {{ debugInfo.swRegistered ? '✅' : '❌' }}</div>
    <div>Standalone mode: {{ debugInfo.isStandalone ? '✅' : '❌' }}</div>
    <div>Platform: {{ debugInfo.platform }}</div>
    <div>Protocol: {{ debugInfo.protocol }}</div>
    <div>Install available: {{ debugInfo.canInstall ? '✅' : '❌' }}</div>
  </div>
</template>

<script>
export default {
  name: 'DebugInfo',
  props: {
    debugInfo: {
      type: Object,
      required: true
    }
  }
}
</script>