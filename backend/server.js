const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // To load environment variables from a .env file

// Import routes
const invoiceRoutes = require('./routes/invoiceRoutes');

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/finifi'; // Using env variable for MongoDB URI
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Root route (added for testing connection)
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// Routes
app.use('/api/invoices', invoiceRoutes);

// Global error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error details for debugging
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
