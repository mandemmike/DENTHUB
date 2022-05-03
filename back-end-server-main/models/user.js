const mongoose = require('mongoose');
const { isEmail } = require('validator');
// const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: [true, 'Please enter an email address'],
        unique: true,
        lowercase:true,
        validate: [isEmail, 'Please enter an email']
    },
    phoneNumber: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength:[5, 'Minimum password lenght is 5 characters']
    },
    gender: {
        type: String,
        enum: ["Male", "Female"]
    },
    dateOfBirth: {
        Date
    },
    city: {
        type: String,
    },
    insurance: {
        type: String,
        default: false,
        required: true
    }, 
    dentists: [{
        type: Schema.Types.ObjectId, ref: 'dentist'
    }]
    
},{timestamps: true});

//function after doc saved to database
UserSchema.post('save', function(doc, next) {
    console.log('new user was created and saved', doc);
    next();

});

// function before doc saved to database
UserSchema.pre('save',async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
    
})


const User = module.exports = mongoose.model('user', UserSchema);
