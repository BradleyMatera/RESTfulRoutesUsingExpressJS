const express = require('express');
const router = express.Router();

const contactsRoutes = require('./contacts');

// Use contacts routes
router.use('/contacts', contactsRoutes);

module.exports = router;