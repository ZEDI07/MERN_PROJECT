const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        require: [true,'please add a name']
    },
    email:{
        type: String,
        require:[true,'please add a email'],
        unique: true
    },
    contact:{
        type: Number,
        require: true
    },
    password:{
        type: String, 
        require:[true,'please add a password'],
    }

},
{
    timestamps: true
});

 
const User = new mongoose.model("User", userSchema);

module.exports = User; 