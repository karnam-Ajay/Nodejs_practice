const mongoose = require('mongoose');

const userModelSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please add the user name"]
    },
    email:{
        type:String,
        required:[true,"Please add the user email address"],
        unique:[true,"email address already taken"]
    },
    password:{
        type:String,
        required:[true,"Please add the user password"]
    }
},{
    timestamp:[true]
});

module.exports = mongoose.model("User",userModelSchema);