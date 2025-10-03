const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Contact = require('../../models/Contact');

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "ID utilisateur requis" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    const contacts = await Contact.find({ userId: user._id });
    res.status(200).json({ contacts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
