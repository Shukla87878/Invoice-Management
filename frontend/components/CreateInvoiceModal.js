import React, { useState } from 'react'; 
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem } from '@mui/material';

const statuses = [
  'Open',
  'Awaiting Approval',
  'Approved',
  'Processing',
  'Paid',
  'Rejected',
  'Vendor Not Found',
  'Duplicate',
  'Void',
];

const CreateInvoiceModal = ({ open, onClose, onCreateInvoice }) => {
  const [form, setForm] = useState({
    vendorName: '',
    invoiceNumber: '',
    status: '',
    netAmount: '',
    invoiceDate: '',
    dueDate: '',
    department: '',
    poNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    const newInvoice = {
      id: Date.now(), // Generate a unique ID using timestamp
      vendor: form.vendorName,
      invoiceNo: form.invoiceNumber,
      status: form.status,
      netAmount: form.netAmount,
      invoiceDate: form.invoiceDate,
      dueDate: form.dueDate,
      department: form.department,
      poNumber: form.poNumber,
    };

    onCreateInvoice(newInvoice); // Pass the new invoice back to the parent
    onClose(); // Close the modal after submission
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create Invoice</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Vendor Name"
          name="vendorName"
          value={form.vendorName}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Invoice Number"
          name="invoiceNumber"
          value={form.invoiceNumber}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          select
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          margin="normal"
        >
          {statuses.map((status, index) => (
            <MenuItem key={index} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          label="Net Amount"
          name="netAmount"
          value={form.netAmount}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Invoice Date"
          name="invoiceDate"
          type="date"
          value={form.invoiceDate}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Due Date"
          name="dueDate"
          type="date"
          value={form.dueDate}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Department"
          name="department"
          value={form.department}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="PO Number"
          name="poNumber"
          value={form.poNumber}
          onChange={handleChange}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateInvoiceModal;
