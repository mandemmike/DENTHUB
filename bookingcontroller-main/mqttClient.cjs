const mqtt = require('mqtt')
// const url = 'ws://127.0.0.1:1883'
const url = 'mqtt://localhost:1883'

var options = {
  port: 1883,
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  // username: 'mmm',
  // password: 'kapp',
  keepalive: 70
};
const client = mqtt.connect(url, options)

client.on('error', err => {
  console.log('Connection error: ', err)
  client.end()
})
client.on('connect', function () {
  console.log('Connected to MQTT')
  client.subscribe('Booking/request', { qos: 2 })
  client.subscribe('Booking/confirmed', { qos: 2 })
  client.subscribe('Booking/failed', { qos: 2 })
  client.subscribe('Booking/occupied', { qos: 2 })
})

client.on('disconnect', function() {
  console.log('MQTT client has been disconnected...Reconnecting in 1000 ms')
  client.reconnect();
})

client.on('end', function() {
  console.log('MQTT client has been disconnected...Reconnecting in 1000 ms')
  client.reconnect();
})

function publish(topic, message) {
  client.publish(topic, message, function () {
    console.log('Message is published' + topic)
  })
}

module.exports = {
  publish(topic, message) {
    publish(topic, message)
  },
  client: client
}
