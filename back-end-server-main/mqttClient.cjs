const mqtt = require('mqtt')
// const url = 'ws://127.0.0.1:1883'
const url = 'mqtt://localhost:1883'
const Appointment = require('./models/appointment')


var options = {
  port: 1883,
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  // username: 'mmm',
  // password: 'kapp',
  keepalive: 10000
};
const client = mqtt.connect(url, options)

client.on('error', err => {
  console.log('Connection error: ', err)
  client.end()
})
client.on('connect', function () {
  console.log('Connected to MQTT')
  client.subscribe('Booking/validating', { qos: 1 })
  client.on('message', function (topic, message) {
    const stringMessage = message.toString()
    const jsonMessage = JSON.parse(stringMessage)
    Appointment.find({dentist_id: jsonMessage.dentist_id, date: jsonMessage.date, time: jsonMessage.time }, function(err, result) {
      if(err) { 
        console.log('Booking failed ' + err)
        publish('Booking/failed', JSON.stringify(err))
      }else if (result.length === 0) {
        const appointment = new Appointment(jsonMessage)
        appointment.save(function(err, appointment) {
        if (err) { 
          console.log('Booking failed ' + err)
          publish('Booking/failed', JSON.stringify(err))
        }else {
        console.log('Booking validated ' + appointment)
        publish('Booking/confirmed', JSON.stringify(appointment) )
        }
        })
      } else {
        publish('Booking/occupied', JSON.stringify(result))
        console.log('Failed to validate' + JSON.stringify(jsonMessage))
      }
    })
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
  client: client
}
