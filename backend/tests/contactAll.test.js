const mongoose = require('mongoose');
const request = require('./setup');
const User = require('../models/User');
const Contact = require('../models/Contact');

describe('👥 API Contact - Get All', () => {
  let user;

  beforeEach(async () => {
    user = await User.create({
      email: 'john@example.com',
      phoneNumber: '0606060606',
      password: 'hashedpassword',
      firstName: 'John',
      lastName: 'Doe',
    });

    await Contact.insertMany([
      { userId: user._id, phoneNumberContact: '0707070707', firstNameContact: 'Jane', lastNameContact: 'Doe' },
      { userId: user._id, phoneNumberContact: '0808080808', firstNameContact: 'Bob', lastNameContact: 'Smith' },
    ]);
  });

  it('✅ GET /api/contact/all/:userId → retourne tous les contacts de l’utilisateur', async () => {
    const res = await request.get(`/api/contact/all/${user._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('contacts');
    expect(res.body.contacts.length).toBe(2);

    const [firstContact] = res.body.contacts;
    expect(firstContact).toHaveProperty('phoneNumberContact');
    expect(firstContact).toHaveProperty('firstNameContact');
    expect(firstContact).toHaveProperty('lastNameContact');
  });

  it('❌ GET /api/contact/all/:userId → renvoie une erreur si ID utilisateur manquant', async () => {
    const res = await request.get('/api/contact/all/'); // pas de param

    // Express retourne 404 car la route sans paramètre ne matche pas
    expect(res.statusCode).toBe(404);
  });

  it('❌ GET /api/contact/all/:userId → renvoie 404 si utilisateur inexistant', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request.get(`/api/contact/all/${fakeId}`);

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', 'Utilisateur non trouvé');
  });

  it('✅ GET /api/contact/all/:userId → retourne un tableau vide si aucun contact', async () => {
    const newUser = await User.create({
      email: 'no.contacts@example.com',
      phoneNumber: '0611111111',
      password: 'test',
      firstName: 'Empty',
      lastName: 'User',
    });

    const res = await request.get(`/api/contact/all/${newUser._id}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.contacts)).toBe(true);
    expect(res.body.contacts).toHaveLength(0);
  });
});
