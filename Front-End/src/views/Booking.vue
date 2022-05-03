<template>
    <div id="Booking">
<Calender v-model="date"/>
<Timeslots :options="this.options" v-model="decision" />
<div class="container mt-5 mb-5 d-flex justify-content-center">
    <div class="card px-1 py-4">
        <div class="card-body">
            <h6 class="card-title mb-3">This appointment is at {{ dentist.name }}<br>
                                        the {{ date }} at {{ decision }}
            </h6>
            <h6 class="information mt-4">Please provide following information</h6>
            <div class="row">
                <div class="col-sm-12">
                    <div class="form-group">
                        <!-- <label for="name">Name</label> --> <input v-model="userName" class="form-control" type="text" placeholder="Name"> </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <div class="form-group">
                        <div class="input-group"> <input v-model="userMobile" class="form-control" type="text" placeholder="Mobile"> </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <div class="form-group">
                        <div class="input-group"> <input v-model="userEmail" class="form-control" type="text" placeholder="Email ID"> </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <div class="form-group">
                        <div class="input-group"> <input v-model="userSocialSecurity" class="form-control" type="text" placeholder="Social security"> </div>
                    </div>
                </div>
            </div>
            <div class=" d-flex flex-column text-center px-5 mt-3 mb-3"> <small class="agree-text">By Booking this appointment you agree to the</small> <a href="#" class="terms">Terms & Conditions</a> </div> <button @click="this.bookAppointment"  class="btn btn-primary btn-block confirm-button">Confirm</button>
        </div>
    </div>
</div>
<div v-if="bookingDone===true">
<div class="alert alert-success" role="alert">
  Booking confirmed
</div></div>
<div v-if="bookingOccupied">
<div class="alert alert-danger" role="alert">
  Service alert - Requested booking is not available
</div></div>
 <modal name="bookingSucess">
        Booking success!<br>
        User ID: {{ booking.userId }}.<br>
        Request ID: {{ booking.requestId }}<br>
        Time & Date: {{ booking.date }} {{ booking.time}}<br>
          <div><iframe src="https://giphy.com/embed/MSmufS90NUeOnPLkGm" width="45%" height="45%" style="position:relative" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/smile-odontologia-rie-MSmufS90NUeOnPLkGm">via GIPHY</a></p>
        <br>
        <button @click="this.redirectHome" type="button" class="btn btn-success">OK. Got it!</button>
    </modal>
     <modal name="bookingFail">
        Booking Failed!<br>
       Please try again later...
        <br>
        <br>
       <button @click="this.redirectHome" type="button" class="btn btn-success">OK. Got it!</button>
    </modal>
    <b-button @click="this.redirectHome" id="cancel" variant="danger">Cancel</b-button>
</div>
</template>

<script>
import { Api } from '@/Api'
import Calender from '../components/Calender.vue'
import Timeslots from '../components/Timeslots.vue'
import mqttClient from '../mqttClient'
// import Nav from '../components/Nav.vue'
const EventEmitter = require('../EventEmitter')

export default {
  name: 'Booking',
  components: {
    Calender,
    Timeslots
  },
  data: function () {
    return {
      dentist: {},
      decision: '',
      options: [],
      userName: '',
      userMobile: '',
      userEmail: '',
      userSocialSecurity: '',
      date: '',
      bookingDone: false,
      booking: {},
      bookingOccupied: false
    }
  },
  created() {
    Api.get('http://localhost:3000/api/dentists/' + this.$route.params._id, { _id: this.$route.params._id })
      .then(response => {
        this.dentist = response.data[0]
      })
      .catch(error => {
        console.log('Failed to load dentists to map ' + error)
      })
    const vm = this
    const addTimeslots = function (topic, message) {
      const stringMessage = JSON.stringify(message)
      const entry = stringMessage.substring(2, 12)
      const timeslots = []
      const balash = []
      for (const [key, value] of Object.entries(message[entry])) {
        balash.push(key)
        if (value.available) {
          const slot = JSON.stringify(value.time)
          timeslots.push(slot)
        }
      }
      vm.options = timeslots
    }
    const setDate = function (date) {
      vm.date = date
    }
    const bookingConfirmed = function (topic, message) {
      vm.bookingDone = true
      vm.bookingOccupied = false
      vm.booking = message
      vm.$modal.show('bookingSucess')
    }
    const bookingOccupied = function (topic, message) {
      vm.bookingOccupied = true
      vm.bookingDone = false
      vm.booking = message
      vm.$modal.show('bookingFail')
    }
    EventEmitter.eventEmitter.on('timeslots', addTimeslots)
    EventEmitter.eventEmitter.on('Date/selected', setDate)
    EventEmitter.eventEmitter.on('confirmed', bookingConfirmed)
    EventEmitter.eventEmitter.on('occupied', bookingOccupied)
    EventEmitter.eventEmitter.on('failed', bookingOccupied)
  },
  methods: {
    bookAppointment() {
      const appointment = {}
      appointment.userId = Math.random().toString(16).substr(2, 8)
      appointment.requestId = Math.random().toString(16).substr(2, 8)
      appointment.issuance = Date.now()
      appointment.dentist_id = this.$route.params._id
      let time = this.decision
      time.replace('""', '')
      time.replace('\'', '')
      time = time.substring(1, 6)
      appointment.time = time
      appointment.date = this.date
      const userInformation = {}
      userInformation.name = this.userName
      userInformation.mobile = this.userMobile
      userInformation.email = this.userEmail
      userInformation.socialSecurity = this.userSocialSecurity
      appointment.userInfo = userInformation
      const message = appointment
      console.log(message)
      mqttClient.publish('Booking/request', JSON.stringify(message))
    },
    showModal() {
      this.$modal.show('my-first-modal')
    },
    setDate(message) {
    },
    redirectHome() {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style>

.FormDate {
    display: inline-flex;
    position: relative;
    overflow: hidden;
    border: 1px solid #888;
    border-radius: 0.25em;

}
#nav {
  z-index: -1;
}
#cal{
  position: fixed;
  z-index: -30;
}

</style>
