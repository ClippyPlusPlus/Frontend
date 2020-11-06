<template>
  <div id="app">
     <div class="max-w-5xl mx-auto px-6 pt-6 flex items-center justify-between">
        <div class="inline-block bg-blue-700 p-3 text-blue-100 text-xl font-medium rounded">
          Clippy++
        </div>
        <div class="bg-gray-200 rounded px-3 py-2 flex items-center space-x-2">
            <span class="flex h-4 w-4 relative">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
            </span>
          <div>
            Live
          </div>
        </div>
    </div>
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> -->
    </div>
    <router-view/>
  </div>
</template>
