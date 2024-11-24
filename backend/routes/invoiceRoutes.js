const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice'); // Assuming you have an Invoice model

// Get invoices with filters
router.get("/", async (req, res) => {
  const { status, vendorName, invoiceNumber } = req.query;

  // Create a query object for filters
  const query = {};
  if (status) query.status = status;
  if (vendorName) query.vendorName = { $regex: vendorName, $options: "i" }; // Case-insensitive search
  if (invoiceNumber) query.invoiceNumber = invoiceNumber;

  try {
    const invoices = await Invoice.find(query);
    res.status(200).json(invoices); // Return the filtered invoices
  } catch (error) {
    res.status(500).json({ message: "Error fetching invoices", error });
  }
});

module.exports = router;
