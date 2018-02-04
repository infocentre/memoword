<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--12-col mdl-cell--4-col-phone">
      <div v-if="words" >
        <div>
          <h1 @click="playSound">{{words.word}}</h1>
        </div>
        <div>
          <h2 style='text-align:right;'>{{words.translation}}</h2>
        </div>
      </div>
      <div style='text-align:center;'>
        <button @click="randomWord" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">represh</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      words: null,
      isLoading: true,
      name: '',
      selectedVoice: 0,
      synth: window.speechSynthesis,
      voiceList: [],
      computerSpeech: new window.SpeechSynthesisUtterance()
    }
  },
  methods: {
    randomWord: function () {
      let wordsList = this.$store.state.words
      let randomNumber = Math.floor(Math.random() * wordsList.length)
      this.words = wordsList[randomNumber]
    },
    playSound () {
      // it should be 'craic', but it doesn't sound right
      this.computerSpeech.text = this.words.word
      this.computerSpeech.voice = this.voiceList[this.selectedVoice]
      this.computerSpeech.lang = 'ko-kr'
      this.synth.speak(this.computerSpeech)
    }
  },
  mounted () {
    this.randomWord()
    // wait for voices to load
    // I can't get FF to work without calling this first
    // Chrome works on the onvoiceschanged function
    this.voiceList = this.synth.getVoices()
  }
}
</script>