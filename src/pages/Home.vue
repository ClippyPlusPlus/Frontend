<template>
  <div class="max-w-5xl mx-auto py-6">
    <div class="grid grid-cols-2 gap-4">
      <button @click="sendMessage('Applaus')" class="transition duration-300 ease-in-out bg-gradient-to-r from-teal-400 to-blue-500 hover:from-blue-500 hover:to-teal-600 transform hover:-translate-y-1 hover:scale-110 text-2xl text-blue-900 hover:text-blue-200 rounded px-6 py-12 hover:z-10 hover:shadow-lg">
        Applaus 👏
      </button>
      <button @click="sendMessage('Honden')" class="transition duration-300 ease-in-out bg-gradient-to-r from-indigo-400 to-purple-500 hover:from-purple-500 hover:to-indigo-600 transform hover:-translate-y-1 hover:scale-110 text-2xl text-purple-900 hover:text-purple-200 rounded px-6 py-12 hover:z-10 hover:shadow-lg">
        Honden 🐶
      </button>
      <button @click="sendMessage('Uh oh')" class="transition duration-300 ease-in-out bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-600 transform hover:-translate-y-1 hover:scale-110 text-2xl text-orange-900 hover:text-orange-200 rounded px-6 py-12 hover:z-10 hover:shadow-lg">
        Uh oh 😵
      </button>
      <button @click="sendMessage('Auto')" class="transition duration-300 ease-in-out bg-gradient-to-r from-pink-400 to-red-500 hover:from-red-500 hover:to-pink-600 transform hover:-translate-y-1 hover:scale-110 text-2xl text-red-900 hover:text-red-200 rounded px-6 py-12 hover:z-10 hover:shadow-lg">
        Auto 🚗
      </button>
    </div>

    <div class="my-8"></div>

    <div @click="sendMessage('applause')" class="cursor-pointer">
      Knopje
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',

  data() {
    return {
      client: null,
    }
  },

  created() {
    this.client = {};
  },
 
  methods: {
    sendMessage(messsage) {
      console.log(messsage);
    }
  }
}
</script>
