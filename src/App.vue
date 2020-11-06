<template>
  <div id="app">
    <Header 
      :clientIsConnected="clientIsConnected"
      :messageCount="messageCount"
    />

    <div class="max-w-5xl mx-auto px-6 pt-6" v-if="loading">
        <svg class="animate-spin h-32 w-32 text-blue-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>

    <Home :initialClient="client" v-if="!loading" />
  </div>
</template>

<script>
import { MESSAGE_TIMEOUT } from './utils/constants'
import mqtt from 'mqtt'
import Header from './components/Header.vue'
import Home from './pages/Home.vue'
import { playSound } from './utils/soundPlayer'

export default {
  name: "App",

  components: {
    Header,
    Home
  },

  data() {
    return {
      loading: true,
      messageCount: 0,
      client: null,
      clientIsConnected: false
    }
  },

  created() {
    this.$eventBus.$on('messageSent', this.increaseMessageCount);
    const messageCount = localStorage.getItem('messageCount');
    this.messageCount = messageCount;
    this.initializeClient();
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
  },

  methods: {
    increaseMessageCount () {
      this.messageCount++;
      localStorage.setItem('messageCount', this.messageCount);
    },

    initializeClient() {
      this.client = mqtt.connect('wss://mqtt.eclipse.org:443/mqtt');
      this.client.subscribe("clippy-plus-plus/play");

      this.client.on("message", function (topic, payload) {
        var receivedObject = JSON.parse(payload);
        playSound(receivedObject);
      });

      this.client.on("connect", () => {
        console.log("connected");
        this.clientIsConnected = true;
      });
    }
  }
}
</script>