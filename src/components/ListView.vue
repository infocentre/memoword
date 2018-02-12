<template>
  <div>
    <div v-for="word in list">
      <input type="text" v-model="word.word" @blur="changeWordDone(word)" @keyup.enter="changeWordDone(word)">
      <span @dblclick="changeWord(word)">{{word.word}}</span>
      <input type="text" v-model="word.translation" @blur="changeWordDone(word)" @keyup.enter="changeWordDone(word)">
      <span>{{word.translation}}</span>
      <button @click="removeWord(word)">X</button>
    </div>
  </div>
</template>
<script>
import firebase from '../service/firebase'
export default {
  data () {
    return {
      list: this.$store.state.list,
      uid: this.$store.state.uid
    }
  },
  methods: {
    fetchUserWords: function () {
      firebase.init.database().ref('memoword').orderByChild('uid').equalTo(this.uid).on('value', function (snapshot) {
        var arr = []
        snapshot.forEach(function (data) {
          var dataToPush = data.val()
          dataToPush.id = data.key
          arr.push(dataToPush)
        })
        window.vm.$store.state.list = arr
      })
    },
    changeWord: function (word) {
      console.log(word)
    },
    changeWordDone: function (word) {
      firebase.init.database().ref('memoword').child(word.id).update(word)
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
