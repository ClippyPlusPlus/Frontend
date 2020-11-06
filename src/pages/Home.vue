<template>
  <div class="max-w-5xl mx-auto py-6">
    <div class="grid grid-cols-2 gap-4">
      <button @click="sendMessage('Applaus')" class="transition duration-300 ease-in-out bg-gradient-to-r from-teal-400 to-blue-500 hover:from-blue-500 hover:to-teal-600 transform hover:-translate-y-1 hover:scale-110 text-2xl text-blue-900 hover:text-blue-200 rounded px-6 py-12 hover:z-10 hover:shadow-lg">
        Applaus 👏
      </button>
      <button @click="sendMessage('icq-uh-oh')" class="transition duration-300 ease-in-out bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-600 transform hover:-translate-y-1 hover:scale-110 text-2xl text-orange-900 hover:text-orange-200 rounded px-6 py-12 hover:z-10 hover:shadow-lg">
        Uh oh 😵
      </button>
      <button @click="sendMessage('Auto')" class="transition duration-300 ease-in-out bg-gradient-to-r from-pink-400 to-red-500 hover:from-red-500 hover:to-pink-600 transform hover:-translate-y-1 hover:scale-110 text-2xl text-red-900 hover:text-red-200 rounded px-6 py-12 hover:z-10 hover:shadow-lg">
        Auto 🚗
      </button>
      <button @click="sendMessage('Honden')" class="transition duration-300 ease-in-out bg-gradient-to-r from-indigo-400 to-purple-500 hover:from-purple-500 hover:to-indigo-600 transform hover:-translate-y-1 hover:scale-110 text-2xl text-purple-900 hover:text-purple-200 rounded px-6 py-12 hover:z-10 hover:shadow-lg">
        Honden 🐶
      </button>
      <button @click="sendMessage('cricket')" class="transition duration-300 ease-in-out bg-gradient-to-r from-green-400 to-teal-500 hover:from-teal-500 hover:to-green-600 transform hover:-translate-y-1 hover:scale-110 text-2xl text-teal-900 hover:text-teal-200 rounded px-6 py-12 hover:z-10 hover:shadow-lg">
        Crickets 🦗
      </button>      
      <button @click="sendMessage('Toilet')" class="transition duration-300 ease-in-out bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 transform hover:-translate-y-1 hover:scale-110 text-2xl text-gray-900 hover:text-gray-200 rounded px-6 py-12 hover:z-10 hover:shadow-lg">
        Toilet 🧻
      </button>
    </div>

    <div class="my-8"></div>

    <div @click="sendMessage('applause')" class="cursor-pointer">
      Knopje
    </div>
  </div>
</template>

<script>
import mqtt from 'mqtt'
import { playLocalSound } from '../utils/soundPlayer'

// @ is an alias to /src
export default {
  name: 'Home',

  data() {
    return {
      client: null,
    }
  },

  created() {
    this.client = mqtt.connect('ws://mqtt.eclipse.org:80/mqtt');
    this.client.subscribe("clippy-plus-plus/play");

    this.client.on("message", function (topic, payload) {
      var receivedObject = JSON.parse(payload);
      playLocalSound(receivedObject.sound);
    });
  },
 
  methods: {
    sendMessage(message) {
      console.log(message);
      this.client.publish("clippy-plus-plus/play",
        JSON.stringify({
          "sound": message + ".mp3",
          "source": "local"
        })
      );
    }
  }
}
</script>
