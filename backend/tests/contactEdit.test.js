const mongoose = require('mongoose');
const request = require('./setup'); // ← ton setup global
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Contact = require('../models/Contact');

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '1h',
  });
};

describe('PATCH /api/contact/edit/:idContact', () => {
  it('✅ met à jour un contact avec succès', async () => {
    const user = await User.create({
      email: 'test1@mail.com',
      phoneNumber: '0600000001',
      password: '123456',
      firstName: 'Jean',
      lastName: 'Dupont',
    });

    const token = generateToken(user);

    const contact = await Contact.create({
      userId: user._id,
      firstNameContact: 'Paul',
      lastNameContact: 'Martin',
      phoneNumberContact: '0707070707',
    });

    const res = await request
      .patch(`/api/contact/edit/${contact._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: user._id.toString(),
        firstNameContact: 'Lucas',
        lastNameContact: 'Bernard',
        phoneNumberContact: '0606060606',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Contact mis à jour avec succès.');
    expect(res.body.contact.firstNameContact).toBe('Lucas');
    expect(res.body.contact.lastNameContact).toBe('Bernard');
  });

  it('🚫 refuse la modification si le contact appartient à un autre utilisateur', async () => {
    const user1 = await User.create({
      email: 'user1@mail.com',
      phoneNumber: '0600000002',
      password: '123456',
      firstName: 'Alice',
      lastName: 'Martin',
    });

    const user2 = await User.create({
      email: 'user2@mail.com',
      phoneNumber: '0600000003',
      password: '123456',
      firstName: 'Bob',
      lastName: 'Durand',
    });

    const contact = await Contact.create({
      userId: user1._id,
      firstNameContact: 'Paul',
      lastNameContact: 'Lemoine',
      phoneNumberContact: '0707070707',
    });

    const token = generateToken(user2);

    const res = await request
      .patch(`/api/contact/edit/${contact._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: user2._id.toString(),
        firstNameContact: 'Lucas',
        lastNameContact: 'Bernard',
        phoneNumberContact: '0606060606',
      });

    expect(res.statusCode).toBe(403);
    expect(res.body.error).toBe("Vous n'êtes pas autorisé à modifier ce contact.");
  });

  it('🚫 renvoie 404 si le contact n’existe pas', async () => {
    const user = await User.create({
      email: 'user3@mail.com',
      phoneNumber: '0600000004',
      password: '123456',
      firstName: 'Jean',
      lastName: 'Dupont',
    });

    const token = generateToken(user);
    const fakeId = new mongoose.Types.ObjectId();

    const res = await request
      .patch(`/api/contact/edit/${fakeId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: user._id.toString(),
        firstNameContact: 'Lucas',
        lastNameContact: 'Bernard',
        phoneNumberContact: '0606060606',
      });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Contact non trouvé.');
  });

  it('🚫 renvoie 400 si un champ requis est manquant', async () => {
    const user = await User.create({
      email: 'user4@mail.com',
      phoneNumber: '0600000005',
      password: '123456',
      firstName: 'Jean',
      lastName: 'Dupont',
    });

    const token = generateToken(user);

    const contact = await Contact.create({
      userId: user._id,
      firstNameContact: 'Paul',
      lastNameContact: 'Martin',
      phoneNumberContact: '0707070707',
    });

    const res = await request
      .patch(`/api/contact/edit/${contact._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: user._id.toString(),
        firstNameContact: '',
        lastNameContact: 'Bernard',
        phoneNumberContact: '0606060606',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Tous les champs sont requis.');
  });

});
