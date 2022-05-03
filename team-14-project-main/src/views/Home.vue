<template>
<div id=intro>
  <IntroPage/>
  <div id=welcome>
  <Welcome/>
  <div id=nav>
    <Nav/>
    <div id=map> <Map/>
    </div>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
// import { Api } from '@/Api'
import Nav from '../components/Nav.vue'
import Map from '../components/Map.vue'
import IntroPage from '../components/IntroPage.vue'
import 'leaflet/dist/leaflet.css'

export default {
  components: {
    Map,
    Nav,
    IntroPage

  },
  name: 'home',
  data() {
    return {
    }
  },
  methods: {
    Modaltoggle() {
      this.modalShow = true
    },
    doSomethingOnReady() {
      this.map = this.$refs.myMap.mapObject
    }
  }
}

</script>

<style>
#nav{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  overflow-y: hidden;
  font-family: tomorrow;
}
#map{
  height: 103.5%;
  width: 100%;
  position: fixed !important;
  z-index: -4;
  overflow-y: hidden;
}
#intro{
  height: 100%;
  width: 100%;
  position: fixed !important;
  overflow-y: hidden;
  height: 100% !important;
  width: 100% !important;
  z-index: 20 !important;
  margin-top: -10.4%;
}
</style>
