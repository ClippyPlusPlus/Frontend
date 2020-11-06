<template>
  <div class="max-w-5xl mx-auto p-6 space-y-6">
    <div class="bg-gray-100 rounded p-4 flex justify-between">
        <div>
          <div v-if="!canSendMessage" class="text-red-700 text-sm flex items-center">
            <svg class="animate-spin h-5 w-5 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Even wachten tot je weer een bericht mag sturen...
          </div>
          <div class="text-green-700 text-sm" v-else>
            Klaar om te versturen!
          </div>
        </div>
        <div>
          <span class="text-gray-700 text-sm uppercase font-medium">
            Status:
          </span>
          <span class="bg-gradient-to-r from-pink-400 to-orange-500 text-gray-900 p-2 rounded-full">
            {{ status }}
          </span>
        </div>
    </div>

    <div class="flex" v-if="textMessageEnabled">
      <div class="flex-grow">
        <input @keydown.enter="sendTextMessage" v-model="text" type="text" placeholder="Typ iets..." class="w-full border-2 border-gray-200 p-4">
      </div>
      <div class="px-4 text-gray-500 flex items-center hover:text-orange-600 cursor-pointer" @click="sendTextMessage" title="Versturen...">
        <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
      </div>
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
      <button @click="sendLocalSound('Vacuum')" class="transition duration-300 ease-in-out bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-yellow-500 hover:to-orange-600 transform hover:-translate-y-1 hover:scale-110 text-2xl text-yellow-900 hover:text-yellow-200 rounded px-6 py-12 hover:z-10 hover:shadow-lg">
        Cleaning 💩🧹
      </button>
      <button @click="sendLocalSound('Modem')" class="transition duration-300 ease-in-out bg-gradient-to-r from-red-400 to-pink-500 hover:from-pink-500 hover:to-red-600 transform hover:-translate-y-1 hover:scale-110 text-2xl text-pink-900 hover:text-pink-200 rounded px-6 py-12 hover:z-10 hover:shadow-lg">
        Modem 👾
      </button>
    </div>
  </div>
</template>

<script>
import mqtt from 'mqtt'
import { MESSAGE_TIMEOUT } from '../utils/constants'

// @ is an alias to /src
export default {
  name: 'Home',

  props: [ "initialClient" ],

  data() {
    return {
      client: this.initialClient,
      text: '',
      canSendMessage: true,
      messageCount: 0,
      textMessageEnabled: false,
    }
  },

  created() {
      const messageCount = localStorage.getItem('messageCount');
      if (messageCount) {
        this.messageCount = parseInt(messageCount);
        this.determineUpgrades();
      }
  },

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
  },
 
  methods: {
    sendLocalSound(message) {
      if (this.canSendMessage) {
        let objectToPublish = {
          "sound": message + ".mp3",
          "source": "local"
        };

        this.emitMessage(objectToPublish);
      }
    },

    sendTextMessage() {
      if (!this.textMessageEnabled) {
        return;
      }

      if (this.text.trim() === '') {
        return;
      }

       if (this.canSendMessage) {
         let objectToPublish = {
          "sound": this.text,
          "source": "text"
        };

        this.emitMessage(objectToPublish);

        this.text = '';
       }
    },

    emitMessage(objectToPublish) {
        this.client.publish("clippy-plus-plus/play", JSON.stringify(objectToPublish));
        this.increaseMessageCount();
        this.messageTimeout();
    },

    messageTimeout() {
      this.canSendMessage = false;
      const timeout = setTimeout(() => {
        this.canSendMessage = true;
        clearTimeout(timeout);
      }, MESSAGE_TIMEOUT);
    },

  increaseMessageCount () {
      this.messageCount++;
      localStorage.setItem('messageCount', this.messageCount);
      this.determineUpgrades();
    },

    determineUpgrades() {
      if (this.messageCount >= 5) {
        this.textMessageEnabled = true;
      }
    }
  }
}
</script>
