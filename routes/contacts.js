const express = require('express');
const router = express.Router();
const Contact = require('../models/contact'); // Assuming your Mongoose Contact model is here

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find(); // Retrieve all contacts
    if (contacts.length === 0) {
      return res.status(404).json({ message: 'No contacts found' });
    }
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create a new contact
router.post('/', async (req, res) => {
  const contact = new Contact({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    phone: req.body.phone,
    birthday: req.body.birthday,
  });
  try {
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update an existing contact
router.put('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a contact
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(204).json(); // No content response on successful deletion
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;