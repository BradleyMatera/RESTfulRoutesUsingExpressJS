const Contact = require('../../models/contact');describe('Contact Model', () => {
  it('should create a contact with valid fields', async () => {
    const validContact = new Contact({
      fname: 'John',
      lname: 'Doe',
      email: 'john.doe@example.com',
      phone: '555-555-5555',
      birthday: '1990-01-01',
    });

    expect(validContact.fname).toBe('John');
    expect(validContact.email).toBe('john.doe@example.com');
  });
});