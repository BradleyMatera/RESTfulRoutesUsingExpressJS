require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Connected to MongoDB'));

// Routes
const contactsRouter = require('./routes/contacts');
app.use('/v1/contacts', contactsRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});