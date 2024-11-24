// components/InvoiceTable.js
import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const InvoiceTable = ({ invoices, handleEdit, handleDelete }) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: 3, width: '100%' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Vendor Name</TableCell>
            <TableCell>Invoice</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Net Amount</TableCell>
            <TableCell>Invoice Date</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices && invoices.length > 0 ? (
            invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.vendor}</TableCell>
                <TableCell>{invoice.invoiceNo}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell>{invoice.netAmount}</TableCell>
                <TableCell>{invoice.invoiceDate}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(invoice)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(invoice.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7}>No invoices found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoiceTable;
