const mongoose = require('mongoose');


const contactSchema = new mongoose.Schema({

    phoneNumberContact:{ type: String, required: true, trim:true, },
    firstNameContact:{ type:String, required:true, trim:true },
    lastNameContact:{ type:String, required:true, trim:true },

})

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required:true,
        lowercase:true,
        trim:true,
        unique: true
    },
    phoneNumber:{ type: String, required: true, trim:true, unique:true },
    password:{ type:String },
    firstName:{ type:String, required:true, trim:true },
    lastName:{ type:String, required:true, trim:true },

    contacts: { type: [contactSchema], default: [] },

    createdAt: { type: Date, default: Date.now },

})

const User = mongoose.model('User', userSchema);

module.exports = User;