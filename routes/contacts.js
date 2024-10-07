const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// GET all contacts with manual pagination, sorting, and filtering
router.get('/', async (req, res) => {
  try {
    let contacts = await Contact.find({}); // Fetch all contacts

    // Handle case where there are no contacts
    if (contacts.length === 0) {
      return res.status(200).json({ message: "No contacts available" });
    }

    // Filtering
    if (req.get('X-Filter-By')) {
      const filterBy = req.get('X-Filter-By');
      const filterOperator = req.get('X-Filter-Operator') || '=';
      const filterValue = req.get('X-Filter-Value');

      // Apply filter based on the specified criteria
      contacts = contacts.filter(contact => {
        const value = contact[filterBy];
        if (!value) return false;
        
        switch (filterOperator) {
          case '=':
            return value == filterValue;
          case '!=':
            return value != filterValue;
          case '>':
            return value > filterValue;
          case '<':
            return value < filterValue;
          default:
            return true;
        }
      });
    }

    // Sorting
    if (req.query.sort && req.query.direction) {
      const sortField = req.query.sort;
      const sortDirection = req.query.direction === 'asc' ? 1 : -1;
      contacts = contacts.sort((a, b) => (a[sortField] > b[sortField] ? sortDirection : -sortDirection));
    }

    // Manual Pagination
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    const startIndex = (page - 1) * size;
    const endIndex = page * size;

    const paginatedContacts = contacts.slice(startIndex, endIndex);

    // Set pagination headers
    res.set('X-Page-Total', Math.ceil(contacts.length / size));
    res.set('X-Page-Next', page < Math.ceil(contacts.length / size) ? page + 1 : null);
    res.set('X-Page-Prev', page > 1 ? page - 1 : null);

    res.status(200).json(paginatedContacts);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST: Create a new contact
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

module.exports = router;