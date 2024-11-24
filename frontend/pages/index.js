import InvoiceTable from "../components/InvoiceTable";
import { Button, Box, Typography, Container, TextField, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import CreateInvoiceModal from "../components/CreateInvoiceModal";

export default function Home() {
  const [open, setOpen] = useState(false); // State to control modal visibility
  const [invoices, setInvoices] = useState([]); // State for invoices
  const [filters, setFilters] = useState({ status: "", vendorName: "", invoiceNumber: "" }); // State for filters

  // Fetch invoices from the server with filters
  const fetchInvoices = async () => {
    try {
      let url = "http://localhost:5000/api/invoices?"; // Backend API URL

      // Append filters to URL
      if (filters.status) url += `status=${filters.status}&`;
      if (filters.vendorName) url += `vendorName=${filters.vendorName}&`;
      if (filters.invoiceNumber) url += `invoiceNumber=${filters.invoiceNumber}&`;

      console.log("Fetching URL:", url); // Debugging

      const response = await fetch(url); // Ensure correct backend URL

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setInvoices(data); // Update state with fetched invoices
    } catch (error) {
      console.error("Error fetching invoices:", error);

      // Set default invoices for testing if backend call fails
      const defaultInvoices = [
        {
          id: 1,
          vendor: "Vendor A",
          invoiceNo: "Invoice001",
          status: "Pending",
          netAmount: "5000",
          invoiceDate: "2024-03-01",
          dueDate: "2024-04-01",
        },
        {
          id: 2,
          vendor: "Vendor B",
          invoiceNo: "Invoice002",
          status: "Paid",
          netAmount: "3000",
          invoiceDate: "2024-03-05",
          dueDate: "2024-04-05",
        },
        {
          id: 3,
          vendor: "Vendor C",
          invoiceNo: "Invoice003",
          status: "Approved",
          netAmount: "10000",
          invoiceDate: "2024-03-10",
          dueDate: "2024-04-10",
        },
      ];
      setInvoices(defaultInvoices); // Show default invoices if fetch fails
    }
  };

  // Fetch invoices when component mounts or when filters change
  useEffect(() => {
    fetchInvoices(); // Fetch invoices on mount or when filters change
  }, [filters]); // Run whenever filters change

  const handleCreateInvoice = (newInvoice) => {
    // Immediately add the new invoice to the list in the frontend (without fetching again)
    setInvoices((prevInvoices) => [...prevInvoices, newInvoice]);
    setOpen(false); // Close the modal
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleFilterSubmit = () => {
    fetchInvoices(); // Fetch invoices with the updated filters
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: 4,
        gap: 3,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
        sx={{ color: "#333" }}
      >
        List of Invoices
      </Typography>

      {/* Filters */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          width: "100%",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <TextField
          label="Status"
          select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          fullWidth
          sx={{ flex: "1 1 30%" }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Open">Open</MenuItem>
          <MenuItem value="Awaiting Approval">Awaiting Approval</MenuItem>
          <MenuItem value="Approved">Approved</MenuItem>
          <MenuItem value="Processing">Processing</MenuItem>
          <MenuItem value="Paid">Paid</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
          <MenuItem value="Vendor Not Found">Vendor Not Found</MenuItem>
          <MenuItem value="Duplicate">Duplicate</MenuItem>
          <MenuItem value="Void">Void</MenuItem>
        </TextField>

        <TextField
          label="Vendor Name"
          name="vendorName"
          value={filters.vendorName}
          onChange={handleFilterChange}
          fullWidth
          sx={{ flex: "1 1 30%" }}
        />

        <TextField
          label="Invoice Number"
          name="invoiceNumber"
          value={filters.invoiceNumber}
          onChange={handleFilterChange}
          fullWidth
          sx={{ flex: "1 1 30%" }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleFilterSubmit}
          sx={{ flex: "1 1 auto", alignSelf: "center" }}
        >
          Apply Filters
        </Button>
      </Box>

      <Box
        sx={{
          width: "100%",
          backgroundColor: "#fff",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <InvoiceTable invoices={invoices} />
      </Box>

      {/* Modal for Creating Invoices */}
      <CreateInvoiceModal
        open={open}
        onClose={() => setOpen(false)}
        onCreateInvoice={handleCreateInvoice}
      />
    </Container>
  );
}
