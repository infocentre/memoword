<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--12-col mdl-cell--4-col-phone">
      <div v-if="words" >
        <div>
          <h1 @click="playSound">{{words.word}}</h1>
        </div>
        <div>
          <h4 style='text-align:right;'>{{words.translation}}</h4>
        </div>
      </div>
      <div style='text-align:center;'>
        <button @click="randomWord" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">represh</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '../service/firebase'
export default {
  data () {
    return {
      words: null,
      isLoading: true,
      name: '',
      selectedVoice: 1,
      synth: window.speechSynthesis,
      voiceList: [],
      uid: this.$store.state.uid,
      computerSpeech: new window.SpeechSynthesisUtterance()
    }
  },
  methods: {
    randomWord: function () {
      firebase.init.database().ref('memoword').orderByChild('uid').equalTo(this.uid).on('value', function (snapshot) {
        var arr1 = []
        snapshot.forEach(function (data) {
          arr1.push(data.val())
        })
        window.vm.$store.state.words = arr1
      })
      let wordsList = this.$store.state.words
      let randomNumber = Math.floor(Math.random() * wordsList.length)
      this.words = wordsList[randomNumber]
    },
    playSound () {
      // it should be 'craic', but it doesn't sound right
      this.computerSpeech.text = this.words.word
      this.computerSpeech.voice = this.voiceList[this.selectedVoice]
      this.computerSpeech.lang = 'en-us'
      this.synth.speak(this.computerSpeech)
    }
  },
  created () {
    this.$store.watch((state) => {
      return this.$store.state.words
    },
    (newVal, oldVal) => {
      let wordsList = this.$store.state.words
      let randomNumber = Math.floor(Math.random() * wordsList.length)
      this.words = wordsList[randomNumber]
    })

    this.$store.watch((state) => {
      return this.$store.state.uid
    },
    (newVal, oldVal) => {
      this.uid = newVal
      this.randomWord()
    })
    if (this.$store.state.uid) {
      this.randomWord()
    }
    // wait for voices to load
    // I can't get FF to work without calling this first
    // Chrome works on the onvoiceschanged function
    this.voiceList = this.synth.getVoices()
  }
}
</script>