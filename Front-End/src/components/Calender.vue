<template>
<div>
   <div id="calender" class="row">
      <div class="col">
      </div>
      <div class="col">
      <FullCalendar :events="this.calendarOptions.events" :options="this.calendarOptions" />
      </div>
      <div class="col">
      </div>
   </div>
    <div>
      </div>
</div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import mqttClient from '../mqttClient'
import EventEmitter from '../EventEmitter'

export default {
  name: 'Calendar',
  components: {
    FullCalendar
  },
  data() {
    return {
      calendarOptions: {
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin, interactionPlugin],
        dateClick: this.handleDateClick,
        weekends: false,
        events: [
          { title: 'Available timeslot', date: '2021-12-10' },
          { title: 'Available timeslot', date: '2021-12-14' }
        ]
      },
      message: {
        date: '',
        dentist_id: ''
      }
    }
  },
  props: {
    events: {
      type: Array,
      default: () => ([
        { title: 'event 1', date: '2021-12-01' },
        { title: 'event 2', date: '2021-12-05' }
      ])
    }
  },
  methods: {
    handleDateClick(arg) {
      this.message.date = arg.dateStr
      this.message.dentist_id = this.$route.params._id
      mqttClient.publish('Availability/check', JSON.stringify(this.message))
      EventEmitter.eventEmitter.emit('Date/selected', this.message.date)
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
}
  .calender{
    width: 100px;
    height: 100px;
  }
    .red {
      background: rgb(235, 77, 77) !important;
      color: whitesmoke !important;
    }
    .blue {
      background: rgb(59, 59, 163) !important;
      color: whitesmoke !important;
    }
    .orange {
      background: orange !important;
      color: white !important;
    }
    .green {
      background: rgb(49, 155, 49) !important;
      color: white !important;
    }
    .blue,
    .orange,
    .red,
    .green {
      font-size: 13px;
      font-weight: 500;
      text-transform: capitalize;
    }
    .event-item {
      padding: 2px 0 2px 4px !important;
    }
    </style>
