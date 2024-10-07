const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app'); // Adjust the path to app.js if necessary
const Contact = require('../models/contact');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET /v1/contacts', () => {
  it('should return a single contact when ID is provided', async () => {
    const contact = new Contact({
      fname: 'John',
      lname: 'Doe',
      email: 'john.doe@example.com',
      phone: '555-5555',
      birthday: '1990-01-01',
    });
    await contact.save();
    const res = await supertest(app).get(`/v1/contacts/${contact._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', contact._id.toString());
  });

  it('should update a contact', async () => {
    const contact = new Contact({
      fname: 'John',
      lname: 'Doe',
      email: 'john.doe@example.com',
      phone: '555-5555',
      birthday: '1990-01-01',
    });
    await contact.save();
    const updatedData = { fname: 'Jane' };
    const res = await supertest(app)
      .put(`/v1/contacts/${contact._id}`)
      .send(updatedData)
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('fname', 'Jane');
  });

  it('should delete a contact', async () => {
    const contact = new Contact({
      fname: 'John',
      lname: 'Doe',
      email: 'john.doe@example.com',
      phone: '555-5555',
      birthday: '1990-01-01',
    });
    await contact.save();
    const res = await supertest(app).delete(`/v1/contacts/${contact._id}`);
    expect(res.statusCode).toBe(204);
  });
});