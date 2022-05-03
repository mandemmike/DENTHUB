var mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Appointment = new Schema({
    dentist_id: {
        type: Schema.Types.ObjectId,
        required: true
    }, 
    time: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    }    
})

module.exports = mongoose.model('appointment', Appointment);