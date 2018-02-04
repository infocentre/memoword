<template>
  <div>
   <button @click="fbLogin">페이스북 로그인</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isConnected: false
    }
  },
  methods: {
    fbLogin () {
      let FB = this.$store.state.FB
      FB.login(function (res) {
        window.vm.$store.state.isConnected = true
      })
    },
    getUserData () {
      this.$store.state.FB.api('/me', 'get', {fields: 'id'}, uinfo => {
        this.$store.state.uid = uinfo.id
      })
    },
    sdkLoaded (payload) {
      this.$store.commit('updateConnection', payload.isConnected)
    }
  }
}
</script>
