const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Contact = require('../../models/Contact');

router.post('/', async (req, res) =>{
    const { userId, phoneNumberContact, firstNameContact, lastNameContact } = req.body;

    if (!userId || !phoneNumberContact || !firstNameContact || !lastNameContact) {
        return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    const newContact = {
        phoneNumberContact,
        firstNameContact,
        lastNameContact,
        userId: user._id
    };

    const contact = new Contact(newContact);
    await contact.save();

    res.status(201).json({
        message: "Contact ajouté avec succès",
        contact: newContact
    });
});

module.exports = router;