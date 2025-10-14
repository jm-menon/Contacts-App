console.log("Hello World");

const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const connectDB = require('./config/dbConnect')
const errorHandler = require('./middleware/errorHandler');

connectDB();

app.use(express.json()); //the middleware that is inbuilt and helps in parsing the json body of the reuest
//app.use(express.urlencoded({ extended: true })); //to parse the url encoded data


app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});


const PORT = process.env.PORT || 5000;
//console.log('check 1');
app.use('/api/contacts', require('./routes/contactRoutes'));  //use is the middleware here
app.use('/api/user', require('./routes/userRoutes')); 
//console.log('check 2');
app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`SERVER LISTENING ON PORT ${PORT}`);
})
