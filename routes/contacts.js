const express = require('express');
const Contact = require('../models/contact');
const router = express.Router();

// Middleware to set Content-Type header for all responses
router.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Get all contacts with pagination, sorting, and filtering
router.get('/', async (req, res) => {
  const { page = 1, limit = 10, sort = 'lname', direction = 'asc' } = req.query;

  try {
    const contacts = await Contact.find()
      .sort({ [sort]: direction === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalContacts = await Contact.countDocuments();
    const totalPages = Math.ceil(totalContacts / limit);

    res.status(200).json({
      contacts,
      pagination: {
        currentPage: page,
        totalPages,
        totalContacts,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// Create a new contact
router.post('/', async (req, res) => {
  const contact = new Contact(req.body);
  try {
    const savedContact = await contact.save();
    res.status(201).location(`/v1/contacts/${savedContact._id}`).json(savedContact);
  } catch (error) {
    res.status(400).json({ message: 'Error creating contact: ' + error.message });
  }
});

// Get a specific contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving contact: ' + error.message });
  }
});

// Update a specific contact by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: 'Error updating contact: ' + error.message });
  }
});

// Delete a specific contact by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(204).send(); // Send a 204 No Content status
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact: ' + error.message });
  }
});

module.exports = router;