const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

router.post('/', async (req, res) => {
  const { email, password ,lastName, firstName, phoneNumber} = req.body

  try {
    const existingUser = await User.findOne({
      $or: [{email}, {phoneNumber}]
    })

    // si l'utilisateur existe deja 
    if(existingUser){
      if(existingUser.email === email){
        return res.status(409).json({
          field:'email', error: 'L\'e-mail que vous avez fourni est déjà associé à un compte.'
        })
      }
      if(existingUser.phoneNumber === phoneNumber){
        return res.status(409).json({
          field: 'phoneNumber', error: 'Le numéro de téléphone que vous avez fourni n\'est pas disponible.'
        })
      }
    }

    // mdp
    const hashedPassword = await bcrypt.hash(password, 10);
    password = '';

    // user creation
    const user = new User({
      email,
      phoneNumber,
      password: hashedPassword,
      firstName,
      lastName,
      contacts:{}
    });

    // enregistrement
    await user.save();

    const tokenPayload = {
      id: user._id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      contacts: user.contacts
    };

    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET,
      {expiresIn: '1d'}
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'prod', 
      sameSite: 'Strict',
      maxAge: 24 * 60 * 60 * 1000, 
      path: '/'
    });

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      user: {
        id: user._id,
        email: user.email,
        phoneNumber: user.phoneNumber,
        firstName: user.firstName,
        lastName: user.lastName,
        contacts: user.contacts
      },
      token 
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur lors de l\'inscription' });
  }


});


module.exports = router;