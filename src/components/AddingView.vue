<template>
  <div class="mdl-grid">
    <div>{{uid}}</div>
    <div class="mdl-cell mdl-cell--12-col mdl-cell--4-col-phone">
      <p>word</p> 
      <button style="display:inline" @click="SearchWord">search</button>
      <input type="text" class="mdl-textfield__input" v-model="newWord">
    </div>
      
    <div class="mdl-cell mdl-cell--12-col mdl-cell--4-col-phone">
      <p>meaning</p> {{searchedWord}}
      <input type="texdt" class="mdl-textfield__input" v-model="newMeaning">
    </div>
    <div class="mdl-cell mdl-cell--12-col mdl-cell--4-col-phone">
      <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" @click="saveNewWord">save</button> 
    </div>
    
	</div>
	
</template>

<style>

</style>

<script>
// import firebase from '../service/firebase'
import axios from 'axios'
export default {
  data () {
    return {
      newWord: null,
      newMeaning: null,
      uid: this.$store.state.uid,
      searchedWord: null
    }
  },
  methods: {
    saveNewWord () {
      let inputObj = {
        word: this.newWord,
        translation: this.newMeaning,
        created_at: -1 * new Date().getTime(),
        uid: this.$store.state.uid
      }
      this.newWord = ''
      this.newMeaning = ''
      this.$root.$firebaseRefs.memoword.push(inputObj).then(function () {
        console.log('단어저장 완료')
      })
    },
    SearchWord () {
      console.log(this.newWord)
      axios.get(`https://us-central1-test-68c08.cloudfunctions.net/GetDict?word=` + this.newWord.toLowerCase()).then(
        response => {
          // JSON responses are automatically parsed.
          var obj = JSON.parse(response.data)
          this.searchedWord = obj['tuc'][0]['phrase']['text']
          console.log(obj['tuc'][0]['phrase']['text'])
          // this.posts = response.data
        })
        .catch(e => {
          // this.errors.push(e)
        })
    }
  },
  created () {
    this.$store.watch(() => {
      return this.$store.state.firebaseUser
    }, (newVal, oldVal) => {
      this.firebaseUser = newVal
    })
  }
}
</script>
