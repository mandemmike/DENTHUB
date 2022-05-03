var Scheduler = require('@ssense/sscheduler');
const scheduler = require('Scheduler');

function getavil(bookings){
return Scheduler.getAvailability({
    from: '2021-10-10',
    to: '2021-10-10',
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
}
module.exports = 
    getavil(bookings)

