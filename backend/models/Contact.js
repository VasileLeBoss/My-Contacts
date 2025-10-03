const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    phoneNumberContact: { type: String, required: true, trim: true },
    firstNameContact: { type: String, required: true, trim: true },
    lastNameContact: { type: String, required: true, trim: true },

    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
