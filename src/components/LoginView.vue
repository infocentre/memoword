<template>
  <div>
   <button @click="fbLogin">facebook login</button>
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
        if (res.status === 'connected') {
          window.vm.$store.state.isConnected = true
          window.vm.$store.state.uid = res.authResponse.userID
          window.vm.$router.push({name: 'Home'})
        } else {
          console.log('please login')
        }
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
