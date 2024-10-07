require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
const contactsRouter = require('./routes/contacts');
app.use('/v1/contacts', contactsRouter); // Make sure this path is correct

// Start the server and listen on the correct port
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export app and server for testing
module.exports = { app, server };