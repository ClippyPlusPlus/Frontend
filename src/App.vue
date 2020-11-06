<template>
  <div id="app">
     <div class="max-w-5xl mx-auto px-6 pt-6 flex items-center justify-between">
        <div class="inline-block bg-orange-500 p-3 text-white text-xl font-medium rounded">
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

    <div class="max-w-5xl mx-auto px-6 pt-6" v-if="loading">
        <svg class="animate-spin h-32 w-32 text-blue-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
  </div>
</template>

<script>
import { MESSAGE_TIMEOUT } from './utils/constants'

export default {
  data() {
    return {
      loading: true,
    }
  },
  mounted() {
    if (window.location.hostname === 'localhost') {
      this.loading = false;
      return;
    }

      const timeout = setTimeout(() => {
        this.loading = false;
        clearTimeout(timeout);
      }, MESSAGE_TIMEOUT);
    }
}
</script>