require('dotenv').config();
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')

const app = express();
const isProd = process.env.NODE_ENV === "prod";
const apiRoutes = require('./api');

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}))


// conexion mongodb
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log('MongoDB connecté');
}).catch(error =>{
    console.log('Erreur MongoDB:', error)
});

// Routes API
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`-------------------------------`);
    console.log(`Serveur lancé sur le port ${PORT}`);
    console.log(`-------------------------------`);
});