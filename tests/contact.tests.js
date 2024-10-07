const express = require('express');
const router = express.Router();
const Contact = require('../models/contact'); // Assuming you're using Mongoose

// **Create a new contact**
router.post('/', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newContact = new Contact({ name, email, phone });
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// **Get all contacts**
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();

    // Implement filtering (if needed)
    // Example: ?name=John
    if (req.query.name) {
      contacts = contacts.filter(contact => contact.name.includes(req.query.name));
    }

    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// **Get a single contact by ID**
router.get('/:id', getContact, (req, res) => {
  res.status(200).json(res.contact);
});

// **Update a contact**
router.put('/:id', getContact, async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Update fields if provided
    if (name != null) res.contact.name = name;
    if (email != null) res.contact.email = email;
    if (phone != null) res.contact.phone = phone;

    const updatedContact = await res.contact.save();
    res.status(200).json(updatedContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// **Delete a contact**
router.delete('/:id', getContact, async (req, res) => {
  try {
    await res.contact.remove();
    res.status(204).json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// **Middleware to get contact by ID**
async function getContact(req, res, next) {
  let contact;
  try {
    contact = await Contact.findById(req.params.id);
    if (contact == null) {
      return res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.contact = contact;
  next();
}

module.exports = router;