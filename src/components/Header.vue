<template>
  <div class="max-w-5xl mx-auto px-6 pt-6 flex items-center justify-between">
    <div class="inline-block bg-orange-500 p-3 text-white text-xl font-medium rounded">
      Clippy++
    </div>
    <div>
      <span class="text-gray-700 text-sm uppercase font-medium">
        Status:
      </span>
      <span class="bg-gradient-to-r from-pink-400 to-orange-500 text-gray-900 p-2 rounded-full">
        {{ status }}
      </span>
    </div>
    <div class="bg-gray-200 rounded px-3 py-2 flex items-center space-x-2">
        <span class="flex h-4 w-4 relative">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
        </span>
      <div>
        {{ this.clientIsConnected ? "Live" : "Disconnected" }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',

  props: [ "clientIsConnected", "messageCount" ],

  computed: {
    status() {
      if (this.messageCount >= 50) { return "Crazy" }
      if (this.messageCount >= 30) { return "Verslaafde" }
      if (this.messageCount >= 20) { return "Grootmeester" }
      if (this.messageCount >= 10) { return "Professional" }
      if (this.messageCount >= 5) { return "Poweruser" }
      if (this.messageCount >= 3) { return "Starter" }
      return "Newbie";
    },
  }
}
</script>