<template>
  <div class="max-w-5xl mx-auto px-6 pt-6 flex items-center justify-between">
    <div class="inline-block bg-orange-500 p-3 text-white text-xl font-medium rounded">
      Clippy++
    </div>

    <div class="bg-gray-200 rounded px-3 py-2 flex items-center space-x-2">
        <span class="flex h-4 w-4 relative" v-if="clientIsConnected">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
        </span>        
        <span class="flex h-4 w-4 relative" v-if="!clientIsConnected">
          <span class="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
        </span>
      <div>
        {{ clientIsConnected ? "Live" : "Disconnected" }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',

  props: [ "clientIsConnected" ],
}
</script>