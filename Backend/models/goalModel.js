const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    text:{
        type : String,
        require: ['true','Please add text.']
    },
   

},
{
    timestamps: true
});

 
const Goal = new mongoose.model("Goal", goalSchema);

module.exports = Goal; 