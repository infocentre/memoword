<template>
  <div class="mdl-grid">
    <div v-for="word in list" v-bind:key="word.id" class="mdl-cell mdl-cell--12-col mdl-cell--4-col-phone">
      <input type="text" v-model="word.word" class="wordInput" :class="{showWord:word == editWord && 'wordword'== element}" @blur="changeWordDone(word)" @keyup.enter="changeWordDone(word)">
      <span @dblclick="changeWord(word, $event)" class="wordword">{{word.word}}</span>
      <input type="text" v-model="word.translation" class="wordInput" :class="{showWord:word == editWord && 'tran' == element}" @blur="changeWordDone(word)" @keyup.enter="changeWordDone(word)">
      <span @dblclick="changeWord(word, $event)" class="tran" >{{word.translation}}</span>
      <button @click="removeWord(word)">X</button>
    </div>
  </div>
</template>

<style>
.wordInput {
  display: none
}
.showWord {
  display: inline
}
</style>

<script>
import firebase from '../service/firebase'
export default {
  data () {
    return {
      list: this.$store.state.list,
      uid: this.$store.state.uid,
      editWord: null,
      element: null
    }
  },
  methods: {
    fetchUserWords: function () {
      var self = this
      firebase.init.database().ref('memoword').orderByChild('uid').equalTo(this.uid).on('value', function (snapshot) {
        var arr = []
        snapshot.forEach(function (data) {
          var dataToPush = data.val()
          dataToPush.id = data.key
          arr.push(dataToPush)
        })
        window.vm.$store.state.list = arr
        self.list = arr
        console.log(arr)
      })
    },
    changeWord: function (word, event) {
      console.log(event.target.className)
      this.element = event.target.className
      this.editWord = word
    },
    changeWordDone: function (word) {
      firebase.init.database().ref('memoword').child(word.id).update(word)
      this.editWord = null
      this.element = null
      console.log(word)
    },
    removeWord: function (word) {
      var wordToRemove = word.id
      this.$store.state.list.splice(this.list.indexOf(word), 1)
      firebase.init.database().ref('memoword').child(wordToRemove).remove()
    }
  },
  created () {
    this.fetchUserWords()
  },
  mounted () {
    this.$store.watch((state) => {
      return this.$store.state.list
    },
    (newVal, oldVal) => {
      this.list = newVal
    })
    this.$store.watch((state) => {
      return this.$store.state.uid
    },
    (newVal, oldVal) => {
      this.uid = newVal
      this.fetchUserWords()
    })
  }
}
</script>
