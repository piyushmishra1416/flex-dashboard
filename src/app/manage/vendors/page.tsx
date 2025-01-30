"use client";
import { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface Vendor {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  category: string;
  totalSpend: string;
}

const sampleVendors: Vendor[] = [
  {
    id: 1,
    name: 'Tech Solutions Inc.',
    email: 'contact@techsolutions.com',
    status: 'active',
    category: 'Technology',
    totalSpend: '$45,000'
  },
  {
    id: 2,
    name: 'Office Supplies Co.',
    email: 'sales@officesupplies.com',
    status: 'active',
    category: 'Supplies',
    totalSpend: '$12,300'
  },
  {
    id: 3,
    name: 'Marketing Experts LLC',
    email: 'info@marketingexperts.com',
    status: 'inactive',
    category: 'Marketing',
    totalSpend: '$28,900'
  },
  {
    id: 4,
    name: 'Global Logistics',
    email: 'support@globallogistics.com',
    status: 'active',
    category: 'Logistics',
    totalSpend: '$67,800'
  },
];

export default function VendorsPage() {
  const [vendors] = useState<Vendor[]>(sampleVendors);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Vendors</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ bgcolor: '#1976d2' }}
        >
          Add Vendor
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Total Spend</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vendors.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell>{vendor.name}</TableCell>
                <TableCell>{vendor.email}</TableCell>
                <TableCell>
                  <Chip
                    label={vendor.status}
                    color={vendor.status === 'active' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{vendor.category}</TableCell>
                <TableCell>{vendor.totalSpend}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}