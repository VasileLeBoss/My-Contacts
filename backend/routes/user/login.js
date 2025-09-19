const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../../models/User');


router.post('/', async (req, res) =>{
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(400).json({ error: "Email et mot de passe requis" });
    }

    const user = await User.findOne({
        $or: [{ email: email.trim().toLowerCase() }]
    })

    if (!user) {
        return res.status(401).json({
            error: "Identifiants invalides"
        });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return res.status(401).json({
        error: "Identifiants invalides"
        });
    }

    const tokenPayload = {
        id: user._id,
        email: user.email,
        phoneNumber: user.phoneNumber,
        firstName: user.firstName,
        lastName: user.lastName,
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

    res.status(200).json({
        message: "Utilisateur connecté",
        user: tokenPayload,
        token
    });

});

module.exports = router;