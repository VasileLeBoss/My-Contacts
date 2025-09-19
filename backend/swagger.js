const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); 

function setupSwagger(app) {
  app.use('/api/doc-api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

module.exports = setupSwagger;
