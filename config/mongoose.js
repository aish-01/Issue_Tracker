// require the library
const mongoose=require('mongoose');

// connect to the database
mongoose.connect('mongodb+srv://aishwaryasenyadav:B8Srso3G7oh3pnYz@cluster0.wmzfusp.mongodb.net/?retryWrites=true&w=majority');
// acquire the connection to check if it is successfully
const db=mongoose.connection;

// error
db.on('error',console.error.bind(console,'error connecting to db'));

// up and running the print the msg
db.once('open',function(){
    console.log('Successfully connected to a database');
})

