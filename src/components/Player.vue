<template>
  <div class="max-w-xl mx-auto py-6">
    <div @click="playSound('cricket')" class="cursor-pointer">
      Awkward cricket!
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Player',

  data() {
    return {
      client: null,
    }
  },

  created() {
    this.client = {};
  },
 
  methods: {
    playSound(soundName) {
      let audio = new Audio("local-audio/" + soundName + ".mp3");
      audio.play();
    }
  }
}
</script>
