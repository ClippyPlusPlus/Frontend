<template>
  <div class="max-w-5xl mx-auto p-6 space-y-6">
    <div>
      <input @keydown.enter="sendTextMessage" v-model="text" type="text" placeholder="Typ iets..." class="w-full border-2 border-gray-200 p-4">
    </div>

    <div class="grid md:grid-cols-2 gap-4">
      <button @click="sendLocalSound('Applause')" class="transition duration-300 ease-in-out bg-gradient-to-r from-teal-400 to-blue-500 hover:from-blue-500 hover:to-teal-600 transform hover:-translate-y-1 hover:scale-110 text-2xl text-blue-900 hover:text-blue-200 rounded px-6 py-12 hover:z-10 hover:shadow-lg">
        Applaus 👏
      </button>
      <button @click="sendLocalSound('IcqUhOh')" class="transition duration-300 ease-in-out bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-600 transform hover:-translate-y-1 hover:scale-110 text-2xl text-orange-900 hover:text-orange-200 rounded px-6 py-12 hover:z-10 hover:shadow-lg">
        Uh oh 😵
      </button>
      <button @click="sendLocalSound('CarEngine')" class="transition duration-300 ease-in-out bg-gradient-to-r from-pink-400 to-red-500 hover:from-red-500 hover:to-pink-600 transform hover:-translate-y-1 hover:scale-110 text-2xl text-red-900 hover:text-red-200 rounded px-6 py-12 hover:z-10 hover:shadow-lg">
        Auto 🚗
      </button>
      <button @click="sendLocalSound('HumanVoice')" class="transition duration-300 ease-in-out bg-gradient-to-r from-indigo-400 to-purple-500 hover:from-purple-500 hover:to-indigo-600 transform hover:-translate-y-1 hover:scale-110 text-2xl text-purple-900 hover:text-purple-200 rounded px-6 py-12 hover:z-10 hover:shadow-lg">
        Helpdesk 👨‍💻
      </button>
      <button @click="sendLocalSound('Cricket')" class="transition duration-300 ease-in-out bg-gradient-to-r from-green-400 to-teal-500 hover:from-teal-500 hover:to-green-600 transform hover:-translate-y-1 hover:scale-110 text-2xl text-teal-900 hover:text-teal-200 rounded px-6 py-12 hover:z-10 hover:shadow-lg">
        Crickets 🦗
      </button>      
      <button @click="sendLocalSound('Toilet')" class="transition duration-300 ease-in-out bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 transform hover:-translate-y-1 hover:scale-110 text-2xl text-gray-900 hover:text-gray-200 rounded px-6 py-12 hover:z-10 hover:shadow-lg">
        Toilet 🧻
      </button>
      <button @click="sendLocalSound('Vacuum')" class="transition duration-300 ease-in-out bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 transform hover:-translate-y-1 hover:scale-110 text-2xl text-yellow-900 hover:text-yellow-200 rounded px-6 py-12 hover:z-10 hover:shadow-lg">
        Cleaning 💩🧹
      </button>
      <button @click="sendLocalSound('Modem')" class="transition duration-300 ease-in-out bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 transform hover:-translate-y-1 hover:scale-110 text-2xl text-pink-900 hover:text-pink-200 rounded px-6 py-12 hover:z-10 hover:shadow-lg">
        Modem 👾
      </button>
    </div>
  </div>
</template>

<script>
import mqtt from 'mqtt'
import { playSound } from '../utils/soundPlayer'
import { MESSAGE_TIMEOUT } from '../utils/constants'

// @ is an alias to /src
export default {
  name: 'Home',

  data() {
    return {
      client: null,
      text: '',
      canSendMessage: true,
    }
  },

  created() {
    this.client = mqtt.connect('wss://mqtt.eclipse.org:443/mqtt');
    this.client.subscribe("clippy-plus-plus/play");

    this.client.on("message", function (topic, payload) {
      var receivedObject = JSON.parse(payload);
      playSound(receivedObject);
    });
  },
 
  methods: {
    sendLocalSound(message) {
      if (this.canSendMessage) {
        let objectToPublish = {
          "sound": message + ".mp3",
          "source": "local"
        };

        this.client.publish("clippy-plus-plus/play", JSON.stringify(objectToPublish));

        this.messageTimeout();
      }
    },

    sendTextMessage() {
       if (this.canSendMessage) {
         let objectToPublish = {
          "sound": this.text,
          "source": "text"
        };

        this.client.publish("clippy-plus-plus/play", JSON.stringify(objectToPublish));

        this.text = '';
        this.messageTimeout();
       }
    },

    messageTimeout() {
      this.canSendMessage = false;
      const timeout = setTimeout(() => {
        this.canSendMessage = true;
        clearTimeout(timeout);
      }, MESSAGE_TIMEOUT);
    }
  }
}
</script>
