
<template>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <span class="mdl-layout-title">Memo King</span>
        <div class="mdl-layout-spacer"></div>
        <nav class="mdl-navigation">
          <div class="mdl-navigation__link" ><img v-if="uid" v-bind:src="imgUrl" style="height:50px; border-radius:50%;"></div>
        </nav>
      </div>
    </header>

    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">Memo King</span>
      <nav class="mdl-navigation">
        <router-link class="mdl-navigation__link" to="/" @click.native="hideMenu">Home</router-link>
        <router-link class="mdl-navigation__link" to="/list" @click.native="hideMenu">Words List</router-link>
        <router-link class="mdl-navigation__link" to="/add" @click.native="hideMenu">Add words</router-link>
        <router-link class="mdl-navigation__link" to="/login" v-if="!isConnected" @click.native="hideMenu">login</router-link>
        <div class="mdl-navigation__link" v-if="isConnected" @click="fbLogOut">logout</div>
      </nav>
    </div>

    <main class="mdl-layout__content">
      <div class="page-content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import firebase from './service/firebase'
require('material-design-lite')
export default {
  name: 'app',
  data () {
    return {
      isConnected: this.$store.state.isConnected,
      FB: this.$store.state.FB,
      uid: this.$store.state.uid
    }
  },
  computed: {
    imgUrl: function () {
      return 'http://graph.facebook.com/' + this.$store.state.uid + '/picture'
    }
  },
  methods: {
    hideMenu: function () {
      document.getElementsByClassName('mdl-layout__drawer')[0].classList.remove('is-visible')
      document.getElementsByClassName('mdl-layout__obfuscator')[0].classList.remove('is-visible')
    },
    fbLogOut () {
      this.FB.logout(function (response) {
        if (response.status === 'connected') {
        } else {
          firebase.init.auth().signOut()
          window.vm.$store.state.isConnected = false
          window.vm.$store.state.uid = null
        }
      })
      document.getElementsByClassName('mdl-layout__drawer')[0].classList.remove('is-visible')
      document.getElementsByClassName('mdl-layout__obfuscator')[0].classList.remove('is-visible')
    }
  },
  created () {
    /* eslint-disable */
    window.fbAsyncInit = function() {
    FB.init({
      appId            : '693041211036132',
      autoLogAppEvents : true,
      xfbml            : false,
      cookie           : true,
      version          : 'v2.12'
    });
    window.vm.$store.state.FB = FB
    FB.getLoginStatus(function(res) {
      if (res.status === "connected"){
        window.vm.$store.state.isConnected = true
        window.vm.$store.state.uid = res.authResponse.userID
      } else {
        window.vm.$store.state.isConnected = false
      }
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
   
    
    /* elint-enable */
    this.$store.watch((state) => {
      return this.$store.state.isConnected
    },
    (newVal, oldVal) => {
      this.isConnected = newVal
    })

    this.$store.watch((state) => {
      return this.$store.state.FB
    },
    (newVal, oldVal) => {
      this.FB = newVal
    })

    this.$store.watch((state) => {
      return this.$store.state.uid
    },
    (newVal, oldVal) => {
      this.uid = newVal
    })
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  @import url('https://code.getmdl.io/1.2.1/material.blue-red.min.css');
</style>