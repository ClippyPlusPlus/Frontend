<template>
  <div id="app">
    <Header :clientIsConnected="clientIsConnected" />

    <div class="max-w-5xl mx-auto px-6 pt-6" v-if="loading">
        <svg class="animate-spin h-32 w-32 text-blue-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>

    <Home :initialClient="client" v-if="!loading" />

    <div class="max-w-5xl mx-auto px-6 pt-6 text-center text-sm text-gray-600 py-6">
      Copyright &copy; Infinithon Team Clippy++ 2020 - No Rights Reserved - Eet meer fruit
    </div>
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
      client: null,
      clientIsConnected: false
    }
  },

  created() {
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
    initializeClient() {
      this.client = mqtt.connect('wss://mqtt.eclipseprojects.io:443/mqtt');
      this.client.subscribe("clippy-plus-plus/play");

      this.client.on("message", function (topic, payload) {
        var receivedObject = JSON.parse(payload);
        playSound(receivedObject);
      });

      const connectedClientEvents = ["connect"];
      const disconnectedClientEvents = ["close", "disconnect", "offline", "error", "end"];

      for (const connectedEvent of connectedClientEvents) {
        this.client.on(connectedEvent, () => {
          this.setClientIsConnected(true);
        });
      }

      for (const disconnectedEvent of disconnectedClientEvents) {
        this.client.on(disconnectedEvent, () => {
          this.setClientIsConnected(false);
        });
      }
    },

    setClientIsConnected (isConnected) {
      this.clientIsConnected = isConnected
    }
  }
}
</script>