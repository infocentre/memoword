<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--12-col mdl-cell--4-col-phone">
      <p>word</p>
      <input type="text" class="mdl-textfield__input" v-model="newWord">
    </div>
    <div class="mdl-cell mdl-cell--12-col mdl-cell--4-col-phone">
      <p>meaning</p>
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
export default {
  data () {
    return {
      newWord: null,
      newMeaning: null
    }
  },
  methods: {
    saveNewWord () {
      let inputObj = {
        word: this.newWord,
        translation: this.newMeaning,
        created_at: -1 * new Date().getTime()
      }
      this.newWord = ''
      this.newMeaning = ''
      this.$root.$firebaseRefs.memoword.push(inputObj).then(function () {
        console.log('단어저장 완료')
      })
    }
  }
}
</script>
