const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);
});

afterEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany(); 
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

module.exports = request(app);
