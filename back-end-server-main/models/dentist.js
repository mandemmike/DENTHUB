const mongoose = require('mongoose');
const { isEmail } = require('validator');
const Schema = mongoose.Schema;
//var bcrypt = require('bcrypt')

const DentistSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: String,
        default: false
    },
    dentists: {
        type: Number, 
    },
    city: {
        type: String,
        required: true
    }, 
    coordinates: [{
            longitude: {
                type: Number,
                required: true,
            },
            latitude: {
                type: Number,
                required: true              
            }
    }],
    patients: [{
        type: Schema.Types.ObjectId, ref: 'user'
    }],
    openingHours: {
        monday: {
            type: String,
            required: true
        },
        tuesday: {
            type: String,
            required: true
        },
        wednesday: {
            type: String,
            required: true
        },
        thursday: {
            type: String,
            required: true
        },
        friday: {
            type: String,
            required: true
        }
    }
},{timestamps: true});


/*
//function after doc saved to database
DentistSchema.post('save', function(doc, next) {
    console.log('new user was created and saved', doc);
    next();

});

// function before doc saved to database
DentistSchema.pre('save',async function(next) {
    //const salt = await bcrypt.genSalt();
    //this.password = await bcrypt.hash(this.password, salt);
    next();
    
})
*/
const Dentist = module.exports = mongoose.model('dentist', DentistSchema);
