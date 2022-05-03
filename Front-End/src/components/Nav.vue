<template>
    <div>
      <nav class="navbar navbar-light">
  <a class="navbar-brand" href="/">DENTHUB</a>
  <b-button id="locationButton" variant="outline-primary" v-on:click="showUser()" >YOUR LOCATION</b-button>
  <div class="text-center my-1">
  <a class="navbar-brand" v-b-popover.hover.top="'See your location and select a dentist of your choice.'" title="Welcome to DENTHUB!">
    HELP?
  </a>
</div>
      </nav>
    </div>
</template>

<script>
import { Api } from '@/Api'
const EventEmitter = require('../EventEmitter')
export default {
  name: 'navbar',
  components: {
  },
  methods: {
    testApi() {
      Api.get('')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    },
    showUser() {
      EventEmitter.eventEmitter.emit('showUser', '')
    }
  }
}
</script>

<style>
nav {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1.5px solid #1f8fff;
    @media (max-width: 991.98px)
.header {
    position: fixed;
    top: 0;
    transition: top .2s ease-in-out;
    width: 100%;
}
}

nav .menu-item {
    color: #FFF;
    padding: 10px 20px;
    position: fixed;
    text-align: center;
    border-bottom: 3 px solid transparent;
    display: flex;
    transition: 0.4;
}
nav .menu-item.active,
nav .menu-item:hover {

}
.navbar-brand{
  color: #1f8fff !important;
  font-weight: 500;
  z-index: 10;
}
nav .menu-item a {
    color: inherit;
    text-decoration: none;
}
#brand{
  stroke: black !important;
}
.header{
  color: rgb(161, 31, 31);
  margin-top: 30px;
}
#locationButton{
  border-radius: 20px;
  font-family: 'Tomorrow', sans-serif;
}
html,
body {
  height: 100%;
}
</style>
