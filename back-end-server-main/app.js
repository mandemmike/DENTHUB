const client = require('./mqttClient.cjs')
const express = require('express')
var mongoose = require('mongoose')
var morgan = require('morgan');
var cors = require('cors');
let Dentist = require('./models/dentist')
var dentistController = require('./controllers/dentistsController')
var Registry = require('./Registry/dentistRegistry');

const authRoutes = require('./routes/authRoutes')
const app = express()
//middelware for css
app.use(express.json())

//view engine 
app.set('view engine', '')

app.use('api/*', function (req, res) {
    res.status(404).json({ 'message': 'Not Found' });
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    var err_res = {
        'message': err.message,
        'error': {}
    };
    if (process.env === 'development') {
        // Return sensitive stack trace only in dev mode
        err_res['error'] = err.stack;
    }
    res.status(err.status || 500);
    res.json(err_res);
});

app.options('*', cors());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
mongoose.set('returnOriginal', false);

//database connection 
const PORT = process.env.PORT || 3000
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/team-14';


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
    
});



app.listen(PORT, function(err) {
    if (err) throw err;
    console.log(`Express server listening on port ${PORT}`);
});

app.get('/api', function(req, res) {
    res.json({'message': 'Welcome to your Dentist booking interface'});
});
app.use(dentistController)
/*
mongoose.connection.db.collections('dentist').insertMany(Registry, function(err,result) {
    if (err) {
        console.log('Failed to load dentist registry')
    } else {
        console.log('Dentist registry loaded to database')
    }
 });
 */

 Dentist.find({}, function(err, result){
    if(err) {console.log(err)}
    if(result.length < 46 || result === null){
        Dentist.insertMany(Registry, function(err, result){
            if(err) {
                console.log('error saving' + err)
            } else {
                console.log('Succes saving registry')
            }
        })

    }else {
        console.log(err)
    }
})
 
