var mongoose = require('mongoose')

var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/team-14';

function connect(){
  mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
    
});
}
module.exports= {
    connect : connect()
}