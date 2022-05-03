import client from './mqttClient.cjs'

import {Scheduler} from '@ssense/sscheduler';
import Appointment from './database/appointment.cjs'
import database from './database/database.cjs'
// var newDate = require('new-date');
import newDate from 'new-date'

// var getAvailability = require('@ssense/sscheduler');
// var getavil = require('./appointmentchecker');
const scheduler = new Scheduler();
var bookings = [] 
client.client.on('message', function(topic, message, packet) {
    try {
    var stringMessage = message.toString()
    var jsonMessage = JSON.parse(stringMessage)
    var today = newDate(jsonMessage.date)
    var tomorrow = new Date(today);
    tomorrow.setDate(today.getDate()+1);
    Appointment.find({dentist_id: jsonMessage.dentist_id, date: jsonMessage.date }, function(err, result) {
      if(err){ client.publish('Availability check done error', 'Failed to query dentist registry...please try again later') }
        
        for(var i = 0; i< result.length; i++){
          let booking = {}
          booking.from = result[i].date + ' ' + result[i].time
          booking.duration = 30
          bookings.push(booking)
        }
        var availability = scheduler.getAvailability({
            from: today,
            to: tomorrow,
            duration: 30,
            interval: 30,
            schedule: {
                weekdays: {
                    from: '09:00', to: '17:00', // gon change to opening hours of the dentist shop
                    unavailability: [
                        { from: '12:00', to: '13:00' } // gon change to opening hours of the dentist shop
                    ]
                },
                allocated: bookings
            }
            
        });
        client.publish('Availability/done', JSON.stringify(availability))
        console.log('Sent available timeslots to client...')
    })
}catch(err){
    console.log(err)
}

});
