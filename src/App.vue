
<template>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <span class="mdl-layout-title">Memo King</span>
      </div>
    </header>

    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">Memo King</span>
      <nav class="mdl-navigation">
        <router-link class="mdl-navigation__link" to="/" @click.native="hideMenu">Home</router-link>
        <router-link class="mdl-navigation__link" to="/add" @click.native="hideMenu">Add words</router-link>
        <router-link class="mdl-navigation__link" to="/login" v-if="!isConnected" @click.native="hideMenu">login</router-link>
        {{FB}}
        <div class="mdl-navigation__link" v-if="isConnected">로그아웃</div>
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
require('material-design-lite')

export default {
  name: 'app',
  data () {
    return {
      isConnected: null,
      FB: window.FB
    }
  },
  methods: {
    hideMenu: function () {
      document.getElementsByClassName('mdl-layout__drawer')[0].classList.remove('is-visible')
      document.getElementsByClassName('mdl-layout__obfuscator')[0].classList.remove('is-visible')
    }
  },
  created () {
    
    this.$store.watch((state) => {
      return this.$store.state.isConnected
    },
    (newVal, oldVal) => {
      this.isConnected = newVal
    })
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  @import url('https://code.getmdl.io/1.2.1/material.blue-red.min.css');
</style>