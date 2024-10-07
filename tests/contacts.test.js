const request = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../app');
let contactId;

jest.setTimeout(30000);  // Increased timeout for long-running tests

afterAll(async () => {
    await mongoose.connection.close();  // Close the MongoDB connection
    server.close();  // Close the server properly
});

describe('Contacts API', () => {
    it('should create a new contact', async () => {
        const newContact = {
            fname: 'John',
            lname: 'Doe',
            phone: '123456789',
            email: 'johndoe@example.com',
            birthday: '1990-01-01'
        };
        const res = await request(app).post('/v1/contacts').send(newContact);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        contactId = res.body._id;  // Save the contact ID for other tests
    });

    it('should get all contacts', async () => {
        const res = await request(app).get('/v1/contacts');
        expect(res.statusCode).toEqual(200);
        expect(res.body.contacts).toBeInstanceOf(Array);
    });

    it('should get a contact by ID', async () => {
        const res = await request(app).get(`/v1/contacts/${contactId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id', contactId);
    });

    it('should update a contact', async () => {
        const updatedContact = {
            fname: 'Jane',
            lname: 'Doe',
            phone: '987654321',
            email: 'janedoe@example.com',
            birthday: '1992-02-02'
        };
        const res = await request(app).put(`/v1/contacts/${contactId}`).send(updatedContact);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('fname', 'Jane');
    });

    it('should delete a contact', async () => {
        const res = await request(app).delete(`/v1/contacts/${contactId}`);
        expect(res.statusCode).toEqual(204);

        const getRes = await request(app).get(`/v1/contacts/${contactId}`);
        expect(getRes.statusCode).toEqual(404);  // Ensure the contact is deleted
    });
});