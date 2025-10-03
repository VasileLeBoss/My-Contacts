const express = require('express');
const router = express.Router();

// importation des routes api
const registerController = require('./user/register') 
const loginController = require('./user/login')
const addContactController = require('./contact/addContact');
const getAllContactController = require('./contact/getAllContact');

// importation du middleware
const authMiddleware = require('../middlewares/authMiddleware');

// afectation des routes 
router.use('/auth/register', registerController);
router.use('/auth/login', loginController );

// route contact
router.use('/contact/add',authMiddleware, addContactController);
router.use('/contact/all',authMiddleware, getAllContactController);

module.exports = router;