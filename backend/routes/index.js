const express = require('express');
const router = express.Router();

// importation des routes api
const registerController = require('./user/register') 
const loginController = require('./user/login')
const addContactController = require('./contact/add-contact');

// afectation des routes 
router.use('/auth/register', registerController);
router.use('/auth/login', loginController );

// route contact
router.use('/contact/add', addContactController);

module.exports = router;