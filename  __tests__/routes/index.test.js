const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../app'); // Fix the path if necessary
const Contact = require('../../models/contact');

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
  beforeEach(async () => {
    // Seed the database with a contact before each test
    await Contact.create({
      fname: 'John',
      lname: 'Doe',
      email: 'john.doe@example.com',
      phone: '555-5555',
      birthday: '1990-01-01',
    });
  });

  afterEach(async () => {
    // Clean up after each test
    await Contact.deleteMany({});
  });

  it('should return a list of contacts', async () => {
    const res = await supertest(app).get('/v1/contacts');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0); // Ensure there's at least one contact
  });
});