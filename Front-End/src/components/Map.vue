 <template>
 <div>
 <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="[
      defaultLocation.lat,
      defaultLocation.lng
    ]"
      :options="mapOptions"
      style="height: 90%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
        <div v-if="userCoord">
        <l-circle-marker :radius="circle.radius" :color="circle.color" ref="marker" v-model="userCord"
        :lat-lng="userCord" title="Transparent"
        opacity="0.6"><l-popup ref="popup">You're Here!
          </l-popup>  </l-circle-marker>
      </div>
      <div class="custom-popup" id="popUpCard" v-for="item in markers" :key="item.latLng">
        <l-marker :lat-lng="item[1]" :key="item[1]">
          <l-popup><div id="clinicName">{{ item[0].name }}</div><div id="clinicDays"><br>Opening Hours:<br>
             Monday: {{ item[0].openingHours.monday}}<br>
             Tuesday: {{ item[0].openingHours.tuesday}}<br>
             Wednesday: {{ item[0].openingHours.wednesday}}<br>
             Thursday: {{ item[0].openingHours.thursday}}<br>
             Friday: {{ item[0].openingHours.friday}}<br>
             Weekends: Closed</div>
            <button id="bookHere" type="button" class="btn btn-link" @click="toBooking(item)">Book Here</button>
          </l-popup>
        </l-marker>
      </div>
    </l-map>
    </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup, LCircleMarker } from 'vue2-leaflet'
import { latLng } from 'leaflet'
import { Api } from '@/Api'
const EventEmitter = require('../EventEmitter')
export default {
  name: 'Map',
  components: {
    'l-map': LMap,
    'l-tile-layer': LTileLayer,
    'l-marker': LMarker,
    'l-popup': LPopup,
    'l-circle-marker': LCircleMarker
  },
  props: {
    defaultLocation: {
      type: Object,
      default: () => ({
        lat: 57.7089,
        lng: 11.9746
      })
    }
  },
  data() {
    return {
      userLocation: {},
      zoom: 13,
      center: latLng(57.7089, 11.9746),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      currentZoom: 11.5,
      currentCenter: latLng(57.7089, 11.9746),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true,
      showModal: false,
      dentists: [],
      markers: [],
      userCoord: false,
      userCord: [],
      circle: {
        radius: 15,
        color: 'blue'
      }
    }
  },
  mounted() {
    this.getUserPosition()
  },
  created() {
    Api.get('http://localhost:3000/api/dentists/coordinates')
      .then(response => {
        console.log(response.data)
        this.dentists = response.data
        this.dentists.forEach(dentist => {
          const cord = [dentist, latLng(dentist.coordinates[0].longitude, dentist.coordinates[0].latitude)]
          this.markers.push(cord)
        })
      })
      .catch(error => {
        console.log('Failed to load dentists to map ' + error)
      })
    const vm = this
    const showUser = function (data) {
      vm.userCoord = true
      const lat = vm.userLocation.lat
      const lng = vm.userLocation.lng
      vm.userCord = latLng(lat, lng)
      vm.$LPopup.show('userPopup')
      console.log(vm.userCord)
      this.$refs.marker.LMap.openPopup()
    }
    EventEmitter.eventEmitter.on('showUser', showUser)
  },
  setup() {
  },
  methods: {
    async getUserPosition() {
      // check if API is supported
      if (navigator.geolocation) {
        // get  geolocation
        navigator.geolocation.getCurrentPosition(pos => {
          // set user location
          this.userLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          }
        })
      }
    },
    zoomUpdate(zoom) {
      this.currentZoom = zoom
    },
    showModalMethod() {
      this.showModal = true
    },
    centerUpdate(center) {
      this.currentCenter = center
    },
    showLongText() {
      this.showParagraph = !this.showParagraph
    },
    innerClick() {
      alert('Click!')
    },
    toBooking(arg) {
      console.log(arg)
      this.$router.push({ name: 'booking', params: { _id: arg[0]._id } })

      // this.$route.params._id
    }
  }
}

</script>
<style>
#marker{
}
#clinicName{
  font-family: tomorrow;
  font-size: 20px !important;
  align-content: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
#bookHere{
  font-size: 18px;
  font-family: tomorrow;
  align-content: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
#clinicDays{
  font-family: tomorrow;
  font-size: 15px;
  align-content: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.custom-popup .leaflet-popup-content-wrapper {
  background:#2c3e50 !important;
  color:#fff;
  font-size:16px;
  line-height:24px;
  }
</style>
