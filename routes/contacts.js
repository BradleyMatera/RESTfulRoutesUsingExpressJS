const express = require('express');
const Contact = require('../models/contact');
const router = express.Router();

// express.json() in app.js handles request body parsing; no extra Content-Type
// middleware is needed here because res.json() sets the header automatically.

// Required fields for a contact
const REQUIRED_FIELDS = ['fname', 'lname', 'phone', 'email', 'birthday'];

// Validate that all required fields are present; returns an errors array or null.
function validateContact(body) {
  const errors = REQUIRED_FIELDS.filter(f => !body[f]).map(f => `${f} is required`);
  return errors.length ? errors : null;
}

// Get all contacts with pagination, sorting, and filtering
router.get('/', async (req, res, next) => {
  // Parse and guard page / limit — see https://expressjs.com/en/api.html#req.query
  let page = parseInt(req.query.page, 10);
  let limit = parseInt(req.query.limit, 10);
  const { sort = 'lname', direction = 'asc' } = req.query;

  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(limit) || limit < 1) limit = 10;
  if (limit > 100) limit = 100;

  try {
    const contacts = await Contact.find()
      .sort({ [sort]: direction === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(limit);

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
    next(error);
  }
});

// Create a new contact
router.post('/', async (req, res, next) => {
  const errors = validateContact(req.body);
  if (errors) {
    return res.status(400).json({ errors });
  }

  const contact = new Contact(req.body);
  try {
    const savedContact = await contact.save();
    res.status(201).location(`/v1/contacts/${savedContact.id}`).json(savedContact);
  } catch (error) {
    next(error);
  }
});

// Get a specific contact by ID
router.get('/:id', async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

// Update a specific contact by ID
router.put('/:id', async (req, res, next) => {
  const errors = validateContact(req.body);
  if (errors) {
    return res.status(400).json({ errors });
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
});

// Delete a specific contact by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(204).send(); // 204 No Content
  } catch (error) {
    next(error);
  }
});

module.exports = router;