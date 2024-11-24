
const mongoose = require('mongoose');
const InvoiceSchema = new mongoose.Schema({
  vendorName: String,
  invoiceNumber: String,
  status: String,
  netAmount: Number,
  invoiceDate: Date,
  dueDate: Date,
  department: String,
  poNumber: String,
  createdTime: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Invoice', InvoiceSchema);
