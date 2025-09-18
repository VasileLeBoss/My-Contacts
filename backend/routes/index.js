const express = require('express');
const router = express.Router();

// importation des routes api
const registerRoute = require('./user/register') 


// afectation des routes 
router.use('/auth/register', registerRoute);

module.exports = router;