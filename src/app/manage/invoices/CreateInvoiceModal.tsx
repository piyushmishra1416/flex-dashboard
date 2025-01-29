"use client";
import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { IInvoice } from '@/types/invoice';
import dayjs from 'dayjs';

interface CreateInvoiceModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (invoice: Partial<IInvoice>) => void;
}

const statuses = [
  'Open',
  'Awaiting Approval',
  'Approved',
  'Processing',
  'Paid',
  'Rejected',
  'Vendor Not Found',
  'Duplicate',
  'Void'
];

export default function CreateInvoiceModal({ open, onClose, onSubmit }: CreateInvoiceModalProps) {
  const [invoice, setInvoice] = useState<Partial<IInvoice>>({
    vendorName: '',
    invoiceNumber: '',
    status: 'Open',
    netAmount: 0,
    invoiceDate: dayjs().toDate(),
    dueDate: dayjs().toDate(),
    department: '',
    poNumber: '',
  });

  const handleSubmit = () => {
    onSubmit(invoice);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Create New Invoice</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Vendor Name"
              value={invoice.vendorName}
              onChange={(e) => setInvoice({ ...invoice, vendorName: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Invoice Number"
              value={invoice.invoiceNumber}
              onChange={(e) => setInvoice({ ...invoice, invoiceNumber: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Status"
              value={invoice.status as string}
              onChange={(e) => setInvoice({ ...invoice, status: e.target.value as "Open" | "Awaiting Approval" | "Approved" | "Processing" | "Paid" | "Rejected" | "Vendor Not Found" | "Duplicate" | "Void" | undefined })}
            >
              {statuses.map((status) => (
                <MenuItem key={status} value={status as "Open" | "Awaiting Approval" | "Approved" | "Processing" | "Paid" | "Rejected" | "Vendor Not Found" | "Duplicate" | "Void" | undefined}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label="Net Amount"
              value={invoice.netAmount}
              onChange={(e) => setInvoice({ ...invoice, netAmount: Number(e.target.value) })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Invoice Date"
                value={dayjs(invoice.invoiceDate)}
                onChange={(date) => setInvoice({ ...invoice, invoiceDate: date?.toDate() })}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Due Date"
                value={dayjs(invoice.dueDate)}
                onChange={(date) => setInvoice({ ...invoice, dueDate: date?.toDate() })}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Department"
              value={invoice.department}
              onChange={(e) => setInvoice({ ...invoice, department: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="PO Number"
              value={invoice.poNumber}
              onChange={(e) => setInvoice({ ...invoice, poNumber: e.target.value })}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Create</Button>
      </DialogActions>
    </Dialog>
  );
} 