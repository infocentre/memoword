<template>
  <div>
   <button @click="fbLogin">facebook login</button>
  </div>
</template>
<script>
import firebase from '../service/firebase'
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
          /* eslint-disable */
          var unsubscribe = firebase.init.auth().onAuthStateChanged(function(firebaseUser) {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!isUserEqual(res.authResponse, firebaseUser)) {
              // Build Firebase credential with the Facebook auth token.
              var credential = firebase.init.auth.FacebookAuthProvider.credential(
                  res.authResponse.accessToken);
              // Sign in with the credential from the Facebook user.
              firebase.init.auth().signInWithCredential(credential).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
              });
            } else {
              // User is already signed-in Firebase with the correct user.
            }
          });
          function isUserEqual(facebookAuthResponse, firebaseUser) {
            if (firebaseUser) {
              var providerData = firebaseUser.providerData;
              for (var i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === firebase.init.auth.FacebookAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === facebookAuthResponse.userID) {
                  // We don't need to re-auth the Firebase connection.
                  return true;
                }
              }
            }
            return false;
          }
          /* eslint-enable */
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
