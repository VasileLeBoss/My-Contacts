const mongoose = require('mongoose');
const request = require('./setup'); // ton setup avec Supertest
const User = require('../models/User');
const Contact = require('../models/Contact');

describe('👥 API Contact - Add', () => {
  let user;

  beforeEach(async () => {
    user = await User.create({
      email: 'john@example.com',
      phoneNumber: '0606060606',
      password: 'hashedpassword',
      firstName: 'John',
      lastName: 'Doe',
    });
  });

  it('✅ POST /api/contact/add → ajoute un contact avec succès', async () => {
    const contactData = {
      userId: user._id,
      phoneNumberContact: '0707070707',
      firstNameContact: 'Jane',
      lastNameContact: 'Doe'
    };

    const res = await request
      .post('/api/contact/add')
      .send(contactData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Contact ajouté avec succès');
    expect(res.body.contact).toMatchObject({
      phoneNumberContact: contactData.phoneNumberContact,
      firstNameContact: contactData.firstNameContact,
      lastNameContact: contactData.lastNameContact,
      userId: user._id.toString()
    });

    const contactInDb = await Contact.findOne({ phoneNumberContact: contactData.phoneNumberContact });
    expect(contactInDb).not.toBeNull();
  });

  it('❌ POST /api/contact/add → renvoie une erreur si un champ est manquant', async () => {
    const res = await request.post('/api/contact/add').send({
      userId: user._id,
      firstNameContact: 'Jane'
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Tous les champs sont requis');
  });

  it('❌ POST /api/contact/add → renvoie une erreur si utilisateur inexistant', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request.post('/api/contact/add').send({
      userId: fakeId,
      phoneNumberContact: '0808080808',
      firstNameContact: 'Ghost',
      lastNameContact: 'User'
    });

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', 'Utilisateur non trouvé');
  });
});
