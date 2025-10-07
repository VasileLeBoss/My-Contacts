const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/User');
const Contact = require('../models/Contact');

let token;
let userId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);

  // créer un utilisateur pour les tests
  const user = await request(app)
    .post("/api/auth/register")
    .send({
      name: "ContactUser",
      email: "contact@test.com",
      password: "123456"
    });

  token = user.body.token;
  userId = user.body.user._id;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Contacts API", () => {

  let contactId;

  test("POST /api/contact/add - should add a contact", async () => {
    const res = await request(app)
      .post("/api/contact/add")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "John Doe",
        email: "john@example.com",
        phone: "0606060606",
        userId
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.contact).toHaveProperty("_id");
    contactId = res.body.contact._id;
  });

  test("GET /api/contact/all/:userId - should return all contacts", async () => {
    const res = await request(app)
      .get(`/api/contact/all/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.contacts.length).toBeGreaterThan(0);
  });

  test("DELETE /api/contact/:id - should delete contact", async () => {
    const res = await request(app)
      .delete(`/api/contact/${contactId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});
