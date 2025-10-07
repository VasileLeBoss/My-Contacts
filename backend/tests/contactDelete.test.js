const mongoose = require('mongoose');
const request = require('./setup');
const User = require('../models/User');
const Contact = require('../models/Contact');

describe('👥 API Contact - Delete', () => {
  let user, contact;

  beforeEach(async () => {
    user = await User.create({
      email: 'john@example.com',
      phoneNumber: '0606060606',
      password: 'hashedpassword',
      firstName: 'John',
      lastName: 'Doe',
    });

    contact = await Contact.create({
      userId: user._id,
      phoneNumberContact: '0707070707',
      firstNameContact: 'Jane',
      lastNameContact: 'Doe',
    });
  });

  it('✅ DELETE /api/contact/delete/:idContact → supprime un contact avec succès', async () => {
    const res = await request
      .delete(`/api/contact/delete/${contact._id}`)
      .send({ userId: user._id });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Contact supprimé avec succès');
    expect(res.body).toHaveProperty('contactId', contact._id.toString());

    const contactInDb = await Contact.findById(contact._id);
    expect(contactInDb).toBeNull();
  });

  it('❌ DELETE /api/contact/delete/:idContact → renvoie 400 si idContact manquant', async () => {
    const res = await request.delete('/api/contact/delete/').send({ userId: user._id });
    expect(res.statusCode).toBe(404); // Express ne match pas sans paramètre
  });

  it('❌ DELETE /api/contact/delete/:idContact → renvoie 400 si userId manquant', async () => {
    const res = await request.delete(`/api/contact/delete/${contact._id}`).send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', "ID de l'utilisateur est requis");
  });

  it('❌ DELETE /api/contact/delete/:idContact → renvoie 404 si utilisateur inexistant', async () => {
    const fakeUserId = new mongoose.Types.ObjectId();
    const res = await request
      .delete(`/api/contact/delete/${contact._id}`)
      .send({ userId: fakeUserId });

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', 'Utilisateur non trouvé');
  });

  it('❌ DELETE /api/contact/delete/:idContact → renvoie 404 si contact inexistant', async () => {
    const fakeContactId = new mongoose.Types.ObjectId();
    const res = await request
      .delete(`/api/contact/delete/${fakeContactId}`)
      .send({ userId: user._id });

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', 'Contact non trouvé');
  });

  it('❌ DELETE /api/contact/delete/:idContact → renvoie 403 si le contact ne correspond pas au user', async () => {
    const otherUser = await User.create({
      email: 'other@example.com',
      phoneNumber: '0611111111',
      password: 'pwd',
      firstName: 'Other',
      lastName: 'User',
    });

    const res = await request
      .delete(`/api/contact/delete/${contact._id}`)
      .send({ userId: otherUser._id });

    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty('error', "Vous n'êtes pas autorisé à supprimer ce contact");
  });
});
