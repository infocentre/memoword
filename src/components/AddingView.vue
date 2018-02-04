<template>
  <div class="mdl-grid">
    word
    <input type="text" v-model="newWord">
        meaning
    <input type="text" v-model="newMeaning">
		<button @click="saveNewWord">save</button>
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
      let wordsArry = this.$store.state.words
      let inputObj = {
        id: wordsArry.length,
        word: this.newWord,
        translation: this.newMeaning
      }
      wordsArry.push(inputObj)
      this.newWord = ''
      this.newMeaning = ''
    }
  }
}
</script>
