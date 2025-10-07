const request = require('./setup');

describe('🔐 API Auth - User', () => {
  test('POST /api/auth/register → crée un utilisateur', async () => {
    const res = await request.post('/api/auth/register').send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phoneNumber: '0612345678',
      password: 'Password123!',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toMatch(/succès/i);
  });

  test('POST /api/auth/register → renvoie une erreur si email déjà utilisé', async () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phoneNumber: '0612345678',
      password: 'Password123!',
    };

    await request.post('/api/auth/register').send(userData);
    const res = await request.post('/api/auth/register').send(userData);

    expect(res.statusCode).toBe(409);
    expect(res.body).toHaveProperty('error');
  });

  test('POST /api/auth/login → connecte un utilisateur', async () => {
    await request.post('/api/auth/register').send({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      phoneNumber: '0698765432',
      password: 'Password123!',
    });

    const res = await request.post('/api/auth/login').send({
      email: 'jane@example.com',
      password: 'Password123!',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('POST /api/auth/login → refuse un mauvais mot de passe', async () => {
    await request.post('/api/auth/register').send({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      phoneNumber: '0698765432',
      password: 'Password123!',
    });

    const res = await request.post('/api/auth/login').send({
      email: 'jane@example.com',
      password: 'wrongpassword',
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });
});
