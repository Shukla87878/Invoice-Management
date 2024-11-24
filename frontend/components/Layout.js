import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Box, Button } from "@mui/material";
import CreateInvoiceModal from "./CreateInvoiceModal";
import InvoiceTable from "./InvoiceTable";

const Layout = ({ children }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <Box sx={{ flexGrow: 1, marginLeft: "240px" }}>
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <Box sx={{ padding: 2 }}>
          {/* Invoice Table will be displayed here */}
          {children}

          {/* Button to Open Modal */}
          <Button variant="contained" onClick={handleOpenModal}>
            Open Create Invoice Modal
          </Button>

          {/* Display Invoice Table */}
          <InvoiceTable invoices={[]} /> {/* Pass an empty array or actual invoices here */}
        </Box>
      </Box>

      {/* Create Invoice Modal */}
      <CreateInvoiceModal open={isModalOpen} handleClose={handleCloseModal} />
    </Box>
  );
};

export default Layout;
