var mqtt = require('mqtt');
const Appointment = require('./database/appointment');
const url = 'mqtt://localhost:1883'
const EventEmitter = require('events');
class Emitter extends EventEmitter {}
const eventEmitter = new Emitter();


var options = {
    port: 1883,
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'mmm',
    password: 'kapp',
  };

var client = mqtt.connect(url, options);

client.on("connect", () => {
  console.log('MQTT Connected');
  client.subscribe('Availability/check', {qos: 1})
  client.subscribe('Appointment', {qos: 1})
})
client.on("message", function(topic, message) {
  console.log(message)
  eventEmitter.emit('messageArrived',topic, message)
});
function subscribe(topic){
  broker.on("connect", () => {
    console.log("Connected: " + clientId);
    broker.subscribe(topic, { qos: 2 });})
}

function publish(topic,message){
  client.publish(topic, message, function() {
    console.log("Message is published");
    client.end();
    })
}

module.exports = {
    publish(topic, message){
        publish(topic, message)
    },
    subscribe(topic) {
      subscribe(topic)
    },
    client: client,
    eventEmitter: eventEmitter
}