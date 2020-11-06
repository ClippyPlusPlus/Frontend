<template>
  <div class="max-w-xl mx-auto py-6">
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
    sendMessage() {
      console.log("message");
    }
  }
}
</script>
