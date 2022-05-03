import client from './mqttClient.cjs'
import delay from 'delay'
import PriorityQueue from 'javascript-priority-queue'
const queue = new PriorityQueue.default('min');
let timer = (new Date().getTime()) / 1000;
let count = 0
const timeWindow = 60

client.client.on('message', function (topic, message) {
    if(topic === 'Booking/request'){
    count++;
    const stringMessage = message.toString()
    const bookingRequest = JSON.parse(stringMessage)
    var currentTime = (new Date().getTime()) / 1000;
    // Disconnect the mqtt client and reconnects if booking requests exceed 50 given the time window
    if(currentTime - timer <= timeWindow){ //
        if(count > 50){
            client.client.end()
        }else{
            queue.enqueue(bookingRequest, bookingRequest.issuance)
            console.log('queued')
            validateRequest()
        }
    }else {
        // adds a booking request to priority queue pointing at the issuance of the booking, earliest booking gets validated first 
        queue.enqueue(bookingRequest, bookingRequest.issuance)
        console.log('queued')
        validateRequest()
    }
    }else if(topic === 'Booking/confirmed'){
        const stringMessage = message.toString()
        const responseMessage = JSON.parse(stringMessage)
        client.publish('Booking/confirmed/client', JSON.stringify(responseMessage))
    }else if(topic === 'Booking/occupied'){
        const stringMessage = message.toString()
        const responseMessage = JSON.parse(stringMessage)
        client.publish('Booking/occupied/client', JSON.stringify(responseMessage))
    }else {
        console.log('haha')
    }
  })

const validateRequest = async () => {
    await delay(100);
    const toValidate = queue.dequeue();
    client.publish('Booking/validating', JSON.stringify(toValidate))
    console.log('Sent booking request to server for validation' + JSON.stringify(toValidate))
  };

setInterval(resetClock, 60000);
function resetClock() {
    timer = (new Date().getTime()) / 1000;
    count = 0
}