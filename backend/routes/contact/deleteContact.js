
const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Contact = require('../../models/Contact');

router.delete('/:idContact', async (req, res) =>{
    const { idContact } = req.params;
    const { userId } = req.body;

    if (!idContact) {
        return res.status(400).json({ error: "ID du contact est requis" });
    }
    if (!userId) {
        return res.status(400).json({ error: "ID de l'utilisateur est requis" });
    }

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    const contact = await Contact.findById(idContact);

    if (!contact) {
        return res.status(404).json({ error: "Contact non trouvé" });
    }
    if (contact.userId.toString() !== user._id.toString()) {
        return res.status(403).json({ error: "Vous n'êtes pas autorisé à supprimer ce contact" });
    }

    await Contact.findByIdAndDelete(idContact);

 
    res.status(201).json({
        message: "Contact supprimé avec succès",
        contactId: idContact
    });
});

module.exports = router;