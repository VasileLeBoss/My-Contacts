const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Contact = require('../../models/Contact');

router.patch('/:idContact', async (req, res) => {
  try {
    const { idContact } = req.params;
    const { userId, phoneNumberContact, firstNameContact, lastNameContact } = req.body;

    if (!idContact) {
      return res.status(400).json({ error: "L'ID du contact est requis." });
    }

    if (!userId || !phoneNumberContact || !firstNameContact || !lastNameContact) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    const contact = await Contact.findById(idContact);
    if (!contact) {
      return res.status(404).json({ error: "Contact non trouvé." });
    }

    if (contact.userId.toString() !== user._id.toString()) {
      return res.status(403).json({ error: "Vous n'êtes pas autorisé à modifier ce contact." });
    }

    contact.set({
      phoneNumberContact,
      firstNameContact,
      lastNameContact
    });

    await contact.save();

    return res.status(200).json({
      message: "Contact mis à jour avec succès.",
      contact
    });

  } catch (error) {
    console.error("Erreur lors de la mise à jour du contact:", error);
    return res.status(500).json({ error: "Erreur serveur." });
  }
});

module.exports = router;
