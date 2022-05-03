const mqtt = require('mqtt')
// const url = 'ws://127.0.0.1:1883'
const EventEmitter = require('./EventEmitter')

const options = {
  port: 9001,
  clientId: 'client' + Math.random().toString(16).substr(2, 8),
  // username: 'mmm',
  // password: 'kapp',
  hostname: 'localhost',
  path: '/mqtt',
  keepalive: 10000
}
const client = mqtt.connect(options)

client.on('error', err => {
  console.log('Connection error: ', err)
  client.end()
})
client.on('connect', function () {
  console.log('Connected to MQTT')
  client.subscribe('Availability/done', { qos: 2 })
  client.subscribe('Booking/confirmed/client', { qos: 2 })
  client.subscribe('Booking/occupied/client', { qos: 2 })
  client.on('message', function (topic, message) {
    console.log('message at ' + topic)
    if (topic === 'Availability/done') {
      const stringMessage = message.toString()
      const timeslots = JSON.parse(stringMessage)
      EventEmitter.eventEmitter.emit('timeslots', topic, timeslots)
    } else if (topic === 'Booking/confirmed/client') {
      const stringMessage = message.toString()
      const booking = JSON.parse(stringMessage)
      EventEmitter.eventEmitter.emit('confirmed', topic, booking)
    } else if (topic === 'Booking/occupied/client') {
      EventEmitter.eventEmitter.emit('occupied', topic, message)
    }
  })
})

function publish(topic, message) {
  client.publish(topic, message, function () {
    console.log('Message is published')
  })
}

module.exports = {
  publish(topic, message) {
    publish(topic, message)
  },
  client: client,
  EventEmitter: EventEmitter
}
