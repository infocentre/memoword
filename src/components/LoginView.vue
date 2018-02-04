<template>
  <div>
    <facebook-login class="button" 
    appId="693041211036132" 
    @login="getUserData"
    @sdk-loaded="sdkLoaded"
    ></facebook-login>
    <button @click="testBtn">hihi</button>
  </div>
</template>
<script>
import facebookLogin from 'facebook-login-vuejs'
export default {
  data () {
    return {
      isConnected: false
    }
  },
  methods: {
    getUserData () {
      this.$store.state.FB.api('/me', 'get', {fields: 'id'}, uinfo => {
        this.$store.state.uid = uinfo.id
      })
    },
    sdkLoaded (payload) {
      this.$store.commit('updateConnection', payload.isConnected)
    },
    testBtn () {
      this.$store.commit('updateConnection', 'hi')
    }
  },
  components: {facebookLogin}
}
</script>
