const mongoose = require("mongoose");

module.exports = async function connectDB() {
  const uri = process.env.MONGO_URI;
  mongoose.set('debug', true);
  mongoose.set('bufferCommands', false);
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('DB connected', mongoose.connection.host, mongoose.connection.name);
};

const contactSchema= mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please add the name it is mandatory"]
    },
    email:{
        type: String,
        required: [true, "Please add the email it is mandatory"]
    },
    number:{
        type: String,
        required: [true, "Please add the phone number, it is mandatory"]
    }
},{
    timestamp: true,
})

module.exports= mongoose.model("Contact", contactSchema);