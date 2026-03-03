require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 8080;

// Parse incoming JSON request bodies
app.use(express.json());

// Connect to MongoDB.
// useNewUrlParser / useUnifiedTopology were removed in Mongoose 6+; omit them.
// See https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes — contacts are mounted directly at /v1/contacts
const contactsRouter = require('./routes/contacts');
app.use('/v1/contacts', contactsRouter);

// Global error-handling middleware (must be defined after all routes).
// Catches any error passed to next(err) and returns a consistent JSON response.
// See https://expressjs.com/en/guide/error-handling.html
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const body = { message: err.message };
  if (process.env.NODE_ENV !== 'production') {
    body.stack = err.stack;
  }
  res.status(status).json(body);
});

// Start the server and listen on the configured port
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export app and server for testing
module.exports = { app, server };