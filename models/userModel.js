const mongoose= require('mongoose');

const userSchema= mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'

    },
    name:{
        type: String,
        required: [true, "Please add a name"]
    },
    email:{
        type: String,
        required: [true, "Please be sure to add an email id"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Please add a paassword"]
    }
},
{
    timestamps: true
}
)

module.exports= mongoose.model("User", userSchema);