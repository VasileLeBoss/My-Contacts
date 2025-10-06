require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const setupSwagger = require('./swagger');
const path = require('path');

const app = express();

const isProduction = process.env.NODE_ENV === "production";
const apiRoutes = require('./routes');

app.use(cors({
    origin: ['http://localhost:3000', 'https://mycontacts.alwaysdata.net'],
    credentials: false,
}));

// connexion MongoDB
mongoose.connect(process.env.MONGO_URI) 
  .then(() => {
      console.log('✅ MongoDB connecté');
      console.log('-------------------------------');
  })
  .catch(error => {
      console.log('❌ Erreur MongoDB:', error);
      console.log('-------------------------------');
  });

app.use(express.json());

// Routes API
app.use('/api', apiRoutes);

// Swagger
setupSwagger(app);

// Production 
if (isProduction) {
  const buildPath = path.join(__dirname, '../build');
  app.use(express.static(buildPath));

  app.use((req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('-------------------------------');
    console.log(`Serveur lancé sur le port ${PORT}`);
    console.log('-------------------------------');
});
