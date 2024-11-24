import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import InvoiceTable from "../components/InvoiceTable";
import {
  Box,
  Container,
  Typography,
  Button,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";

const InvoicesPage = () => {
  const [open, setOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [status, setStatus] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [netAmount, setNetAmount] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);

  // Load invoices from localStorage on component mount
  useEffect(() => {
    const savedInvoices = localStorage.getItem("invoices");
    if (savedInvoices) {
      const invoicesData = JSON.parse(savedInvoices);
      setInvoices(invoicesData); // Set full invoices list
      setFilteredInvoices(invoicesData); // Initially, show all invoices
    } else {
      const defaultInvoices = [
        {
          id: 1,
          vendor: "Vendor Name",
          invoiceNo: "Invoice123",
          status: "Pending",
          netAmount: "5000",
          invoiceDate: "2024-03-01",
          dueDate: "2024-04-01",
        },
      ];
      setInvoices(defaultInvoices);
      setFilteredInvoices(defaultInvoices); // Show default invoices
    }
  }, []);

  // Save invoices to localStorage whenever they change
  useEffect(() => {
    if (invoices.length > 0) {
      console.log("Saving invoices to localStorage", invoices);  // Debugging line
      localStorage.setItem("invoices", JSON.stringify(invoices));
      setFilteredInvoices(invoices); // Update filtered invoices whenever all invoices change
    }
  }, [invoices]);

  const handleOpenModal = (invoice = null) => {
    if (invoice) {
      setEditingInvoice(invoice);
      setVendorName(invoice.vendor);
      setInvoiceNumber(invoice.invoiceNo);
      setStatus(invoice.status);
      setNetAmount(invoice.netAmount);
    } else {
      resetForm();
    }
    setOpen(true);
  };

  const handleCloseModal = () => setOpen(false);

  const resetForm = () => {
    setEditingInvoice(null);
    setVendorName("");
    setInvoiceNumber("");
    setStatus("");
    setNetAmount("");
  };

  const handleCreateOrUpdateInvoice = () => {
    if (editingInvoice) {
      // Update existing invoice
      setInvoices((prevInvoices) =>
        prevInvoices.map((invoice) =>
          invoice.id === editingInvoice.id
            ? {
                ...editingInvoice,
                vendor: vendorName,
                invoiceNo: invoiceNumber,
                status,
                netAmount,
              }
            : invoice
        )
      );
    } else {
      // Create new invoice
      const newInvoice = {
        id: invoices.length + 1, // Ensure unique ID
        vendor: vendorName,
        invoiceNo: invoiceNumber,
        status,
        netAmount,
        invoiceDate: "2024-03-01", // default date
        dueDate: "2024-04-01", // default date
      };
      setInvoices((prevInvoices) => [...prevInvoices, newInvoice]);
    }
    handleCloseModal();
  };

  const handleEdit = (invoice) => {
    handleOpenModal(invoice);
  };

  const handleDelete = (invoiceId) => {
    setInvoices((prevInvoices) =>
      prevInvoices.filter((invoice) => invoice.id !== invoiceId)
    );
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    if (name === "status") {
      setStatus(value);
    } else if (name === "vendorName") {
      setVendorName(value);
    } else if (name === "invoiceNumber") {
      setInvoiceNumber(value);
    }
  };

  const handleFilterSubmit = () => {
    let filtered = invoices;

    // Apply filters based on status, vendor name, and invoice number
    if (status) {
      filtered = filtered.filter((invoice) => invoice.status === status);
    }
    if (vendorName) {
      filtered = filtered.filter((invoice) =>
        invoice.vendor.toLowerCase().includes(vendorName.toLowerCase())
      );
    }
    if (invoiceNumber) {
      filtered = filtered.filter((invoice) =>
        invoice.invoiceNo.toLowerCase().includes(invoiceNumber.toLowerCase())
      );
    }

    setFilteredInvoices(filtered); // Update filtered invoices
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="main-wrapper">
      <Sidebar />
      <div className="content">
        <Navbar />
        <Container sx={{ padding: 2 }}>
          <Typography variant="h5" gutterBottom>
            Manage Invoices
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal()}
          >
            Create Invoice
          </Button>

          {/* Filters Section */}
          <Box sx={{ display: "flex", gap: 2, marginTop: 3 }}>
            <TextField
              label="Status"
              select
              name="status"
              value={status}
              onChange={handleFilterChange}
              sx={{ flex: "1 1 auto" }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Paid">Paid</MenuItem>
              <MenuItem value="Processing">Processing</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </TextField>
            <TextField
              label="Vendor Name"
              name="vendorName"
              value={vendorName}
              onChange={handleFilterChange}
              sx={{ flex: "1 1 auto" }}
            />
            <TextField
              label="Invoice Number"
              name="invoiceNumber"
              value={invoiceNumber}
              onChange={handleFilterChange}
              sx={{ flex: "1 1 auto" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleFilterSubmit}
              sx={{ flex: "0 0 auto" }}
            >
              Apply Filters
            </Button>
          </Box>

          {/* Display the filtered invoices */}
          <InvoiceTable
            invoices={filteredInvoices} // Display filtered invoices
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </Container>

        {/* Create or Edit Invoice Modal */}
        <Modal open={open} onClose={handleCloseModal}>
          <Box sx={{ ...style, width: 400 }}>
            <Typography variant="h6" gutterBottom>
              {editingInvoice ? "Edit Invoice" : "Create Invoice"}
            </Typography>
            <TextField
              label="Vendor Name"
              fullWidth
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Invoice Number"
              fullWidth
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Processing">Processing</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Net Amount"
              fullWidth
              value={netAmount}
              onChange={(e) => setNetAmount(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateOrUpdateInvoice}
            >
              Submit
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default InvoicesPage;
