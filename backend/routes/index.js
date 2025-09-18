const express = require('express');
const router = express.Router();

// importation des routes api
const registerController = require('./user/register') 
const loginController = require('./user/login')


// afectation des routes 
router.use('/auth/register', registerController);
router.use('/auth/login', loginController );

module.exports = router;